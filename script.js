// script.js — Interactive Cyber Defense Matrix with VCDB Integration

// ─── Configuration ───────────────────────────────────────────────
const ASSETS    = ['Devices', 'Applications', 'Networks', 'Data', 'Users'];
const FUNCTIONS = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

// Short prefixes used for cell IDs (3-letter asset prefix + 3-letter function prefix)
const ASSET_PREFIX  = { Devices: 'DEV', Applications: 'APP', Networks: 'NET', Data: 'DAT', Users: 'USE' };
const FUNC_PREFIX   = { Govern: 'GOV', Identify: 'IDE', Protect: 'PRO', Detect: 'DET', Respond: 'RES', Recover: 'REC' };

// Solutions — each has a label and the CDM cells it covers
const SOLUTIONS = [
  { id: 'apiDiscovery',             label: 'API Discovery',            cells: ['Applications-Identify'] },
  { id: 'apiProtection',            label: 'API Protection',           cells: ['Applications-Protect'] },
  { id: 'attackSurfaceManagement',  label: 'Attack Surface Management',cells: ['Devices-Identify','Applications-Identify','Networks-Identify','Data-Identify','Users-Identify'] },
  { id: 'awarenessTraining',        label: 'Awareness Training',       cells: ['Users-Govern'] },
  { id: 'botManagement',            label: 'Bot Management',           cells: ['Applications-Protect'] },
  { id: 'bugBounty',                label: 'Bug Bounty',               cells: ['Devices-Protect','Applications-Protect'] },
  { id: 'cloudRecovery',            label: 'Cloud Recovery',           cells: ['Applications-Recover'] },
  { id: 'codeTesting',              label: 'Code Testing',             cells: ['Devices-Protect','Applications-Protect'] },
  { id: 'ddos',                     label: 'DDoS',                     cells: ['Networks-Protect'] },
  { id: 'ddosTesting',              label: 'DDoS Testing',             cells: ['Networks-Protect','Networks-Detect'] },
  { id: 'dns',                      label: 'DNS',                      cells: ['Networks-Protect'] },
  { id: 'drPlanAndRehearsals',      label: 'DR Plan and Rehearsals',   cells: ['Devices-Recover','Applications-Recover','Networks-Recover','Data-Recover','Users-Recover'] },
  { id: 'draas',                    label: 'DR-aaS',                   cells: ['Devices-Recover','Applications-Recover','Networks-Recover','Data-Recover','Users-Recover'] },
  { id: 'darkWebScanning',          label: 'Dark Web Scanning',        cells: ['Data-Detect'] },
  { id: 'dataIdAndClassification',  label: 'Data ID and Class',        cells: ['Data-Identify'] },
  { id: 'dataLossPrevention',       label: 'Data Loss Prevention',     cells: ['Data-Protect'] },
  { id: 'deviceBackups',            label: 'Device Backups',           cells: ['Devices-Recover'] },
  { id: 'managedEdr',               label: '(Mngd) EDR',              cells: ['Devices-Protect','Devices-Detect'] },
  { id: 'emailSecurity',            label: 'Email Security',           cells: ['Users-Identify'] },
  { id: 'firewall',                 label: 'Firewall',                 cells: ['Networks-Protect'] },
  { id: 'managedFirewall',          label: '(Mngd) Firewall',         cells: ['Networks-Protect','Networks-Detect'] },
  { id: 'managedGrc',               label: '(Mngd) GRC',              cells: ['Devices-Govern','Applications-Govern','Networks-Govern','Data-Govern'] },
  { id: 'iam',                      label: 'IAM',                      cells: ['Users-Identify','Users-Protect'] },
  { id: 'impersonation',            label: 'Impersonation',            cells: ['Users-Protect'] },
  { id: 'incidentResponse',         label: 'Incident Response',        cells: ['Devices-Respond','Applications-Respond','Networks-Respond','Data-Respond','Users-Respond'] },
  { id: 'mfaSso',                   label: 'MFA / SSO',               cells: ['Users-Identify','Users-Protect'] },
  { id: 'managedPatching',          label: '(Mngd) Patching',         cells: ['Devices-Protect','Applications-Protect'] },
  { id: 'microsegmentation',        label: 'Microsegmentation',        cells: ['Networks-Protect'] },
  { id: 'managedControlsAssurance', label: '(Mngd) Controls Assurance',cells: ['Devices-Govern','Applications-Govern','Networks-Govern','Data-Govern','Users-Govern'] },
  { id: 'networkIntelligence',      label: 'Network Intelligence',     cells: ['Networks-Identify','Networks-Detect'] },
  { id: 'otSecurity',               label: 'OT Security',              cells: ['Devices-Protect','Devices-Detect','Networks-Protect','Networks-Detect'] },
  { id: 'pam',                      label: 'PAM',                      cells: ['Data-Protect','Users-Protect'] },
  { id: 'penTest',                  label: 'Pen Test',                 cells: ['Devices-Protect','Applications-Protect'] },
  { id: 'phishingTests',            label: 'Phishing Tests',           cells: ['Users-Govern'] },
  { id: 'policyEnforcement',        label: 'Policy Enforcement',       cells: ['Users-Govern'] },
  { id: 'ransomwareNegotiation',    label: 'Ransom Negotiation',       cells: ['Devices-Respond','Applications-Respond','Networks-Respond','Data-Respond','Users-Respond'] },
  { id: 'managedSiem',              label: '(Mngd) SIEM',             cells: ['Devices-Detect','Applications-Detect','Networks-Detect','Data-Detect','Users-Detect'] },
  { id: 'soc',                      label: 'SOC',                      cells: ['Devices-Detect','Applications-Detect','Networks-Detect','Data-Detect','Users-Detect','Devices-Respond','Applications-Respond','Networks-Respond','Data-Respond','Users-Respond'] },
  { id: 'sse',                      label: 'SSE',                      cells: ['Applications-Identify','Applications-Protect'] },
  { id: 'staffingAndRecruiting',    label: 'Staffing and Recruiting',  cells: ['Devices-Govern','Applications-Govern','Networks-Govern','Data-Govern'] },
  { id: 'tapeBackup',               label: 'Tape Backup',              cells: ['Data-Recover'] },
  { id: 'vmDbBackup',               label: 'VM/DB Backup',             cells: ['Data-Recover'] },
  { id: 'vpn',                      label: 'VPN',                      cells: ['Applications-Identify','Applications-Protect'] },
  { id: 'ztna',                     label: 'ZTNA',                     cells: ['Applications-Identify','Applications-Protect'] },
  { id: 'vCiso',                    label: 'vCiso',                    cells: ['Devices-Govern','Applications-Govern','Networks-Govern','Data-Govern'] },
];

// ─── Build CDM Grid (HTML table) ─────────────────────────────────
(function buildGrid() {
  const table = document.getElementById('cdmGrid');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  // Header row: corner + function columns with boom divider after Protect
  const headerRow = document.createElement('tr');
  headerRow.appendChild(Object.assign(document.createElement('th'), { className: 'corner' }));
  FUNCTIONS.forEach((func, i) => {
    const th = document.createElement('th');
    th.className = 'col-header';
    th.textContent = func;
    headerRow.appendChild(th);
    // Insert boom divider column after Protect (index 2)
    if (i === 2) {
      const boomTh = document.createElement('th');
      boomTh.className = 'corner';
      boomTh.style.width = '4px';
      headerRow.appendChild(boomTh);
    }
  });
  thead.appendChild(headerRow);

  // Boom labels row
  const boomRow = document.createElement('tr');
  boomRow.className = 'boom-row';
  boomRow.appendChild(document.createElement('td')); // corner
  // Left of boom spans 3 cols
  const leftBoom = document.createElement('td');
  leftBoom.colSpan = 3;
  leftBoom.className = 'boom-left';
  leftBoom.textContent = '◀ Left of Boom';
  boomRow.appendChild(leftBoom);
  // Boom line
  const boomLine = document.createElement('td');
  boomLine.className = 'boom-line-cell';
  boomRow.appendChild(boomLine);
  // Right of boom spans 3 cols
  const rightBoom = document.createElement('td');
  rightBoom.colSpan = 3;
  rightBoom.className = 'boom-right';
  rightBoom.textContent = 'Right of Boom ▶';
  boomRow.appendChild(rightBoom);
  thead.appendChild(boomRow);

  // Data rows: one per asset class
  ASSETS.forEach(asset => {
    const tr = document.createElement('tr');

    // Row label
    const labelTd = document.createElement('td');
    labelTd.className = 'asset-label';
    labelTd.textContent = asset;
    tr.appendChild(labelTd);

    FUNCTIONS.forEach((func, fi) => {
      const td = document.createElement('td');
      const ap = ASSET_PREFIX[asset];
      const fp = FUNC_PREFIX[func];
      td.id = `cell-${ap}${fp}`;
      td.className = 'cdm-cell empty';
      td.dataset.asset = asset;
      td.dataset.func = func;

      // Count span
      const countSpan = document.createElement('span');
      countSpan.className = 'cell-count';
      countSpan.id = `count-${ap}${fp}`;
      td.appendChild(countSpan);

      tr.appendChild(td);

      // Boom divider after Protect column
      if (fi === 2) {
        const boomTd = document.createElement('td');
        boomTd.className = 'boom-divider';
        tr.appendChild(boomTd);
      }
    });

    tbody.appendChild(tr);
  });
})();

// ─── Build Solution Overlay Elements ─────────────────────────────
(function buildSolutionOverlays() {
  const container = document.getElementById('solutionOverlays');
  SOLUTIONS.forEach(sol => {
    const div = document.createElement('div');
    div.className = 'sol-overlay';
    div.id = `overlay-${sol.id}`;
    div.textContent = sol.label;
    div.title = sol.label;
    container.appendChild(div);
  });
})();

// ─── Solution Overlay Positioning Engine ─────────────────────────
function positionOverlays() {
  const wrapper = document.getElementById('gridWrapper');
  const wrapperRect = wrapper.getBoundingClientRect();
  const SLOT_H = 16; // px height per horizontal overlay slot

  // Helper: get cell position relative to wrapper
  function cellRect(cellKey) {
    const [asset, func] = cellKey.split('-');
    const el = document.getElementById(`cell-${ASSET_PREFIX[asset]}${FUNC_PREFIX[func]}`);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      top:  r.top  - wrapperRect.top,
      left: r.left - wrapperRect.left,
      bottom: r.bottom - wrapperRect.top,
      right:  r.right  - wrapperRect.left,
      width: r.width, height: r.height
    };
  }

  // Determine which solutions are currently checked
  const active = SOLUTIONS.filter(sol => {
    const cb = document.getElementById(`${sol.id}-checkbox`);
    return cb && cb.checked;
  });

  // Hide all overlays
  SOLUTIONS.forEach(sol => {
    document.getElementById(`overlay-${sol.id}`).style.display = 'none';
  });
  if (active.length === 0) return;

  // Classify: vertical (3+ rows) vs non-vertical
  const verticals = [];
  const horizontals = [];
  active.forEach(sol => {
    const funcs  = [...new Set(sol.cells.map(c => c.split('-')[1]))];
    const assets = [...new Set(sol.cells.map(c => c.split('-')[0]))];
    if (assets.length >= 3) {
      verticals.push(sol);
    } else {
      horizontals.push(sol);
    }
  });

  // === Vertical overlays — fixed-width bars stacked from left ===
  const SLOT_W = SLOT_H; // same thickness as horizontal bars' height
  // Track left-offset per column so vertical bars stack side-by-side
  const colOffset = {};
  verticals.forEach(sol => {
    const funcs = [...new Set(sol.cells.map(c => c.split('-')[1]))];
    const rects = sol.cells.map(cellRect).filter(Boolean);
    if (!rects.length) return;

    // Find max colOffset across all function columns this solution spans
    let startOffset = 0;
    funcs.forEach(f => {
      if (!colOffset[f]) colOffset[f] = 0;
      startOffset = Math.max(startOffset, colOffset[f]);
    });

    const top    = Math.min(...rects.map(r => r.top));
    const bottom = Math.max(...rects.map(r => r.bottom));
    const left   = Math.min(...rects.map(r => r.left));
    const right  = Math.max(...rects.map(r => r.right));

    // Single column: narrow SLOT_W bar. Multi-column: 1.5× width, centered on column boundary
    const isMultiCol = funcs.length > 1;
    let barLeft, barWidth;
    if (isMultiCol) {
      const MULTI_W = Math.round(SLOT_W * 1.5);
      // Find the boundary between the two columns (right edge of first col)
      const firstColCells = sol.cells.filter(c => c.split('-')[1] === funcs[0]);
      const firstColRects = firstColCells.map(cellRect).filter(Boolean);
      const boundary = Math.max(...firstColRects.map(r => r.right));
      barLeft  = boundary - Math.round(MULTI_W / 2);
      barWidth = MULTI_W;
    } else {
      barLeft  = left + startOffset;
      barWidth = SLOT_W;
    }

    const ov = document.getElementById(`overlay-${sol.id}`);
    ov.style.cssText = `
      display:flex; position:absolute;
      top:${top}px; left:${barLeft}px;
      width:${barWidth}px; height:${bottom - top}px;
    `;
    ov.className = 'sol-overlay sol-vertical';

    // Advance offset for all function columns
    funcs.forEach(f => {
      colOffset[f] = startOffset + (isMultiCol ? barWidth + 1 : SLOT_W + 1);
    });
  });

  // === Non-vertical overlays — stacked horizontal bars from BOTTOM of cells ===
  // Track upward offset per cell (how far up from the bottom we've stacked)
  const cellOffset = {};
  horizontals.forEach(sol => {
    const rects = sol.cells.map(cellRect).filter(Boolean);
    if (!rects.length) return;

    // Find max offset among all cells this solution covers
    let yOff = 0;
    sol.cells.forEach(k => {
      if (!cellOffset[k]) cellOffset[k] = 0;
      yOff = Math.max(yOff, cellOffset[k]);
    });

    const bottom = Math.max(...rects.map(r => r.bottom));
    const left   = Math.min(...rects.map(r => r.left));
    const right  = Math.max(...rects.map(r => r.right));
    const ov = document.getElementById(`overlay-${sol.id}`);
    ov.style.cssText = `
      display:block; position:absolute;
      top:${bottom - yOff - SLOT_H}px; left:${left}px;
      width:${right - left}px; height:${SLOT_H}px;
    `;
    ov.className = 'sol-overlay sol-horizontal';

    // Advance offset for every cell this solution covers
    sol.cells.forEach(k => { cellOffset[k] = yOff + SLOT_H + 1; });
  });
}

// ─── Technology groupings by cyber domain ────────────────────────
const TECH_GROUPS = [
  { name: 'Governance & Risk', ids: ['vCiso','managedGrc','managedControlsAssurance','policyEnforcement','staffingAndRecruiting'] },
  { name: 'Identity & Access', ids: ['iam','mfaSso','pam','emailSecurity','impersonation'] },
  { name: 'Application Security', ids: ['apiDiscovery','apiProtection','sse','codeTesting','bugBounty','botManagement','vpn','ztna'] },
  { name: 'Network Security', ids: ['firewall','managedFirewall','ddos','ddosTesting','dns','microsegmentation','networkIntelligence','otSecurity'] },
  { name: 'Endpoint & Data', ids: ['managedEdr','managedPatching','dataIdAndClassification','dataLossPrevention','darkWebScanning'] },
  { name: 'Security Operations', ids: ['soc','managedSiem','penTest','phishingTests','awarenessTraining','attackSurfaceManagement'] },
  { name: 'Recovery & Response', ids: ['incidentResponse','ransomwareNegotiation','drPlanAndRehearsals','draas','cloudRecovery','deviceBackups','vmDbBackup','tapeBackup'] },
];

// Build a lookup map
const SOL_MAP = {};
SOLUTIONS.forEach(sol => { SOL_MAP[sol.id] = sol; });

// ─── Build Technology Sidebar ────────────────────────────────────
(function buildSidebar() {
  const container = document.getElementById('techSidebarContent');
  TECH_GROUPS.forEach(group => {
    const section = document.createElement('div');
    section.className = 'tech-group';

    const header = document.createElement('div');
    header.className = 'tech-group-header';
    header.textContent = group.name;
    section.appendChild(header);

    const list = document.createElement('div');
    list.className = 'tech-group-items';

    group.ids.forEach(id => {
      const sol = SOL_MAP[id];
      if (!sol) return;

      const item = document.createElement('div');
      item.className = 'tech-item';
      item.dataset.id = sol.id;

      // Hidden checkbox for overlay logic
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `${sol.id}-checkbox`;
      input.className = 'tech-checkbox-hidden';
      item.appendChild(input);

      const label = document.createElement('span');
      label.className = 'tech-item-label';
      label.textContent = sol.label;
      item.appendChild(label);

      // Click toggles selection
      item.addEventListener('click', () => {
        input.checked = !input.checked;
        item.classList.toggle('tech-item-active', input.checked);
        positionOverlays();
      });

      list.appendChild(item);
    });

    section.appendChild(list);
    container.appendChild(section);
  });
})();

// Reposition overlays on resize
window.addEventListener('resize', () => { positionOverlays(); });


// ─── State ───────────────────────────────────────────────────────
let currentDataset = null;
let maxCount = 0;
let countsVisible = true;
let activeCarrierButton = null;
let currentTab = 'carriers';
let vcdbData = null;
let currentYear = 'ALL';
let ttpCountsMode = 'incidents'; // 'incidents' or 'campaigns'
let selectedCell = null; // for TTP cell filtering
let allTechniques = []; // all techniques for current year
let ttpSortCol = 2;   // default sort by count column
let ttpSortAsc = false; // descending by default

// ─── Carrier title ───────────────────────────────────────────────
const carrierTitleEl = document.getElementById('carrierTitle');

function setCarrierTitle(label, totalQuestions) {
  if (label && totalQuestions !== undefined) {
    carrierTitleEl.textContent = `${label}\u2003—\u2003${totalQuestions} questions`;
    carrierTitleEl.classList.remove('placeholder');
  } else if (label) {
    carrierTitleEl.textContent = label;
    carrierTitleEl.classList.remove('placeholder');
  } else {
    carrierTitleEl.textContent = 'Select a carrier or dataset to explore the matrix';
    carrierTitleEl.classList.add('placeholder');
  }
}
setCarrierTitle(null);

// ─── Active button tracking ──────────────────────────────────────
function setActiveButton(button) {
  if (activeCarrierButton) activeCarrierButton.classList.remove('active');
  if (button) button.classList.add('active');
  activeCarrierButton = button;
}

// ─── Question count toggle ───────────────────────────────────────
const countsToggleCheckbox = document.getElementById('countsToggle');
countsToggleCheckbox.addEventListener('change', () => {
  countsVisible = countsToggleCheckbox.checked;
  document.querySelectorAll('.cell-count').forEach(el => {
    el.style.display = countsVisible ? '' : 'none';
  });
});

// ─── Contrast-based text color ───────────────────────────────────
function getContrastTextColor(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a1a2e' : '#f0f0f5';
}

// ─── Unique question counter ─────────────────────────────────────
function getTotalQuestions(data) {
  const allIds = new Set();
  data.forEach(row => {
    Object.entries(row).forEach(([key, value]) => {
      if (key === '') return;
      if (typeof value === 'string' && value.trim()) {
        value.split(',').forEach(id => { if (id.trim()) allIds.add(id.trim()); });
      }
    });
  });
  return allIds.size;
}

// ─── Dynamic max count ───────────────────────────────────────────
function updateMaxCount(data) {
  maxCount = 0;
  data.forEach(row => {
    Object.values(row).forEach(value => {
      const count = (value.match(/\d+/) ? ((value.match(/,/g) || []).length + 1) : 0);
      maxCount = Math.max(maxCount, count);
    });
  });
}

// ─── Color gradients ─────────────────────────────────────────────
const CARRIER_STOPS = [
  { threshold: 0,   bg: '#FFFFFF' },
  { threshold: 0.2, bg: '#DFF1D6' },
  { threshold: 0.3, bg: '#B5E0CA' },
  { threshold: 0.4, bg: '#8FC1BB' },
  { threshold: 0.5, bg: '#6FA2AD' },
  { threshold: 0.6, bg: '#50809E' },
  { threshold: 0.7, bg: '#305D8A' },
  { threshold: 0.8, bg: '#003C73' },
  { threshold: 1.0, bg: '#00204C' },
];
const THREAT_STOPS = [
  { threshold: 0,   bg: '#FFFFFF' },
  { threshold: 0.2, bg: '#F4CCCC' },
  { threshold: 0.3, bg: '#EA9999' },
  { threshold: 0.4, bg: '#E06666' },
  { threshold: 0.5, bg: '#FF0000' },
  { threshold: 0.6, bg: '#CC0000' },
  { threshold: 0.7, bg: '#990000' },
  { threshold: 0.8, bg: '#660000' },
  { threshold: 1.0, bg: '#331A00' },
];

function getColor(count, stops) {
  if (count === 0) return '#12151f';
  const norm = maxCount > 0 ? count / maxCount : 0;
  let pick = stops[stops.length - 1];
  for (let i = 0; i < stops.length; i++) {
    if (norm <= stops[i].threshold) { pick = stops[i]; break; }
  }
  return pick.bg;
}

// ─── Load & display data ─────────────────────────────────────────
function loadAndDisplayData(datasetName) {
  const isThreat = (datasetName === 'threat_data/data_TTPs.json');

  fetch(datasetName)
    .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      updateMaxCount(data);

      data.forEach(row => {
        const assetName = row[''];
        if (!assetName || assetName === 'Metadata') return;
        const ap = ASSET_PREFIX[assetName];
        if (!ap) return;

        Object.entries(row).forEach(([key, value]) => {
          if (key === '') return;
          const fp = FUNC_PREFIX[key];
          if (!fp) return;

          const cell  = document.getElementById(`cell-${ap}${fp}`);
          const count_el = document.getElementById(`count-${ap}${fp}`);
          if (!cell) return;

          const itemCount = (value.match(/\d+/) ? ((value.match(/,/g) || []).length + 1) : 0);
          const bgColor = getColor(itemCount, isThreat ? THREAT_STOPS : CARRIER_STOPS);

          cell.style.backgroundColor = bgColor;
          cell.classList.remove('empty');

          if (!isThreat) {
            count_el.textContent = itemCount > 0 ? itemCount : '';
            count_el.style.color = getContrastTextColor(bgColor);
            count_el.style.display = countsVisible ? '' : 'none';
          } else {
            count_el.textContent = '';
          }
        });
      });
    })
    .catch(err => { console.error('CDM load error:', err.message); });
}

// ─── Clear grid ──────────────────────────────────────────────────
function clearDataset() {
  document.querySelectorAll('.cdm-cell').forEach(cell => {
    cell.style.backgroundColor = '';
    cell.classList.add('empty');
  });
  document.querySelectorAll('.cell-count').forEach(el => {
    el.textContent = '';
  });
  setCarrierTitle(null);
  setActiveButton(null);
  selectedCell = null;
  document.getElementById('ttpCellFilter').style.display = 'none';
  document.getElementById('ttpSearchInput').value = '';
  document.getElementById('ttpTableBody').innerHTML = '';
}

// ─── Merge multiple JSONs ────────────────────────────────────────
async function combineJSON(filePaths) {
  const mergedMap = {};
  const allDataArrays = await Promise.all(
    filePaths.map(url => fetch(url).then(resp => resp.json()))
  );
  for (const dataArray of allDataArrays) {
    for (const row of dataArray) {
      const rowID = row[''];
      if (!rowID || rowID === 'Metadata') continue;
      if (!mergedMap[rowID]) mergedMap[rowID] = { '': rowID };
      for (const [key, value] of Object.entries(row)) {
        if (key === '') continue;
        mergedMap[rowID][key] = mergedMap[rowID][key] ? mergedMap[rowID][key] + ',' + value : value;
      }
    }
  }
  const mergedArray = Object.values(mergedMap);
  const blob = new Blob([JSON.stringify(mergedArray)], { type: 'application/json' });
  return { url: URL.createObjectURL(blob), data: mergedArray };
}

// ─── Carrier file paths ──────────────────────────────────────────
const carrierFilePaths = Array.from({ length: 22 }, (_, i) => `insurance_data/data_carrier_${i + 1}.json`);

// ─── Tab System ──────────────────────────────────────────────────
const tabCarriersBtn = document.getElementById('tab-carriers');
const tabThreatsBtn = document.getElementById('tab-threats');
const tabPanelCarriers = document.getElementById('tab-panel-carriers');
const tabPanelThreats = document.getElementById('tab-panel-threats');
const ttpControlsEl = document.getElementById('ttp-controls');

function switchTab(tab) {
  currentTab = tab;

  if (tab === 'carriers') {
    tabCarriersBtn.classList.add('tab-btn-active');
    tabThreatsBtn.classList.remove('tab-btn-active');
    tabPanelCarriers.classList.add('tab-panel-active');
    tabPanelThreats.classList.remove('tab-panel-active');
    ttpControlsEl.style.display = 'none';
    // Load all carriers combined
    loadAllCarriers();
  } else {
    tabCarriersBtn.classList.remove('tab-btn-active');
    tabThreatsBtn.classList.add('tab-btn-active');
    tabPanelCarriers.classList.remove('tab-panel-active');
    tabPanelThreats.classList.add('tab-panel-active');
    ttpControlsEl.style.display = 'flex';
    // Load default year
    loadTTPYear(currentYear);
  }
}

tabCarriersBtn.addEventListener('click', () => switchTab('carriers'));
tabThreatsBtn.addEventListener('click', () => switchTab('threats'));

// ─── Wire up carrier buttons ─────────────────────────────────────
carrierFilePaths.forEach((filePath, index) => {
  const num = index + 1;
  const btn = document.querySelector(`.toggle-carrier_${num}-dataset-btn`);
  if (!btn) return;
  btn.addEventListener('click', () => {
    currentDataset = filePath;
    setActiveButton(btn);
    fetch(filePath).then(r => r.json()).then(data => {
      setCarrierTitle(`Carrier ${num}`, getTotalQuestions(data));
    });
    loadAndDisplayData(filePath);
  });
});

// ─── All Carriers (tab 1 default) ────────────────────────────────
// Auto-load when tab is first clicked/switched to
async function loadAllCarriers() {
  const result = await combineJSON(carrierFilePaths);
  currentDataset = result.url;
  setCarrierTitle('All Carriers', getTotalQuestions(result.data));
  setActiveButton(null);
  loadAndDisplayData(result.url);
}

// ─── Clear button ────────────────────────────────────────────────
document.querySelector('.toggle-clear-btn').addEventListener('click', clearDataset);

// ─── TTP Grid Rendering ──────────────────────────────────────────
function computeTTPGridData(techniques) {
  const cellCounts = {};
  const countKey = ttpCountsMode === 'campaigns' ? 'campaigns' : 'incidents';

  techniques.forEach(tech => {
    const cnt = tech[countKey] || 0;
    tech.cells.forEach(cell => {
      const key = `${cell.a}-${cell.f}`;
      if (!cellCounts[key]) cellCounts[key] = 0;
      cellCounts[key] += cnt;
    });
  });

  return cellCounts;
}

function renderTTPGrid(techniques) {
  const cellCounts = computeTTPGridData(techniques);
  const counts = Object.values(cellCounts).filter(c => c > 0);
  maxCount = counts.length > 0 ? Math.max(...counts) : 0;

  document.querySelectorAll('.cdm-cell').forEach(cell => {
    const asset = cell.dataset.asset;
    const func = cell.dataset.func;
    const key = `${asset}-${func}`;
    const count = cellCounts[key] || 0;
    const countEl = cell.querySelector('.cell-count');

    if (count > 0) {
      cell.classList.remove('empty');
      const bgColor = getColor(count, THREAT_STOPS);
      cell.style.backgroundColor = bgColor;
      countEl.textContent = count;
      countEl.style.color = getContrastTextColor(bgColor);
      countEl.style.display = countsVisible ? '' : 'none';
    } else {
      cell.classList.add('empty');
      cell.style.backgroundColor = '';
      countEl.textContent = '';
    }
  });
}

// ─── Load VCDB Data ──────────────────────────────────────────────
async function loadVCDBData() {
  if (vcdbData) return;
  try {
    const resp = await fetch('threat_data/vcdb_data.json');
    vcdbData = await resp.json();
  } catch (err) {
    console.error('Failed to load VCDB data:', err);
  }
}

// ─── Load and render TTP year ────────────────────────────────────
function loadTTPYear(year) {
  if (!vcdbData) return;
  currentYear = year;

  // Update year buttons
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.classList.toggle('year-btn-active', btn.dataset.year === year);
  });

  const yearData = vcdbData[year] || { n_incidents: 0, n_campaigns: 0, techniques: [] };
  allTechniques = yearData.techniques || [];

  // Reset search and cell filter
  document.getElementById('ttpSearchInput').value = '';
  selectedCell = null;
  document.getElementById('ttpCellFilter').style.display = 'none';

  // Render grid and table
  renderTTPGrid(allTechniques);
  updateTTPTable();

  // Show stats in the title area
  const yearLabel = year === 'ALL' ? 'All Years' : year;
  const nInc = yearData.n_incidents || 0;
  const nCamp = yearData.n_campaigns || 0;
  const nTech = allTechniques.length;
  setCarrierTitle(`Threat TTPs from VCDB — ${yearLabel}\u2003—\u2003${nInc} incidents\u2003·\u2003${nCamp} campaigns\u2003·\u2003${nTech} techniques`);
}

// ─── TTP Counts mode toggle ──────────────────────────────────────
const ttpCountsToggle = document.getElementById('ttpCountsToggle');
ttpCountsToggle.addEventListener('change', () => {
  ttpCountsMode = ttpCountsToggle.checked ? 'campaigns' : 'incidents';
  const headerEl = document.getElementById('ttp-col-header');
  headerEl.textContent = ttpCountsMode === 'campaigns' ? 'Campaigns' : 'Incidents';
  renderTTPGrid(allTechniques);
  updateTTPTable();
});

// ─── TTP Search/Filter ───────────────────────────────────────────
const ttpSearchInput = document.getElementById('ttpSearchInput');
ttpSearchInput.addEventListener('input', updateTTPTable);

// ─── TTP Table Header Sort ──────────────────────────────────────
document.querySelectorAll('#ttpTable th[data-col]').forEach(th => {
  th.style.cursor = 'pointer';
  th.addEventListener('click', () => {
    const col = parseInt(th.dataset.col);
    if (ttpSortCol === col) {
      ttpSortAsc = !ttpSortAsc;
    } else {
      ttpSortCol = col;
      ttpSortAsc = (col <= 1); // ascending for text cols, descending for numbers
    }
    // Update header indicators
    document.querySelectorAll('#ttpTable th[data-col]').forEach(h => {
      h.classList.remove('sort-asc', 'sort-desc');
    });
    th.classList.add(ttpSortAsc ? 'sort-asc' : 'sort-desc');
    updateTTPTable();
  });
});

// ─── TTP Table Updates ───────────────────────────────────────────
function updateTTPTable() {
  const tbody = document.getElementById('ttpTableBody');
  tbody.innerHTML = '';

  let filtered = [...allTechniques];

  // Filter by search term
  const searchTerm = ttpSearchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(t =>
      t.id.toLowerCase().includes(searchTerm) ||
      t.name.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by selected cell
  if (selectedCell) {
    filtered = filtered.filter(t =>
      t.cells.some(c => c.a === selectedCell.asset && c.f === selectedCell.func)
    );
  }

  // Sort
  const countKey = ttpCountsMode === 'campaigns' ? 'campaigns' : 'incidents';
  filtered.sort((a, b) => {
    let va, vb;
    if (ttpSortCol === 0) { va = a.id; vb = b.id; }
    else if (ttpSortCol === 1) { va = a.name; vb = b.name; }
    else if (ttpSortCol === 2) { va = a[countKey]; vb = b[countKey]; }
    else { va = a.cells.length; vb = b.cells.length; }
    if (typeof va === 'number') return ttpSortAsc ? va - vb : vb - va;
    return ttpSortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });

  // Render rows
  filtered.forEach(tech => {
    const tr = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.className = 'ttp-id';
    idCell.textContent = tech.id;
    tr.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.className = 'ttp-name';
    nameCell.textContent = tech.name;
    tr.appendChild(nameCell);

    const countCell = document.createElement('td');
    countCell.className = 'ttp-count';
    countCell.textContent = ttpCountsMode === 'campaigns' ? tech.campaigns : tech.incidents;
    tr.appendChild(countCell);

    const cellsCell = document.createElement('td');
    cellsCell.className = 'ttp-cells';
    tech.cells.forEach(cell => {
      const tag = document.createElement('span');
      tag.className = 'ttp-cell-tag';
      tag.textContent = `${cell.a} - ${cell.f}`;
      cellsCell.appendChild(tag);
    });
    tr.appendChild(cellsCell);

    tbody.appendChild(tr);
  });
}

// ─── Grid cell clicks for TTP filtering ───────────────────────────
document.getElementById('cdmGrid').addEventListener('click', (e) => {
  const cell = e.target.closest('.cdm-cell');
  if (!cell || currentTab !== 'threats') return;

  const asset = cell.dataset.asset;
  const func = cell.dataset.func;

  if (selectedCell && selectedCell.asset === asset && selectedCell.func === func) {
    // Deselect
    selectedCell = null;
    document.getElementById('ttpCellFilter').style.display = 'none';
  } else {
    // Select
    selectedCell = { asset, func };
    const filterEl = document.getElementById('ttpCellFilter');
    document.getElementById('ttpCellFilterText').textContent = `${asset} — ${func}`;
    filterEl.style.display = 'inline-flex';
  }

  updateTTPTable();
});

// ─── Clear cell filter ────────────────────────────────────────────
document.getElementById('ttpCellFilterClear').addEventListener('click', () => {
  selectedCell = null;
  document.getElementById('ttpCellFilter').style.display = 'none';
  updateTTPTable();
});

// ─── Year button wiring ──────────────────────────────────────────
document.querySelectorAll('.year-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    loadTTPYear(btn.dataset.year);
  });
});

// ─── Initial state ───────────────────────────────────────────────
loadVCDBData().then(() => {
  clearDataset();
  loadAllCarriers();
});
