// script.js

const SOLUTIONS = [
    { id: 'vCiso', label: 'vCiso' },
    { id: 'awarenessTraining', label: 'Awareness Training' },
    { id: 'mfaSso', label: 'MFA / SSO' },
    { id: 'emailSecurity', label: 'Email Security' },
    { id: 'iam', label: 'IAM' },
    { id: 'managedEdr', label: 'Managed EDR' },
    { id: 'patching', label: 'Patching' },
    { id: 'vpn', label: 'VPN' },
    { id: 'firewall', label: 'Firewall' },
    { id: 'managedSiem', label: 'Managed SIEM' },
    { id: 'incidentResponse', label: 'Incident Response' },
    { id: 'vmDbBackup', label: 'VM/DB Backup' },
    { id: 'phishingTests', label: 'Phishing Tests' },
    { id: 'managedPatching', label: 'Managed Patching' },
    { id: 'penTest', label: 'Pen Test' },
    { id: 'ztna', label: 'ZTNA' },
    { id: 'codeTesting', label: 'Code Testing' },
    { id: 'botManagement', label: 'Bot Management' },
    { id: 'managedFirewall', label: 'Managed Firewall' },
    { id: 'networkIntelligence', label: 'Network Intelligence' },
    { id: 'dns', label: 'DNS' },
    { id: 'ddos', label: 'DDoS' },
    { id: 'ddosTesting', label: 'DDoS Testing' },
    { id: 'pam', label: 'PAM' },
    { id: 'impersonation', label: 'Impersonation' },
    { id: 'drPlanAndRehearsals', label: 'DR Plan and Rehearsals' },
    { id: 'staffingAndRecruiting', label: 'Staffing and Recruiting' },
    { id: 'attackSurfaceManagement', label: 'Attack Surface Mngmt' },
    { id: 'sse', label: 'SSE' },
    { id: 'soc', label: 'SOC' },
    { id: 'managedGrc', label: 'Managed GRC' },
    { id: 'managedControlsAssurance', label: 'Mng\'d Controls Assurance' },
    { id: 'dataIdAndClassification', label: 'Data ID and Class' },
    { id: 'microsegmentation', label: 'Microsegmentation' },
    { id: 'policyEnforcement', label: 'Policy Enforcement' },
    { id: 'bugBounty', label: 'Bug Bounty' },
    { id: 'otSecurity', label: 'OT Security' },
    { id: 'apiDiscovery', label: 'API Discovery' },
    { id: 'apiProtection', label: 'API Protection' },
    { id: 'dataLossPrevention', label: 'Data Loss Prevention' },
    { id: 'darkWebScanning', label: 'Dark Web Scanning' },
    { id: 'ransomwareNegotiation', label: 'Ransom Negotiation' },
    { id: 'deviceBackups', label: 'Device Backups' },
    { id: 'cloudRecovery', label: 'Cloud Recovery' },
    { id: 'draas', label: 'DR-aaS' },
    { id: 'tapeBackup', label: 'Tape Backup' }
  ];
  
  const HIDE_CLASS_NAME = 'hide-solution';
  
  SOLUTIONS.forEach(solution => {
    const unorderedListElement = document.getElementById('solution-checkboxes');
    const svgGroupElement = document.getElementById(solution.id);
    
    if (svgGroupElement) {
      const rectElement = svgGroupElement.querySelector('rect');
      if (rectElement) {
        rectElement.classList.add(HIDE_CLASS_NAME);
        console.log(`Rect element found for ${solution.id}`);
  
        const listItemElement = document.createElement('li');
        const labelElement = document.createElement('label');
  
        labelElement.textContent = solution.label;
        
        listItemElement.appendChild(labelElement);
  
        const colors = ['red', 'green', 'blue'];
        colors.forEach(color => {
          const inputElement = document.createElement('input');
          inputElement.setAttribute('type', 'radio');
          inputElement.setAttribute('name', `${solution.id}-color`);
          inputElement.setAttribute('id', `${solution.id}-${color}`);
          inputElement.setAttribute('value', color);
  
          const colorLabel = document.createElement('label');
          colorLabel.setAttribute('for', `${solution.id}-${color}`);
          colorLabel.textContent = color;
  
          listItemElement.appendChild(inputElement);
          listItemElement.appendChild(colorLabel);
  
          inputElement.addEventListener('change', (event) => {
            if (event.target.checked) {
              console.log(`Changing color of ${solution.id} to ${event.target.value}`);
              rectElement.classList.remove(HIDE_CLASS_NAME);
              rectElement.setAttribute('fill', event.target.value);
            }
          });
        });
  
        unorderedListElement.appendChild(listItemElement);
      } else {
        console.log(`Rect element not found for ${solution.id}`);
      }
    } else {
      console.log(`SVG group element not found for ${solution.id}`);
    }
  });
  