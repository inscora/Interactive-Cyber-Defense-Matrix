const SOLUTIONS = [{
    id: 'vCiso',
    label: 'vCiso'
  },
  {
    id: 'awarenessTraining',
    label: 'Awareness Training'
  },
  {
    id: 'mfaSso',
    label: 'MFA / SSO'
  },
  {
    id: 'emailSecurity',
    label: 'Email Security'
  },
  {
    id: 'iam',
    label: 'IAM'
  },
  {
    id: 'managedEdr',
    label: 'Managed EDR'
  },
  {
    id: 'patching',
    label: 'Patching'
  },
  {
    id: 'vpn',
    label: 'VPN'
  },
  {
    id: 'firewall',
    label: 'Firewall'
  },
  {
    id: 'managedSiem',
    label: 'Managed SIEM'
  },
  {
    id: 'incidentResponse',
    label: 'Incident Response'
  },
  {
    id: 'vmDbBackup',
    label: 'VM/DB Backup'
  },
  {
    id: 'phishingTests',
    label: 'Phishing Tests'
  },
  {
    id: 'managedPatching',
    label: 'Managed Patching'
  },
  {
    id: 'penTest',
    label: 'Pen Test'
  },
  {
    id: 'ztna',
    label: 'ZTNA'
  },
  {
    id: 'codeTesting',
    label: 'Code Testing'
  },
  {
    id: 'botManagement',
    label: 'Bot Management'
  },
  {
    id: 'managedFirewall',
    label: 'Managed Firewall'
  },
  {
    id: 'networkIntelligence',
    label: 'Network Intelligence'
  },
  {
    id: 'dns',
    label: 'DNS'
  },
  {
    id: 'ddos',
    label: 'DDoS'
  },
  {
    id: 'ddosTesting',
    label: 'DDoS Testing'
  },
  {
    id: 'pam',
    label: 'PAM'
  },
  {
    id: 'impersonation',
    label: 'Impersonation'
  },
  {
    id: 'drPlanAndRehearsals',
    label: 'DR Plan and Rehears'
  },
  {
    id: 'staffingAndRecruiting',
    label: 'Staffing and Recruiting'
  },
  {
    id: 'attackSurfaceManagement',
    label: 'Attack Surface Mngmt'
  },
  {
    id: 'sse',
    label: 'SSE'
  },
  {
    id: 'soc',
    label: 'SOC'
  }, 
  {
    id: 'managedGrc',
    label: 'Managed GRC'
  },
  {
    id: 'managedControlsAssurance',
    label: "Mng'd Controls Assurance"
  },
  {
    id: 'dataIdAndClassification',
    label: 'Data ID and Class'
  },
  {
    id: 'microsegmentation',
    label: 'Microsegmentation'
  },
  {
    id: 'policyEnforcement',
    label: 'Policy Enforcement'
  },
  {
    id: 'bugBounty',
    label: 'Bug Bounty'
  },
  {
    id: 'otSecurity',
    label: 'OT Security'
  },
  {
    id: 'apiDiscovery',
    label: 'API Discovery'
  },
  {
    id: 'apiProtection',
    label: 'API Protection'
  },
  {
    id: 'dataLossPrevention',
    label: 'Data Loss Prevention'
  },
  {
    id: 'darkWebScanning',
    label: 'Dark Web Scanning'
  },
  {
    id: 'ransomwareNegotiation',
    label: 'Ransom Negotiation'
  },
  {
    id: 'deviceBackups',
    label: 'Device Backups'
  },
  {
    id: 'cloudRecovery',
    label: 'Cloud Recovery'
  },
  {
    id: 'draas',
    label: 'DR-aaS'
  },
  {
    id: 'tapeBackup',
    label: 'Tape Backup'
  }
];
const HIDE_CLASS_NAME = 'hide-solution';
const COLOR_CLASS_NAME = 'change-color';

SOLUTIONS.forEach(solution => {
  // Get elements
  const unorderedListElement = document.getElementById('solution-checkboxes');
  const svgRect = document.getElementById(solution.id);

  // Hide all SVG elements by default
  svgRect.classList.add(HIDE_CLASS_NAME);

  // Create list items with checkbox and label
  const listItemElement = document.createElement('li');
  const showHideCheckbox = document.createElement('input');
  const showHideLabel = document.createElement('label');
  const colorCheckbox = document.createElement('input');
  const colorLabel = document.createElement('label');

  // Set attributes for show/hide checkbox and label
  showHideCheckbox.setAttribute('type', 'checkbox');
  showHideCheckbox.setAttribute('id', `${solution.id}-show-hide-checkbox`);
  showHideLabel.setAttribute('for', `${solution.id}-show-hide-checkbox`);
  //showHideLabel.textContent = 'Show/Hide';

  // Add show/hide checkbox and label to list item
  listItemElement.appendChild(showHideCheckbox);
  listItemElement.appendChild(showHideLabel);

  // Set attributes for color checkbox and label
  colorCheckbox.setAttribute('type', 'checkbox');
  colorCheckbox.setAttribute('id', `${solution.id}-color-checkbox`);
  colorLabel.setAttribute('for', `${solution.id}-color-checkbox`);
  colorLabel.textContent = solution.label;

  // Add color checkbox and label to list item
  listItemElement.appendChild(colorCheckbox);
  listItemElement.appendChild(colorLabel);

  // Append list item to unordered list
  unorderedListElement.appendChild(listItemElement);

  // Add event listeners for show/hide
  showHideCheckbox.addEventListener('change', (event) => {
    svgRect.classList.toggle(HIDE_CLASS_NAME);
  });

  // Add event listeners for color change
  colorCheckbox.addEventListener('change', (event) => {
    svgRect.classList.toggle(COLOR_CLASS_NAME);
  });
});