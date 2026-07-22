import { runScan } from "./runScan.js";

let scanInterval = null;
let scanRunning = false;

// 5 seconds for testing
// Change back to 30 * 60 * 1000 after testing
let scanFrequency = 1000 * 60 * 30;

async function executeScan() {
  if (scanRunning) {
    console.log("⚠ Previous scan still running...");
    return;
  }

  scanRunning = true;

  try {
    console.log("🚀 Executing Scan...");
    await runScan("Automatic");
    console.log("✅ Automatic Scan Finished");
  } catch (err) {
    console.error("❌ Scan Error:", err);
  } finally {
    scanRunning = false;
  }
}

export const startScheduler = async () => {
  console.log("\n==============================");
  console.log("🛡 Vigilia AI Scheduler Started");
  console.log("==============================");

  console.log(`⏰ Scan Frequency: ${scanFrequency / 1000} seconds`);

  // Run immediately
  await executeScan();

  if (scanInterval) {
    clearInterval(scanInterval);
  }

  scanInterval = setInterval(async () => {
    console.log("⏰ Interval Fired");

    await executeScan();
  }, scanFrequency);

  console.log("✅ Scheduler Interval Created");
};

export const stopScheduler = () => {
  if (scanInterval) {
    clearInterval(scanInterval);
    scanInterval = null;
    console.log("🛑 Scheduler Stopped");
  }
};

export const restartScheduler = (minutes) => {
  stopScheduler();

  scanFrequency = minutes * 60 * 1000;

  console.log(`🔄 Scheduler Updated → Every ${minutes} Minutes`);

  startScheduler();
};

export const manualScan = async () => {
  console.log("🚀 Manual Scan Requested");

  return await runScan("Manual");
};