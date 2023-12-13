const SOLUTIONS = [{
    id: 'vCiso',
    label: 'vCiso: Maturity M&A Assessments, Roadmap Build'
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
    label: 'DR Plan and Rehearsals'
  },
  {
    id: 'staffingAndRecruiting',
    label: 'Staffing and Recruiting'
  },
  {
    id: 'attackSurfaceManagement',
    label: 'Attack Surface Management'
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
    label: 'Managed Controls Assurance'
  },
  {
    id: 'dataIdAndClassification',
    label: 'Data ID and Classification'
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
    label: 'RansomwareNegotiation'
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


SOLUTIONS.forEach(solution => {
  // Get elements
  const unorderedListElement = document.getElementById('solution-checkboxes');
  const svgRect = document.getElementById(solution.id);

  // Hide SVG by default
  svgRect.classList.add(HIDE_CLASS_NAME);

  // Create elements
  const listItemElement = document.createElement('li');
  const showHideLabel = document.createElement('label');
  const showHideCheckbox = document.createElement('input');
  const colorLabel = document.createElement('label');
  const colorCheckbox = document.createElement('input');

  // Set attributes
  showHideCheckbox.setAttribute('type', 'checkbox');
  showHideCheckbox.setAttribute('id', `${solution.id}-show-hide-checkbox`);
  showHideLabel.setAttribute('for', `${solution.id}-show-hide-checkbox`);
  showHideLabel.textContent = 'Show/Hide';

  colorCheckbox.setAttribute('type', 'checkbox');
  colorCheckbox.setAttribute('id', `${solution.id}-color-checkbox`);
  colorLabel.setAttribute('for', `${solution.id}-color-checkbox`);
  colorLabel.textContent = 'Change Color';

  // Append elements to li
  listItemElement.appendChild(showHideCheckbox);
  listItemElement.appendChild(showHideLabel);
  listItemElement.appendChild(colorCheckbox);
  listItemElement.appendChild(colorLabel);

  // Append li to ul
  unorderedListElement.appendChild(listItemElement);

  // Add event listeners
  showHideCheckbox.addEventListener('change', (event) => {
    svgRect.classList.toggle(HIDE_CLASS_NAME);
  });

  colorCheckbox.addEventListener('change', (event) => {
    if (event.target.checked) {
      // Change SVG color
      svgRect.style.fill = '#08DD4C'; // Change to desired color
    } else {
      // Reset SVG color to default
      svgRect.style.fill = '#355bb7';
    }
  });
});
