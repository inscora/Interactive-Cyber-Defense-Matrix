#!/usr/bin/env python3
"""Build threat_data/vcdb_data.json from the VERIS Community Database.

Pipeline
--------
1. Bucket VCDB incidents by ``timeline.incident.year``.
2. Map each incident's ``action.{hacking,malware,social}.variety`` values to MITRE
   ATT&CK techniques via the official VERIS->ATT&CK crosswalk published in
   vz-risk/veris (``mappings/veris-1.4.0_attack-16.1-enterprise.csv``).
3. Keep only techniques that are live in ATT&CK (not revoked/deprecated), are
   leaves (have no sub-techniques), and carry at least one ATT&CK mitigation that
   maps to a Cyber Defense Matrix cell.
4. Count, per technique per year, the incidents that reached it and the number of
   distinct "campaigns" -- a campaign being one distinct set of action varieties,
   which is how VCDB's bulk-encoded mass-exploitation batches collapse to 1.
5. Derive CDM cells by summing each technique's mitigations through
   tools/cdm_mitigation_map.json; the weight is the contributing mitigation count.

Sources are downloaded once and cached (``--cache-dir``, default .cache/vcdb).

    python3 tools/build_vcdb_data.py --validate     # compare against committed data
    python3 tools/build_vcdb_data.py --write        # regenerate threat_data/vcdb_data.json
"""

import argparse
import collections
import csv
import io
import json
import os
import sys
import urllib.request
import zipfile

VCDB_JOINED = "https://raw.githubusercontent.com/vz-risk/VCDB/{ref}/data/joined/vcdb.json.zip"
VERIS_MAP = ("https://raw.githubusercontent.com/vz-risk/veris/master/mappings/"
             "veris-1.4.0_attack-16.1-enterprise.csv")
ATTACK_STIX = ("https://raw.githubusercontent.com/mitre-attack/attack-stix-data/master/"
               "enterprise-attack/enterprise-attack.json")

ACTION_CATEGORIES = ("hacking", "malware", "social")
# Canonical Cyber Defense Matrix ordering, used for stable cell output.
FUNCTIONS = ("Identify", "Protect", "Detect", "Respond", "Recover")
ASSETS = ("Devices", "Applications", "Networks", "Data", "Users")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_OUT = os.path.join(ROOT, "threat_data", "vcdb_data.json")
MITIGATION_MAP = os.path.join(ROOT, "tools", "cdm_mitigation_map.json")


def fetch(url, cache_dir, name):
    path = os.path.join(cache_dir, name)
    if not os.path.exists(path):
        os.makedirs(cache_dir, exist_ok=True)
        sys.stderr.write(f"fetching {url}\n")
        with urllib.request.urlopen(url) as resp, open(path, "wb") as fh:
            fh.write(resp.read())
    return path


def load_incidents(cache_dir, ref, extra_paths):
    path = fetch(VCDB_JOINED.format(ref=ref), cache_dir, f"vcdb-{ref}.json.zip")
    with zipfile.ZipFile(path) as zf:
        name = next(n for n in zf.namelist() if n.endswith(".json"))
        incidents = json.loads(zf.read(name).decode("utf-8"))
    for extra in extra_paths:
        with open(extra) as fh:
            blob = json.load(fh)
        incidents.extend(blob if isinstance(blob, list) else [blob])
    return incidents


def load_mapping(cache_dir):
    """capability_id (lowercased) -> set of ATT&CK technique ids."""
    path = fetch(VERIS_MAP, cache_dir, "veris-attack-16.1.csv")
    cap2tech = collections.defaultdict(set)
    with open(path, newline="") as fh:
        for row in csv.DictReader(fh):
            if row["mapping_type"] == "non_mappable":
                continue
            cap2tech[row["capability_id"].lower()].add(row["attack_object_id"])
    return cap2tech


def load_attack(cache_dir):
    """Return (name, mitigations, live-leaf predicate) keyed by ATT&CK id."""
    path = fetch(ATTACK_STIX, cache_dir, "enterprise-attack.json")
    with open(path) as fh:
        bundle = json.load(fh)
    objects = bundle["objects"]
    by_ref = {o["id"]: o for o in objects}

    patterns = {}
    for obj in objects:
        if obj["type"] != "attack-pattern":
            continue
        ext = [r for r in obj.get("external_references", [])
               if r.get("source_name") == "mitre-attack"]
        if ext:
            patterns[ext[0]["external_id"]] = obj

    mitigations = collections.defaultdict(set)
    for rel in objects:
        if rel.get("relationship_type") != "mitigates":
            continue
        src, dst = by_ref.get(rel["source_ref"]), by_ref.get(rel["target_ref"])
        if not src or not dst:
            continue
        if src["type"] != "course-of-action" or dst["type"] != "attack-pattern":
            continue
        ext = [r for r in dst.get("external_references", [])
               if r.get("source_name") == "mitre-attack"]
        if ext:
            mitigations[ext[0]["external_id"]].add(src["name"])

    has_subs = {tid.split(".")[0] for tid in patterns if "." in tid}
    names = {tid: obj["name"].split(":")[-1].strip() for tid, obj in patterns.items()}

    def live_leaf(tid):
        obj = patterns.get(tid)
        return (obj is not None and not obj.get("revoked")
                and not obj.get("x_mitre_deprecated") and tid not in has_subs)

    version = next((o.get("x_mitre_version") for o in objects
                    if o["type"] == "x-mitre-collection"), "unknown")
    return names, mitigations, live_leaf, version


def load_cdm_cells():
    with open(MITIGATION_MAP) as fh:
        table = json.load(fh)["mitigations"]
    return {name: {tuple(k.split("|")): w for k, w in cells.items()}
            for name, cells in table.items()}


def cells_for(tid, mitigations, cdm):
    agg = collections.Counter()
    for mit in mitigations.get(tid, ()):
        for cell, weight in cdm.get(mit, {}).items():
            agg[cell] += weight
    return agg


def action_signature(incident):
    """A 'campaign' key: the distinct set of action varieties, across all categories."""
    return frozenset(
        f"{cat}.{v}"
        for cat, block in (incident.get("action") or {}).items()
        for v in (block.get("variety") or [])
    )


def techniques_for(incident, cap2tech, keep):
    found = set()
    for cat in ACTION_CATEGORIES:
        block = (incident.get("action") or {}).get(cat) or {}
        for variety in (block.get("variety") or []):
            cap = f"action.{cat}.variety.{variety}".lower()
            found |= {t for t in cap2tech.get(cap, ()) if keep(t)}
    return found


def build(incidents, years, cap2tech, names, mitigations, live_leaf, cdm):
    cell_cache, keep_cache = {}, {}

    def keep(tid):
        if tid not in keep_cache:
            keep_cache[tid] = live_leaf(tid) and bool(cells_for(tid, mitigations, cdm))
            if keep_cache[tid]:
                cell_cache[tid] = cells_for(tid, mitigations, cdm)
        return keep_cache[tid]

    buckets = collections.defaultdict(list)
    for inc in incidents:
        year = ((inc.get("timeline") or {}).get("incident") or {}).get("year")
        if isinstance(year, int) and year in years:
            buckets[year].append(inc)

    def slice_for(subset):
        counts = collections.Counter()
        camps = collections.defaultdict(set)
        for inc in subset:
            sig = action_signature(inc)
            for tid in techniques_for(inc, cap2tech, keep):
                counts[tid] += 1
                camps[tid].add(sig)
        techs = []
        for tid, n in counts.items():
            cells = [{"f": f, "a": a, "w": w}
                     for (f, a), w in sorted(cell_cache[tid].items(),
                                             key=lambda kv: (-kv[1],
                                                             FUNCTIONS.index(kv[0][0]),
                                                             ASSETS.index(kv[0][1])))]
            techs.append({"id": tid, "name": names.get(tid, tid), "incidents": n,
                          "campaigns": len(camps[tid]), "cells": cells})
        techs.sort(key=lambda t: (-t["incidents"], t["id"]))
        return {"n_incidents": len(subset),
                "n_campaigns": len({action_signature(i) for i in subset}),
                "techniques": techs}

    out = {str(y): slice_for(buckets.get(y, [])) for y in sorted(years)}
    out["ALL"] = slice_for([i for y in sorted(years) for i in buckets.get(y, [])])
    return out


def _cellkey(cells):
    """Cells are an unordered bag as far as the app is concerned (script.js only
    ever accumulates, tests membership, or counts them), so compare them as a set."""
    return sorted((c["f"], c["a"], c["w"]) for c in cells)


def compare(new, old):
    """Report structural differences between two dataset dicts."""
    diffs, name_only = [], []
    for year in sorted(set(new) | set(old), key=lambda y: (y == "ALL", y)):
        a, b = new.get(year), old.get(year)
        if a is None or b is None:
            diffs.append(f"{year}: present in {'new' if b is None else 'old'} only")
            continue
        for field in ("n_incidents", "n_campaigns"):
            if a[field] != b[field]:
                diffs.append(f"{year}.{field}: {b[field]} -> {a[field]}")
        an = {t["id"]: t for t in a["techniques"]}
        bn = {t["id"]: t for t in b["techniques"]}
        for tid in sorted(set(an) - set(bn)):
            diffs.append(f"{year}: +{tid} ({an[tid]['incidents']} inc)")
        for tid in sorted(set(bn) - set(an)):
            diffs.append(f"{year}: -{tid} ({bn[tid]['incidents']} inc)")
        for tid in sorted(set(an) & set(bn)):
            for field in ("incidents", "campaigns"):
                if an[tid][field] != bn[tid][field]:
                    diffs.append(f"{year}.{tid}.{field}: {bn[tid][field]} -> {an[tid][field]}")
            if _cellkey(an[tid]["cells"]) != _cellkey(bn[tid]["cells"]):
                diffs.append(f"{year}.{tid}.cells: {_cellkey(bn[tid]['cells'])} "
                             f"-> {_cellkey(an[tid]['cells'])}")
            if an[tid]["name"] != bn[tid]["name"]:
                name_only.append(f"{tid}: {bn[tid]['name']!r} -> {an[tid]['name']!r}")
    return diffs, sorted(set(name_only))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--ref", default="master", help="VCDB git ref to build from")
    ap.add_argument("--years", default="2021-2026", help="year range, e.g. 2021-2026")
    ap.add_argument("--extra-incident", action="append", default=[],
                    help="additional VERIS incident JSON to fold in (repeatable)")
    ap.add_argument("--cache-dir", default=os.path.join(ROOT, ".cache", "vcdb"))
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--write", action="store_true", help="write --out (default: dry run)")
    ap.add_argument("--validate", action="store_true",
                    help="diff against the existing --out instead of writing")
    args = ap.parse_args()

    lo, _, hi = args.years.partition("-")
    years = set(range(int(lo), int(hi or lo) + 1))

    cap2tech = load_mapping(args.cache_dir)
    names, mitigations, live_leaf, attack_version = load_attack(args.cache_dir)
    cdm = load_cdm_cells()
    incidents = load_incidents(args.cache_dir, args.ref, args.extra_incident)
    sys.stderr.write(f"ATT&CK {attack_version} | {len(incidents)} incidents | "
                     f"{len(cap2tech)} VERIS capabilities mapped\n")

    data = build(incidents, years, cap2tech, names, mitigations, live_leaf, cdm)

    for year in sorted(data, key=lambda y: (y == "ALL", y)):
        s = data[year]
        print(f"{year:>4}: {s['n_incidents']:5} incidents  {s['n_campaigns']:4} campaigns  "
              f"{len(s['techniques']):4} techniques")

    if args.validate:
        with open(args.out) as fh:
            old = json.load(fh)
        diffs, name_only = compare(data, old)
        print(f"\nstructural differences vs {os.path.relpath(args.out, ROOT)}: {len(diffs)}")
        for d in diffs:
            print("  " + d)
        if name_only:
            print(f"\nATT&CK technique renames (cosmetic): {len(name_only)}")
            for n in name_only:
                print("  " + n)
        return 1 if diffs else 0

    if args.write:
        with open(args.out, "w") as fh:
            json.dump(data, fh, indent=2)
            fh.write("\n")
        print(f"\nwrote {args.out}")
    else:
        print("\n(dry run - pass --write to update the dataset)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
