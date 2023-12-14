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
  //Get ul and svg elements
  const unorderedListElement = document.getElementById('solution-checkboxes');
  const svgRect = document.getElementById(solution.id);
  
  //hide all svg elements by default
  svgRect.classList.toggle(HIDE_CLASS_NAME);

  //Create elements per solution id
  const listItemElement = document.createElement('li');
  const labelElement = document.createElement('label');
  const inputElement = document.createElement('input');

  //Set attributes on elements
  inputElement.setAttribute('type', 'checkbox');
  inputElement.setAttribute('id', `${solution.id}-checkbox`);
  labelElement.setAttribute('for', `${solution.id}-checkbox`);
  labelElement.textContent = solution.label;

  //Append elements to li
  listItemElement.appendChild(inputElement);
  listItemElement.appendChild(labelElement);

  //Append li to ul
  unorderedListElement.appendChild(listItemElement);

  //Add event listener to show/hide matching svg rect
  inputElement.addEventListener('change', (event) => {
    svgRect.classList.toggle(HIDE_CLASS_NAME);
  });
});
