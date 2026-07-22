import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { getMonitoringOverview } from "../services/monitoringService";
import { runManualScan } from "../services/scanService";
import socket from "../services/socket";

const MonitoringContext = createContext();

export const MonitoringProvider = ({ children }) => {
  const [summary, setSummary] = useState(null);
  const [threats, setThreats] = useState([]);
  const [parsedLogs, setParsedLogs] = useState([]);
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(false);

  // =============================
  // Load Monitoring Data
  // =============================
  const loadMonitoringData = useCallback(async (token) => {
    try {
      setLoading(true);

      const data = await getMonitoringOverview(token);

      console.log("========== Monitoring Data ==========");
      console.log(data);
      console.log("=====================================");

      setSummary(data.summary || null);
      setThreats(data.threats || []);
      setParsedLogs(data.parsedLogs || []);
      setEndpoints(data.endpoints || []);
    } catch (err) {
      console.error("Monitoring Load Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // =============================
  // Manual Scan
  // =============================
  const runScan = async (token) => {
    try {
      setLoading(true);

      console.log("🚀 Starting Manual Scan...");

      await runManualScan(token);

      await loadMonitoringData(token);

      console.log("✅ Manual Scan Finished");

      return true;
    } catch (err) {
      console.error("Manual Scan Error:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Socket Events
  // =============================
  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Connected to Socket.IO");
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected from Socket.IO");
    };

    const handleMonitoringUpdate = () => {
      console.log("📡 Monitoring Updated");

      const token = localStorage.getItem("token");

      if (token) {
        loadMonitoringData(token);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("monitoringUpdated", handleMonitoringUpdate);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("monitoringUpdated", handleMonitoringUpdate);
    };
  }, [loadMonitoringData]);

  return (
    <MonitoringContext.Provider
      value={{
        summary,
        threats,
        parsedLogs,
        endpoints,
        loading,
        loadMonitoringData,
        runScan,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export const useMonitoring = () => useContext(MonitoringContext);