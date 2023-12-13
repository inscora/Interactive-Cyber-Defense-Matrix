const SOLUTIONS = [{
    id: 'vCiso',
    label: 'vCiso: Maturity M&A Assessments, Roadmap Build'
  },
  {
    id: 'managedGrc',
    label: 'Managed GRC'
  },
  {
    id: 'staffingAndRecruiting',
    label: 'Staffing and Recruiting'
  },
  {
    id: 'managedControlsAssurance',
    label: 'Managed Controls Assurance'
  },
  {
    id: 'awarenessTraining',
    label: 'Awareness Training'
  },
  {
    id: 'policyEnforcement',
    label: 'Policy Enforcement'
  },
  {
    id: 'iam',
    label: 'IAM'
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
    id: 'dataIdAndClassification',
    label: 'Data ID and Classification'
  },
  {
    id: 'attackSurfaceManagement',
    label: 'Attack Surface Management'
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
    id: 'pam',
    label: 'PAM'
  },
  {
    id: 'dataLossPrevention',
    label: 'Data Loss Prevention'
  },
  {
    id: 'impersonation',
    label: 'Impersonation'
  },
  {
    id: 'darkWebScanning',
    label: 'Dark Web Scanning'
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
    id: 'dns',
    label: 'DNS'
  },
  {
    id: 'networkIntelligence',
    label: 'Network Intelligence'
  },
  {
    id: 'managedFirewall',
    label: 'Managed Firewall'
  },
  {
    id: 'botManagement',
    label: 'Bot Management'
  },
  {
    id: 'sse',
    label: 'SSE'
  },
  {
    id: 'bugBounty',
    label: 'Bug Bounty'
  },
  {
    id: 'penTest',
    label: 'Pen Test'
  },
  {
    id: 'managedPatching',
    label: 'Managed Patching'
  },
  {
    id: 'otSecurity',
    label: 'OT Security'
  },
  {
    id: 'microsegmentation',
    label: 'Microsegmentation'
  },
  {
    id: 'managedEdr',
    label: 'Managed EDR'
  },
  {
    id: 'managedSiem',
    label: 'Managed SIEM'
  },
  {
    id: 'soc',
    label: 'SOC'
  },
  {
    id: 'incidentResponse',
    label: 'Incident Response'
  }, ,
  {
    id: 'ransomwareNegotiation',
    label: 'RansomwareNegotiation'
  },
  {
    id: 'tapeBackup',
    label: 'Tape Backup'
  },
  {
    id: 'vmDbBackup',
    label: 'VM/DB Backup'
  },
  {
    id: 'draas',
    label: 'DR-aaS'
  },
  {
    id: 'cloudRecovery',
    label: 'Cloud Recovery'
  },
  {
    id: 'deviceBackups',
    label: 'Device Backups'
  },
  {
    id: 'drPlanAndRehearsals',
    label: 'DR Plan and Rehearsals'
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
