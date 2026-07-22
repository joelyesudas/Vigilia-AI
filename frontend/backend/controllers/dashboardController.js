import Log from "../models/Log.js";

export const getDashboard = async (req, res) => {
  try {
    // Get latest uploaded logs
    const logs = await Log.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    const latestLog = logs[0];

    res.status(200).json({
      success: true,

      summary: latestLog?.analysis?.summary || {
        securityScore: 100,
        riskLevel: "SAFE",
        totalEvents: 0,
        totalThreats: 0,
        criticalThreats: 0,
        highThreats: 0,
        mediumThreats: 0,
        lowThreats: 0,
      },

      threats: latestLog?.analysis?.threats || [],

      parsedLogs: latestLog?.analysis?.parsedLogs || [],

      recentLogs: logs,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};