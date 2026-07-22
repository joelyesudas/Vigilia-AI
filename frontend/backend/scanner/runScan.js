import { randomUUID } from "crypto";

import Scan from "../models/Scan.js";

import { collectSystemInformation } from "./systemCollector.js";
import { analyzeThreats } from "./threatAnalyzer.js";

export const runScan = async (scanType = "Automatic") => {
  const startedAt = new Date();

  try {
    console.log("\n===============================");
    console.log("🛡 Starting Vigilia AI Scan...");
    console.log("===============================\n");

    // STEP 1
    const systemData = await collectSystemInformation();

    // STEP 2
    const analysis = analyzeThreats(systemData);

    const finishedAt = new Date();

    const duration =
      Math.round((finishedAt - startedAt) / 1000);

    // STEP 3
    const scan = await Scan.create({
      scanId: randomUUID(),

      startedAt,
      finishedAt,

      duration,

      status: "Completed",

      scanType,

      securityScore: analysis.securityScore,

      riskLevel: analysis.riskLevel,

      system: {
        cpu: systemData.cpu.usage,
        memory: systemData.memory.usage,
        disk: systemData.disk.usage,
        uptime: systemData.uptime,

        os: systemData.operatingSystem.distro,

        hostname: systemData.device.hostname,

        platform:
          systemData.operatingSystem.platform,

        kernel:
          systemData.operatingSystem.release,
      },

      processes: {
        total: systemData.processes.total,
        suspicious: analysis.summary.warnings,
      },

      network: {
        activeConnections: systemData.network.interfaces,
        interfaces: systemData.network.interfaces,
        openPorts: 0,
      },

      threats: analysis.threats,

      summary: analysis.summary,
    });

    console.log("✅ Scan Completed Successfully\n");

    console.table({
      SecurityScore: analysis.securityScore,
      Risk: analysis.riskLevel,
      Threats: analysis.summary.totalThreats,
      Duration: `${duration}s`,
    });

    return scan;
  } catch (error) {
    console.error("❌ Scan Failed");

    console.error(error);

    await Scan.create({
      scanId: randomUUID(),

      startedAt,

      finishedAt: new Date(),

      duration: 0,

      status: "Failed",

      scanType,
    });

    throw error;
  }
};