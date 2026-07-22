import { threatDatabase } from "../data/threatDatabase.js";

export const detectThreats = (parsedLogs) => {
  const detectedThreats = [];

  parsedLogs.forEach((log) => {
    const message = log.raw.toLowerCase();

    threatDatabase.forEach((threat) => {
      const matched = threat.keywords.some((keyword) =>
        message.includes(keyword.toLowerCase())
      );

      if (matched) {
        detectedThreats.push({
          id: threat.id,
          type: threat.threat,
          severity: threat.severity,
          confidence: threat.confidence,
          mitre: threat.mitre,
          recommendation: threat.recommendation,

          timestamp: log.timestamp,
          ip: log.ip,
          username: log.username,

          matchedLog: log.raw,
        });
      }
    });
  });

  // Remove duplicate detections for the same log/threat
  const uniqueThreats = [];

  const seen = new Set();

  for (const threat of detectedThreats) {
    const key = `${threat.type}-${threat.matchedLog}`;

    if (!seen.has(key)) {
      seen.add(key);
      uniqueThreats.push(threat);
    }
  }

  return uniqueThreats;
};