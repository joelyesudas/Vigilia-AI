export const threatDatabase = [
  {
    id: 1,
    keywords: [
      "failed login",
      "authentication failed",
      "login failed",
      "invalid password",
      "brute force",
      "multiple failed login"
    ],
    threat: "Brute Force Attack",
    severity: "High",
    confidence: 95,
    mitre: "T1110",
    recommendation:
      "Temporarily lock the account and enable MFA."
  },

  {
    id: 2,
    keywords: [
      "ransomware",
      "encrypting files",
      "file encryption"
    ],
    threat: "Ransomware Activity",
    severity: "Critical",
    confidence: 99,
    mitre: "T1486",
    recommendation:
      "Immediately isolate the affected endpoint."
  },

  {
    id: 3,
    keywords: [
      "malware",
      "trojan",
      "worm",
      "virus",
      "backdoor"
    ],
    threat: "Malware Detection",
    severity: "Critical",
    confidence: 98,
    mitre: "T1204",
    recommendation:
      "Run a full malware scan and isolate the system."
  },

  {
    id: 4,
    keywords: [
      "unauthorized",
      "access denied",
      "permission denied"
    ],
    threat: "Unauthorized Access",
    severity: "High",
    confidence: 92,
    mitre: "T1078",
    recommendation:
      "Verify the account and review access logs."
  },

  {
    id: 5,
    keywords: [
      "firewall blocked",
      "blocked connection",
      "blocked ip",
      "port scan",
      "network scan"
    ],
    threat: "Suspicious Network Activity",
    severity: "Medium",
    confidence: 88,
    mitre: "T1046",
    recommendation:
      "Investigate the source IP."
  },

  {
    id: 6,
    keywords: [
      "alert",
      "critical",
      "emergency",
      "fatal"
    ],
    threat: "Critical Security Alert",
    severity: "Critical",
    confidence: 100,
    mitre: "T1562",
    recommendation:
      "Immediate SOC investigation required."
  },

  {
    id: 7,
    keywords: [
      "sql injection",
      "sqli"
    ],
    threat: "SQL Injection Attack",
    severity: "Critical",
    confidence: 97,
    mitre: "T1190",
    recommendation:
      "Block the source IP and review affected web applications."
  },

  {
    id: 8,
    keywords: [
      "privilege escalation",
      "elevated privileges"
    ],
    threat: "Privilege Escalation",
    severity: "Critical",
    confidence: 96,
    mitre: "T1068",
    recommendation:
      "Investigate privileged accounts immediately."
  },

  {
    id: 9,
    keywords: [
      "lateral movement"
    ],
    threat: "Lateral Movement",
    severity: "Critical",
    confidence: 96,
    mitre: "T1021",
    recommendation:
      "Isolate compromised systems to stop propagation."
  },

  {
    id: 10,
    keywords: [
      "credential dumping"
    ],
    threat: "Credential Dumping",
    severity: "High",
    confidence: 94,
    mitre: "T1003",
    recommendation:
      "Reset affected credentials and review account activity."
  },

  {
    id: 11,
    keywords: [
      "reverse shell"
    ],
    threat: "Reverse Shell Activity",
    severity: "Critical",
    confidence: 98,
    mitre: "T1059",
    recommendation:
      "Terminate the connection and isolate the host."
  },

  {
    id: 12,
    keywords: [
      "dns tunneling"
    ],
    threat: "DNS Tunneling",
    severity: "High",
    confidence: 93,
    mitre: "T1071",
    recommendation:
      "Inspect DNS traffic and block suspicious domains."
  },

  {
    id: 13,
    keywords: [
      "command and control",
      "c2 communication"
    ],
    threat: "Command & Control Communication",
    severity: "Critical",
    confidence: 99,
    mitre: "T1071",
    recommendation:
      "Immediately isolate the affected endpoint and investigate."
  }
];