import Log from "../models/Log.js";
import path from "path";

import { getIO } from "../socket.js";

import { parseLogFile } from "../services/logParser.js";
import { detectThreats } from "../services/threatDetectionService.js";
import { mapMitreTechniques } from "../services/mitreMappingService.js";
import { calculateRisk } from "../utils/riskCalculator.js";

export const uploadLog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Create Log Document
    const log = await Log.create({
      fileName: req.file.filename,
      originalName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      status: "Uploaded",
    });

    // Uploaded file path
    const filePath = path.resolve(
      "src",
      "uploads",
      req.file.filename
    );

    // Parse Logs
    const parsedLogs = await parseLogFile(filePath);

    // Detect Threats
    const threats = detectThreats(parsedLogs);

    // MITRE Mapping
    const enrichedThreats = mapMitreTechniques(threats);

    // Security Summary
    const summary = calculateRisk(
      enrichedThreats,
      parsedLogs.length
    );

    console.log("\n========== ANALYSIS ==========");
    console.log(summary);
    console.log(parsedLogs.length);
    console.log(enrichedThreats.length);
    console.log("==============================\n");

    // Save analysis
    log.analysis = {
      summary,
      parsedLogs,
      threats: enrichedThreats,
    };

    log.status = "Completed";

    console.log("Saving document...");

    await log.save();

    console.log("Document saved successfully!");

    // Verify saved document
    const savedLog = await Log.findById(log._id);

    console.log("\n========== SAVED DOCUMENT ==========");
    console.dir(savedLog.toObject(), { depth: null });
    console.log("===================================\n");

    // ✅ Emit Socket.IO event AFTER everything is saved
    const io = getIO();

    io.emit("monitoringUpdated", {
      summary,
      threats: enrichedThreats,
      parsedLogs,
    });

    console.log("📡 Monitoring update emitted.");

    res.status(201).json({
      success: true,
      message: "Log analyzed successfully",
      summary,
      parsedLogs,
      threats: enrichedThreats,
      log: savedLog,
    });
  } catch (error) {
    console.error("\n========== ERROR ==========");
    console.error(error);
    console.log("===========================\n");

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    console.log("\n========== DATABASE LOGS ==========");
    console.dir(logs, { depth: null });
    console.log("===================================\n");

    res.status(200).json({
      success: true,
      count: logs.length,
      logs,
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