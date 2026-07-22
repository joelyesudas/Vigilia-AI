export const mitreDatabase = [
  {
    threat: "Brute Force Attack",
    techniqueId: "T1110",
    technique: "Brute Force",
    tactic: "Credential Access",
    description:
      "Adversaries may attempt to guess passwords to gain unauthorized access."
  },

  {
    threat: "Ransomware Activity",
    techniqueId: "T1486",
    technique: "Data Encrypted for Impact",
    tactic: "Impact",
    description:
      "Adversaries encrypt files to interrupt operations and demand ransom."
  },

  {
    threat: "Malware Detection",
    techniqueId: "T1204",
    technique: "User Execution",
    tactic: "Execution",
    description:
      "Malicious software executed on the target system."
  },

  {
    threat: "Suspicious Network Activity",
    techniqueId: "T1046",
    technique: "Network Service Discovery",
    tactic: "Discovery",
    description:
      "Scanning or probing the network to discover services."
  },

  {
    threat: "Unauthorized Access",
    techniqueId: "T1078",
    technique: "Valid Accounts",
    tactic: "Initial Access",
    description:
      "Adversaries use valid credentials to gain access."
  },

  {
    threat: "Critical Security Alert",
    techniqueId: "T1562",
    technique: "Impair Defenses",
    tactic: "Defense Evasion",
    description:
      "Attempts to disable or bypass security controls."
  }
];