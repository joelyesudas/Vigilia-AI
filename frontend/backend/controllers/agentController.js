import Log from "../models/Log.js";
import { investigateIncident } from "../services/agentOrchestrator.js";

export const investigateWithAgent = async (req, res) => {
  try {
    const latestLog = await Log.findOne()
      .sort({ createdAt: -1 })
      .lean();

    if (!latestLog || !latestLog.analysis) {
      return res.status(404).json({
        success: false,
        message: "No analyzed security logs found.",
      });
    }

    const analysis = latestLog.analysis;

    const parsedLogs = Array.isArray(analysis.parsedLogs)
      ? analysis.parsedLogs
      : [];

    const threats = Array.isArray(analysis.threats)
      ? analysis.threats
      : [];

    // Convert parsed logs into authentication events.
    const authenticationEvents = parsedLogs.map((log) => {
      const raw = String(log.raw || "");
      const normalized = raw.toLowerCase();

      let eventType = "other";

      if (
        normalized.includes("failed") ||
        normalized.includes("failure") ||
        normalized.includes("invalid password") ||
        normalized.includes("authentication error")
      ) {
        eventType = "failed_login";
      } else if (
        normalized.includes("successful") ||
        normalized.includes("success") ||
        normalized.includes("accepted password") ||
        normalized.includes("login succeeded")
      ) {
        eventType = "successful_login";
      }

      return {
        ip: log.ip || null,
        eventType,
        username: log.username || null,
        timestamp: log.timestamp || null,
        raw,
      };
    });

    // Extract available MITRE ATT&CK mappings.
    const mitreTechniques = threats
      .map((threat) => {
        const mitre = threat.mitre || {};

        const techniqueId =
          mitre.techniqueId || threat.mitreTechnique || null;

        if (!techniqueId) return null;

        return {
          techniqueId,
          name: mitre.technique || threat.type || "Unknown technique",
          tactic: mitre.tactic || null,
          description: mitre.description || null,
        };
      })
      .filter(Boolean);

    const evidence = {
      incidentId: String(latestLog._id),
      sourceFile: latestLog.originalName || latestLog.fileName || null,
      summary: analysis.summary || {},
      authenticationEvents,
      riskAssessment: {
        score: analysis.summary?.securityScore ?? null,
        status: analysis.summary?.riskLevel ?? "Unknown",
        totalThreats:
          analysis.summary?.totalThreats ?? threats.length,
      },
      mitreTechniques,
      threats: threats.map((threat) => ({
        type: threat.type,
        severity: threat.severity,
        confidence: threat.confidence,
        recommendation: threat.recommendation,
        ip: threat.ip,
        username: threat.username,
        matchedLog: threat.matchedLog,
        mitre: threat.mitre,
      })),
    };

    const result = await investigateIncident(evidence);

    return res.status(200).json({
      success: true,
      incidentId: evidence.incidentId,
      report: result.report,
      trace: result.trace,
      stepsCompleted: result.stepsCompleted,
      needsReview: result.needsReview,
    });
  } catch (error) {
    console.error("AI Agent Investigation Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI agent investigation failed.",
      error: error.message,
    });
  }
};

