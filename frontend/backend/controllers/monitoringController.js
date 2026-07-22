import Scan from "../models/Scan.js";

export const getMonitoringOverview = async (req, res) => {
  try {
    const latestScan = await Scan.findOne()
      .sort({ createdAt: -1 });

    if (!latestScan) {
      return res.status(404).json({
        success: false,
        message: "No scan data found.",
      });
    }

    const summary = {
      securityScore: latestScan.securityScore,
      riskLevel: latestScan.riskLevel,
      totalThreats: latestScan.summary?.totalThreats ?? 0,
      criticalThreats: latestScan.summary?.criticalThreats ?? 0,
      warnings: latestScan.summary?.warnings ?? 0,

      totalEndpoints: 1,

      aiConfidence: latestScan.threats?.length
        ? Math.max(...latestScan.threats.map(t => t.confidence || 0))
        : 100,
    };

    const endpoints = [
      {
        id: latestScan.scanId,
        name: latestScan.system?.hostname || "Local Machine",
        os: latestScan.system?.os || "Unknown",

        status:
          latestScan.riskLevel === "Critical"
            ? "Critical"
            : latestScan.riskLevel === "High"
            ? "Warning"
            : "Healthy",

        cpu: latestScan.system?.cpu ?? 0,
        ram: latestScan.system?.memory ?? 0,
        threats: latestScan.summary?.totalThreats ?? 0,
        lastSeen: "Now",
      },
    ];

    res.status(200).json({
      success: true,

      summary,

      threats: latestScan.threats,

      parsedLogs: [],

      endpoints,

      system: latestScan.system,
      network: latestScan.network,
      processes: latestScan.processes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};