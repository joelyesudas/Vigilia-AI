import fs from "fs/promises";

export const parseLogFile = async (filePath) => {
  const fileContent = await fs.readFile(filePath, "utf-8");

  const lines = fileContent
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "");

  const parsedLogs = [];

  for (const line of lines) {
    parsedLogs.push({
      raw: line,
      timestamp: extractTimestamp(line),
      ip: extractIP(line),
      severity: extractSeverity(line),
      username: extractUsername(line),
    });
  }

  return parsedLogs;
};

function extractTimestamp(line) {
  const match = line.match(
    /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
  );

  return match ? match[0] : null;
}

function extractIP(line) {
  const match = line.match(
    /\b(?:\d{1,3}\.){3}\d{1,3}\b/
  );

  return match ? match[0] : null;
}

function extractSeverity(line) {
  const severities = [
    "INFO",
    "WARNING",
    "ERROR",
    "CRITICAL",
  ];

  const found = severities.find((level) =>
    line.toUpperCase().includes(level)
  );

  return found || "UNKNOWN";
}

function extractUsername(line) {
  const match = line.match(/user[:= ]+([a-zA-Z0-9._-]+)/i);

  return match ? match[1] : null;
}