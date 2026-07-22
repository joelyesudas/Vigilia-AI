import si from "systeminformation";

export const collectSystemInformation = async () => {
  try {
    const [
      cpuLoad,
      memory,
      disk,
      os,
      system,
      time,
      processes,
      networkInterfaces,
      networkStats,
    ] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.osInfo(),
      si.system(),
      si.time(),
      si.processes(),
      si.networkInterfaces(),
      si.networkStats(),
    ]);

    const diskInfo =
      disk.length > 0
        ? {
            total: disk[0].size,
            used: disk[0].used,
            usage: Number(disk[0].use.toFixed(2)),
          }
        : {
            total: 0,
            used: 0,
            usage: 0,
          };

    return {
      collectedAt: new Date(),

      cpu: {
        usage: Number(cpuLoad.currentLoad.toFixed(2)),
        cores: cpuLoad.cpus.length,
      },

      memory: {
        total: memory.total,
        used: memory.used,
        free: memory.free,
        usage: Number(
          ((memory.used / memory.total) * 100).toFixed(2)
        ),
      },

      disk: diskInfo,

      operatingSystem: {
        platform: os.platform,
        distro: os.distro,
        release: os.release,
        arch: os.arch,
      },

      device: {
        manufacturer: system.manufacturer,
        model: system.model,
        hostname: os.hostname,
      },

      uptime: time.uptime,

      processes: {
        total: processes.all,
        running: processes.running,
        blocked: processes.blocked,
      },

      network: {
        interfaces: networkInterfaces.length,
        received:
          networkStats.length > 0
            ? networkStats[0].rx_bytes
            : 0,

        transmitted:
          networkStats.length > 0
            ? networkStats[0].tx_bytes
            : 0,
      },
    };
  } catch (error) {
    console.error(
      "❌ System Collector Error:",
      error.message
    );

    throw error;
  }
};