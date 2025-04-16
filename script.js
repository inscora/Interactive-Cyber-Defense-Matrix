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
 
    // Add color options
    // Removed as out of scope for workshop
  /*  const colors = ['red', 'green', 'blue'];
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
    });*/

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

    
  let currentDataset = 'insurance_data/data_carrier_1.json'; // Initial dataset
  let maxCount = 0; // Will be dynamically determined from the data

  function loadAndDisplayData(datasetName) {
    fetch(datasetName)
      .then(response => response.json())
      .then(data => {

        updateMaxCount(data); // Recalculate maxCount for the new dataset

        const totalQ = getTotalQuestions(data); // Get total number of questions.
        //console.log("Unique Questions Count:", totalQ);

        document.getElementById('textQuestions').textContent = totalQ;

          data.forEach(row => {
            let prefix = "";
            let suffix = "";

            Object.entries(row).forEach(([key, value], index) => {
                // get the first 3 letters, cap them and get the corresponding rect
                if(key === ""){ // first is empty its the row ID
                  prefix = value.substring(0,3).toUpperCase();
                  //console.log(prefix);
                } else {
                  suffix = key.substring(0,3).toUpperCase();
                }
                //console.log(prefix+suffix)
                // Find all rectangles whose ID starts with the current prefix
                document.querySelectorAll(`rect[id^="${prefix}${suffix}"]`).forEach(rect => {

                  // Update the fill color based on the prefix (count questions for a given category)
                  const itemCount = (value.match(/\d+/)? ((value.match(/,/g) || []).length + 1) : 0);
                  
                  // Only display question count labels & right color set if not Threat TTP data
                  if (datasetName != "threat_data/data_TTPs.json") {

                    if(document.getElementById(`text${prefix}${suffix}`)){
                      // Only put a number if we have a question 
                      if (itemCount != 0){
                        document.getElementById(`text${prefix}${suffix}`).textContent =  itemCount;
                      } else {
                        document.getElementById(`text${prefix}${suffix}`).textContent =  "";
                      }
                    }

                    rect.setAttribute('fill', getDynamicBg(itemCount));

                  } else { // Processing Threat TTP Data

                    if(document.getElementById(`text${prefix}${suffix}`)){
                      document.getElementById(`text${prefix}${suffix}`).textContent =  "";
                    }

                    rect.setAttribute('fill', getDynamicBgThreats(itemCount));

                  }

                  rect.setAttribute('visibility', "visible");

                });
              });
          });

          if (datasetName != "threat_data/data_TTPs.json") { // Update metadata only for Threat TTPs

            const metadataRow = data.find(row => row[""] === "Metadata");

            // If found, grab the fields you need
            if (metadataRow) {
              const premium = metadataRow.Premium;   // e.g. "50001"
              const limit = metadataRow.Limit;       // e.g. "5000000"
              const exclusions = metadataRow.Exclusions; // e.g. "Cyber Warfare, Ransomware"
              const carrier = metadataRow.Carrier; // e.g. "Carrier 1"

             //console.log("Metadata Premium:", premium);
             //console.log("Metadata Limit:", limit);
             // console.log("Metadata Exclusions:", exclusions);
             // console.log("Carrier Name:", carrier);

              // Update the side block and make it visible
              document.getElementById('textPremium').textContent = premium;
              document.getElementById('textLimit').textContent = limit;
              document.getElementById('textExclusions').textContent = exclusions;
              document.getElementById('textCarrierName').textContent = carrier;

            } else {
              console.log("No metadata row found.");
            }

        } else { // Clear the side block for Threat TTPs
          
            document.getElementById('textPremium').textContent = 'N/A';
            document.getElementById('textLimit').textContent = 'N/A';
            document.getElementById('textExclusions').textContent = 'N/A';
            document.getElementById('textCarrierName').textContent = "Threats TTPs";
            document.getElementById('textQuestions').textContent = 'N/A';

        }

      })
      .catch(error => console.error('Error loading data:', error));
  }

  function clearDataset(){

    // Clear rectangles
    //
    document.querySelectorAll(`rect[id^=APP]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });
    document.querySelectorAll(`rect[id^=NET]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });
    document.querySelectorAll(`rect[id^=USE]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });
    document.querySelectorAll(`rect[id^=DAT]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });
    document.querySelectorAll(`rect[id^=DEV]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });

    // Clear Text Labels
    //
    document.querySelectorAll(`text[id^=textAPP]`).forEach(text => {
      // Update the fill color based on the prefix
      text.textContent =  "";
    });
    document.querySelectorAll(`text[id^=textNET]`).forEach(text => {
      // Update the fill color based on the prefix
      text.textContent =  "";
    });
    document.querySelectorAll(`text[id^=textUSE]`).forEach(text => {
      // Update the fill color based on the prefix
      text.textContent =  "";
    });
    document.querySelectorAll(`text[id^=textDAT]`).forEach(text => {
      // Update the fill color based on the prefix
      text.textContent =  "";
    });
    document.querySelectorAll(`text[id^=textDEV]`).forEach(text => {
      // Update the fill color based on the prefix
      text.textContent =  "";
    });

  }

  // Merges multiple JSON files into a single structure, returns a blob URL
  async function combineJSON(filePaths) {
    // We'll store rows in a map keyed by row ID, e.g. mergedMap["Devices"] = { "": "Devices", "Govern": "...", etc. }
    const mergedMap = {};
  
    // Fetch all files in parallel
    const allDataArrays = await Promise.all(
      filePaths.map(url => fetch(url).then(resp => resp.json()))
    );
  
    // Merge each file's array into mergedMap
    for (const dataArray of allDataArrays) {
      for (const row of dataArray) {
        const rowID = row[""]; // The row ID is stored under the empty-string key
        // Skip if no row ID OR if row is "Metadata"
        if (!rowID || rowID === "Metadata") {
          // Set to NA.
          
          // Clear the side block
          document.getElementById('textPremium').textContent = "N/A";
          document.getElementById('textLimit').textContent = "N/A";
          document.getElementById('textExclusions').textContent = "N/A";
          document.getElementById('textCarrierName').textContent = "ALL Carriers";

          continue;
        }
  
        // Initialize mergedMap entry if missing
        if (!mergedMap[rowID]) {
          // Start with just the row ID
          mergedMap[rowID] = { "": rowID };
        }
  
        // Merge each column (key)
        for (const [key, value] of Object.entries(row)) {
          if (key === "") continue; // already handled row ID
          if (!mergedMap[rowID][key]) {
            mergedMap[rowID][key] = value;
          } else {
            // Append if already present (comma-separated). 
            mergedMap[rowID][key] += "," + value;
          }
        }
      }
    }
  
    // Convert map to an array
    const mergedArray = Object.values(mergedMap);
  
    // Turn merged array into JSON, wrap in a Blob
    const mergedJson = JSON.stringify(mergedArray, null, 2);
    const blob = new Blob([mergedJson], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  }
  

  // Dataset array for every individual carrier
  const carrierFilePaths = [
    'insurance_data/data_carrier_1.json',
    'insurance_data/data_carrier_2.json',
    'insurance_data/data_carrier_3.json',
    'insurance_data/data_carrier_4.json',
    'insurance_data/data_carrier_5.json',
    'insurance_data/data_carrier_6.json',
  ];

  // Dynamically wire up each carrier button
  carrierFilePaths.forEach((filePath, index) => {
    const carrierNumber = index + 1;
    const button = document.querySelector(`.toggle-carrier_${carrierNumber}-dataset-btn`);
    if (button) {
      button.onclick = null;
      button.addEventListener('click', () => {
        currentDataset = filePath;
        loadAndDisplayData(currentDataset);
      });
    }
  });

  // Toggle ALL datasets (merged into a local blob)
  document.querySelector('.toggle-ALL-dataset-btn').addEventListener('click', () => {
    combineJSON(carrierFilePaths)
      .then(mergedBlobUrl => {
        button.onclick = null;
        currentDataset = mergedBlobUrl;
        loadAndDisplayData(currentDataset);
      })
      .catch(err => console.error(err));
  });

  
    // Toggle dataset button
    document.querySelector('.toggle-TTPs-dataset-btn').addEventListener('click', function() {
      currentDataset = 'threat_data/data_TTPs.json';
      loadAndDisplayData(currentDataset);
    });

    // Toggle dataset button
    document.querySelector('.toggle-clear-btn').addEventListener('click', function() {
        clearDataset();
    });

    // This function updates the maximum count based on the newly loaded dataset
  function updateMaxCount(data) {
    maxCount = 0; // Reset for the new dataset
    data.forEach(row => {
      Object.values(row).forEach(value => {
        const count = (value.match(/\n/g) || []).length + 1;
        maxCount = Math.max(maxCount, count);
      });
    });
  }

  // Toggle Govern
  function toggleGovern(){
    document.querySelectorAll(`rect[id^=APP]`).forEach(rect => {
      // Update the fill color based on the prefix
      rect.setAttribute('visibility', "hidden");
    });
  }


  function getDynamicBg(count) {
    if (count == 0) {
      return '#FFFFFF';
    } else {
      const colorStops = [
        { threshold: 0, bgColor: '#FFFFFF', textColor: '#000000' },
        { threshold: 0.2, bgColor: '#DFF1D6', textColor: '#000000' },
        { threshold: 0.3, bgColor: '#B5E0CA', textColor: '#000000' },
        { threshold: 0.4, bgColor: '#8FC1BB', textColor: '#000000' },
        { threshold: 0.5, bgColor: '#6FA2AD', textColor: '#FFFFFF' },
        { threshold: 0.6, bgColor: '#50809E', textColor: '#FFFFFF' },
        { threshold: 0.7, bgColor: '#305D8A', textColor: '#FFFFFF' },
        { threshold: 0.8, bgColor: '#003C73', textColor: '#FFFFFF' },
        { threshold: 1.0, bgColor: '#00204C', textColor: '#FFFFFF' },
      ];

      // Normalize count to the range of 0 to 1 based on maxCount
      const normalizedCount = maxCount > 0 ? count / maxCount : 0;
      // Find the appropriate color stop
      let selectedStop = colorStops[colorStops.length - 1]; // Default to the darkest if not found
      for (let i = 0; i < colorStops.length; i++) {
        if (normalizedCount <= colorStops[i].threshold) {
          selectedStop = colorStops[i];
          break;
        }
      }

      return selectedStop.bgColor;
    }
  }

  function getDynamicBgThreats(count) {
    if (count == 0) {
      return '#FFFFFF';
    } else {
      const colorStops = [
        { threshold: 0, bgColor: '#FFFFFF', textColor: '#000000' },  // White
        { threshold: 0.2, bgColor: '#F4CCCC', textColor: '#000000' }, // Light Pink
        { threshold: 0.3, bgColor: '#EA9999', textColor: '#000000' }, // Pink
        { threshold: 0.4, bgColor: '#E06666', textColor: '#000000' }, // Deeper Pink
        { threshold: 0.5, bgColor: '#FF0000', textColor: '#000000' }, // Light Red
        { threshold: 0.6, bgColor: '#CC0000', textColor: '#FFFFFF' }, // Red
        { threshold: 0.7, bgColor: '#990000', textColor: '#FFFFFF' }, // Dark Red
        { threshold: 0.8, bgColor: '#660000', textColor: '#FFFFFF' }, // Brown
        { threshold: 1.0, bgColor: '#331A00', textColor: '#FFFFFF' }, // Dark Brown
      ];

      // Normalize count to the range of 0 to 1 based on maxCount
      const normalizedCount = maxCount > 0 ? count / maxCount : 0;
      // Find the appropriate color stop
      let selectedStop = colorStops[colorStops.length - 1]; // Default to the darkest if not found
      for (let i = 0; i < colorStops.length; i++) {
        if (normalizedCount <= colorStops[i].threshold) {
          selectedStop = colorStops[i];
          break;
        }
      }

      return selectedStop.bgColor;
    }
  }

  function getTotalQuestions(data) {
    const uniqueCodes = new Set();
  
    data.forEach(row => {
      // Skip the row if its "" field is "Metadata"
      if (row[""] === "Metadata") {
        return;
      }
      
      // For each column except the row ID (""), parse codes
      Object.entries(row).forEach(([key, value]) => {
        if (key === "") {
          // This is just the row label ("Devices", "Applications", etc.)
          return;
        }
        if (typeof value !== "string") {
          // If it's not a string (maybe empty or other data), skip
          return;
        }
  
        // Split on commas to get individual codes (trim to remove newlines/spaces)
        const codes = value.split(",").map(code => code.trim());
        codes.forEach(code => {
          // If there's a non-empty code, add to our set
          if (code) {
            uniqueCodes.add(code);
          }
        });
      });
    });
  
    // Number of unique codes (C1-2, C1-3, etc.)
    return uniqueCodes.size;
  }

  
  // Load initial dataset
  clearDataset();
