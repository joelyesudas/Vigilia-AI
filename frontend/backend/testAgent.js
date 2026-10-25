import "dotenv/config";
import { investigateIncident } from "./services/agentOrchestrator.js";

const evidence = {
  incidentId: "DEMO-001",

  authenticationEvents: [
    {
      ip: "192.0.2.10",
      eventType: "failed_login",
      username: "admin",
      timestamp: "2026-10-23T10:00:00Z",
    },
    {
      ip: "192.0.2.10",
      eventType: "failed_login",
      username: "admin",
      timestamp: "2026-10-23T10:01:00Z",
    },
    {
      ip: "192.0.2.10",
      eventType: "successful_login",
      username: "admin",
      timestamp: "2026-10-23T10:02:00Z",
    },
  ],

  riskAssessment: {
    score: 75,
    status: "HIGH",
  },

  mitreTechniques: [
    {
      techniqueId: "T1110",
      name: "Brute Force",
    },
  ],
};

try {
  console.log("Starting Gemini AI investigation...\n");

  const result = await investigateIncident(evidence);

  console.log("INVESTIGATION REPORT:\n");
  console.log(result.report);

  console.log("\nAGENT TOOL TRACE:\n");
  console.dir(result.trace, { depth: null });

  console.log("\nInvestigation completed.");
} catch (error) {
  console.error("Agent test failed:", error.message);
  process.exitCode = 1;
}