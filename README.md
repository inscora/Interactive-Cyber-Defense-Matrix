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
test-solution-mappings.html    Regression tests for technology-to-cell mappings (45 tests)
package.json                   Dev dependencies (jsdom for test harness)
```

## Data

**Insurance data** (`insurance_data/`) — Each carrier file maps anonymized insurance application questions to CDM cells. Carrier names and specific question text are not included; only the cell-level mappings and question counts are stored. The data represents real cyber insurance applications but cannot be traced back to any specific insurer.

**Threat data** (`threat_data/`) — Sourced from the VERIS Community Database (VCDB), this data maps observed MITRE ATT&CK techniques to CDM cells with incident and campaign counts per year. Technique IDs link to the public MITRE ATT&CK knowledge base.

## License

Apache 2.0 — see [LICENSE](LICENSE).
