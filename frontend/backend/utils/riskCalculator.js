export const calculateRisk = (threats, totalEvents) => {
  let critical = 0;
  let high = 0;
  let medium = 0;
  let low = 0;

  threats.forEach((threat) => {
    switch (threat.severity.toLowerCase()) {
      case "critical":
        critical++;
        break;

      case "high":
        high++;
        break;

      case "medium":
        medium++;
        break;

      case "low":
        low++;
        break;

      default:
        break;
    }
  });

  let score = 100;

  score -= critical * 25;
  score -= high * 15;
  score -= medium * 8;
  score -= low * 3;

  score = Math.max(score, 0);

  let status = "SAFE";

  if (score <= 25) {
    status = "CRITICAL";
  } else if (score <= 50) {
    status = "HIGH";
  } else if (score <= 75) {
    status = "MEDIUM";
  } else {
    status = "LOW";
  }

  return {
    securityScore: score,

    riskLevel: status,

    totalEvents,

    totalThreats: threats.length,

    criticalThreats: critical,

    highThreats: high,

    mediumThreats: medium,

    lowThreats: low,
  };
};