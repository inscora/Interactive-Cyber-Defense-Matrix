# Interactive Cyber Defense Matrix

> **Live version:** [cdm.inscora.com](https://cdm.inscora.com)

An interactive visualization of the [Cyber Defense Matrix](https://cyberdefensematrix.com/) framework, mapping cybersecurity technologies, insurance application coverage, and real-world threat data (MITRE ATT&CK techniques) across asset classes and security functions.

## Overview

The CDM grid plots five asset classes (Devices, Applications, Networks, Data, Users) against six security functions (Govern, Identify, Protect, Detect, Respond, Recover), divided by a "Boom line" separating proactive (left) from reactive (right) functions.

The application has two views:

**Cyber Insurance Applications** — Displays heatmaps of question coverage from 22 anonymized cyber insurance carrier applications. Each carrier's questions are mapped to CDM cells, and an aggregate view shows overall industry coverage.

**Threat TTPs from VCDB** — Displays MITRE ATT&CK techniques observed in real-world incidents from the VERIS Community Database, filterable by year (2021-2025). Techniques link directly to their MITRE ATT&CK definitions. The grid heatmap shows incident or campaign concentration per cell.

A sidebar technology selector groups 45 cybersecurity solutions into seven domains, with overlays showing where each technology maps on the grid. Clicking any CDM cell highlights which technologies apply to that cell.

## File Structure

```
index.html                     Main page structure and layout
styles.css                     All styling (grid, sidebar, tabs, overlays, TTP table)
script.js                      Application logic (grid rendering, overlays, tabs, VCDB integration)
insurance_data/
  data_carrier_1..22.json      Anonymized insurance carrier question mappings (22 files)
threat_data/
  vcdb_data.json               VCDB-sourced MITRE ATT&CK technique data by year
  data_TTPs.json               Legacy TTP mapping data
tools/
  build_vcdb_data.py           Rebuilds threat_data/vcdb_data.json from upstream VCDB
  cdm_mitigation_map.json      ATT&CK mitigation -> CDM cell table used by the build
test-solution-mappings.html    Regression tests for technology-to-cell mappings (45 tests)
package.json                   Dev dependencies (jsdom for test harness)
```

## Data

**Insurance data** (`insurance_data/`) — Each carrier file maps anonymized insurance application questions to CDM cells. Carrier names and specific question text are not included; only the cell-level mappings and question counts are stored. The data represents real cyber insurance applications but cannot be traced back to any specific insurer.

**Threat data** (`threat_data/`) — Sourced from the VERIS Community Database (VCDB), this data maps observed MITRE ATT&CK techniques to CDM cells with incident and campaign counts per year. Technique IDs link to the public MITRE ATT&CK knowledge base.

## Regenerating the threat data

`tools/build_vcdb_data.py` rebuilds `threat_data/vcdb_data.json` from three upstream sources, all fetched and cached automatically:

| Source | Used for |
| --- | --- |
| [vz-risk/VCDB](https://github.com/vz-risk/VCDB) `data/joined/vcdb.json.zip` | Incidents, bucketed by `timeline.incident.year` |
| [vz-risk/veris](https://github.com/vz-risk/veris) `mappings/veris-1.4.0_attack-16.1-enterprise.csv` | VERIS action variety → ATT&CK technique |
| [mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) | Technique names, revocation status, mitigations |

An incident's `action.{hacking,malware,social}.variety` values are mapped to ATT&CK techniques. A technique is kept only if it is live in ATT&CK, is a leaf (has no sub-techniques), and has at least one mitigation that maps to a CDM cell. Cells come from summing the technique's ATT&CK mitigations through `tools/cdm_mitigation_map.json`; the weight is the number of contributing mitigations. A *campaign* is one distinct set of action varieties — this is why VCDB's bulk-encoded mass-exploitation batches (e.g. the 747 near-identical 2023 records) collapse to a single campaign.

```bash
python3 tools/build_vcdb_data.py --validate   # diff against the committed dataset
python3 tools/build_vcdb_data.py --write      # regenerate it
```

`--ref` pins a VCDB commit, `--years` sets the year range, and `--extra-incident` folds in loose VERIS incident files (useful for previewing an unmerged upstream PR).

**Validation status.** Rebuilt against VCDB commit `5a64739`, the state the committed dataset was cut from, the pipeline reproduces 2021–2024 exactly: 216/216 technique records match on incident count, campaign count and CDM cells. 2025 does not reconcile — the committed file records 73 incidents for the 26 stolen-credential techniques where VCDB has 84, and no upstream commit ever held the values it claims. That file is also internally inconsistent (its `ALL` bucket reports 957 incidents against 996 summed across its own year buckets), so it was assembled from several snapshots at different times. The pipeline's output is self-consistent by construction; regenerating will correct those 2025 and `ALL` figures.

## License

Apache 2.0 — see [LICENSE](LICENSE).
