export const analyzeThreats = (systemData) => {
  const threats = [];
  let securityScore = 100;

  const {
    cpu,
    memory,
    disk,
    processes,
    network,
  } = systemData;

  // -------------------------------
  // CPU Analysis
  // -------------------------------
  if (cpu.usage >= 90) {
    threats.push({
      title: "Extremely High CPU Usage",
      severity: "Critical",
      confidence: 98,
      mitreTechnique: "T1496",
      description:
        "CPU usage exceeded 90%. Possible malware or cryptomining activity.",
    });

    securityScore -= 25;
  } else if (cpu.usage >= 75) {
    threats.push({
  title: "High CPU Usage",
  severity: "High",
  confidence: 90,
  description: "CPU utilization is unusually high.",

  mitre: {
    techniqueId: "T1496",
    technique: "Resource Hijacking",
    tactic: "Impact",
    description: "Adversaries may hijack system resources such as CPU for cryptomining or other malicious computation."
  }
});

    securityScore -= 15;
  }

  // -------------------------------
  // Memory Analysis
  // -------------------------------
  if (memory.usage >= 90) {
    threats.push({
      title: "Memory Exhaustion",
      severity: "High",
      confidence: 92,
      mitreTechnique: "T1499",
      description:
        "Memory usage is critically high.",
    });

    securityScore -= 15;
  }

  // -------------------------------
  // Disk Analysis
  // -------------------------------
  if (disk.usage >= 95) {
    threats.push({
      title: "Disk Almost Full",
      severity: "High",
      confidence: 95,
      mitreTechnique: "T1565",
      description:
        "Less than 5% storage remaining.",
    });

    securityScore -= 12;
  }

  // -------------------------------
  // Process Analysis
  // -------------------------------
  if (processes.running >= 350) {
    threats.push({
      title: "Abnormally High Process Count",
      severity: "Medium",
      confidence: 82,
      mitreTechnique: "T1055",
      description:
        "Large number of running processes detected.",
    });

    securityScore -= 10;
  }

  // -------------------------------
  // Network Analysis
  // -------------------------------
  if (network.interfaces > 8) {
    threats.push({
      title: "Multiple Network Interfaces",
      severity: "Low",
      confidence: 70,
      mitreTechnique: "T1049",
      description:
        "Multiple active network interfaces detected.",
    });

    securityScore -= 5;
  }

  // Prevent score below zero
  securityScore = Math.max(0, securityScore);

  // -------------------------------
  // Determine Risk Level
  // -------------------------------
  let riskLevel = "Safe";

  if (securityScore < 40) {
    riskLevel = "Critical";
  } else if (securityScore < 60) {
    riskLevel = "High";
  } else if (securityScore < 80) {
    riskLevel = "Medium";
  } else if (securityScore < 95) {
    riskLevel = "Low";
  }

  return {
    securityScore,
    riskLevel,
    threats,

    summary: {
      totalThreats: threats.length,

      criticalThreats: threats.filter(
        (t) => t.severity === "Critical"
      ).length,

      warnings: threats.filter(
        (t) =>
          t.severity === "Medium" ||
          t.severity === "High"
      ).length,
    },
  };
};