import Scan from "../models/Scan.js";
import { manualScan } from "../scanner/scanScheduler.js";

export const getLatestScan = async (req, res) => {
  try {
    const latest = await Scan.findOne().sort({ createdAt: -1 });

    res.json({
      success: true,
      scan: latest,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getScanHistory = async (req, res) => {
  try {
    const scans = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      scans,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const runManualScan = async (req, res) => {
  try {
    const scan = await manualScan();

    res.json({
      success: true,
      message: "Manual Scan Completed",
      scan,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};