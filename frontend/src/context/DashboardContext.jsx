import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { uploadLog as uploadLogService } from "../services/dashboardService";
import socket from "../services/socket";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const emptySummary = {
  securityScore: null,
  riskLevel: null,

  totalEvents: 0,
  totalThreats: 0,
  criticalThreats: 0,
  highThreats: 0,
  mediumThreats: 0,
  lowThreats: 0,

  cpu: null,
  memory: null,
  disk: null,

  uptime: null,
  os: null,
  hostname: null,
  platform: null,
  kernel: null,

  processes: 0,
  suspiciousProcesses: 0,

  activeConnections: 0,
  interfaces: 0,
  openPorts: 0,
};

const [summary, setSummary] = useState(emptySummary);

const [analysisSource, setAnalysisSource] = useState(null);
// "scan"
// "upload"
// null

  const [threats, setThreats] = useState([]);
  const [parsedLogs, setParsedLogs] = useState([]);

  const [reportInfo, setReportInfo] = useState({
    generatedAt: null,
    reportId: null,
  });

  const [loading, setLoading] = useState(false);
const loadLatestScan = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/scans/latest"
    );

    if (!data.scan) {
  setSummary(emptySummary);
  setThreats([]);
  setParsedLogs([]);
  setAnalysisSource(null);
  return;
}

    setSummary({
  securityScore: data.scan.securityScore ?? null,
  riskLevel: data.scan.riskLevel ?? null,

  totalEvents: data.scan.processes?.total ?? 0,

  totalThreats: data.scan.summary?.totalThreats ?? 0,
  criticalThreats: data.scan.summary?.criticalThreats ?? 0,
  highThreats: 0,
  mediumThreats: 0,
  lowThreats: 0,

  cpu: data.scan.system?.cpu ?? null,
  memory: data.scan.system?.memory ?? null,
  disk: data.scan.system?.disk ?? null,

  uptime: data.scan.system?.uptime ?? null,
  os: data.scan.system?.os ?? null,
  hostname: data.scan.system?.hostname ?? null,
  platform: data.scan.system?.platform ?? null,
  kernel: data.scan.system?.kernel ?? null,

  processes: data.scan.processes?.total ?? 0,
  suspiciousProcesses: data.scan.processes?.suspicious ?? 0,

  activeConnections: data.scan.network?.activeConnections ?? 0,
  interfaces: data.scan.network?.interfaces ?? 0,
  openPorts: data.scan.network?.openPorts ?? 0,
});

    setThreats(data.scan.threats || []);
    setAnalysisSource("scan");
  } catch (err) {
    console.log("Latest Scan Error:", err);
  }
};
  useEffect(() => {
    loadLatestScan();
    socket.on("scanCompleted", (data) => {
  console.log("🛡 Scheduled Scan", data);

  setSummary({
  securityScore:
    data.securityScore ??
    data.summary?.securityScore ??
    null,

  riskLevel:
    data.riskLevel ??
    data.summary?.riskLevel ??
    null,

  totalEvents:
    data.processes?.total ??
    0,

  totalThreats:
    data.summary?.totalThreats ??
    0,

  criticalThreats:
    data.summary?.criticalThreats ??
    0,

  highThreats: 0,
  mediumThreats: 0,
  lowThreats: 0,

  cpu:
    data.system?.cpu ??
    null,

  memory:
    data.system?.memory ??
    null,

  disk:
    data.system?.disk ??
    null,

  uptime:
    data.system?.uptime ??
    null,

  os:
    data.system?.os ??
    null,

  hostname:
    data.system?.hostname ??
    null,

  platform:
    data.system?.platform ??
    null,

  kernel:
    data.system?.kernel ??
    null,

  processes:
    data.processes?.total ??
    0,

  suspiciousProcesses:
    data.processes?.suspicious ??
    0,

  activeConnections:
    data.network?.activeConnections ??
    0,

  interfaces:
    data.network?.interfaces ??
    0,

  openPorts:
    data.network?.openPorts ??
    0,
});
  setThreats(data.threats);
  setAnalysisSource("scan");

setReportInfo({
  generatedAt: new Date().toLocaleString(),
  reportId: `VG-${Date.now()}`,
});

  toast.success(
    `🛡 Scheduled Scan Completed\nScore: ${data.summary.securityScore}%`,
    {
      autoClose: 4000,
    }
  );

  if (data.summary.riskLevel === "Critical") {
    toast.error("🚨 Critical Threat Detected!", {
      autoClose: 5000,
    });
  }
});
    socket.on("monitoringUpdated", (data) => {
      console.log("📡 Live Monitoring Update", data);

      setSummary(data.summary);
      setThreats(data.threats);
      setParsedLogs(data.parsedLogs);
      setAnalysisSource("upload");

      setReportInfo({
        generatedAt: new Date().toLocaleString(),
        reportId: `VG-${Date.now()}`,
      });

      // Enterprise Notification
      toast.success(
        `🛡 Analysis Completed\nThreats: ${data.summary.totalThreats} | Risk: ${data.summary.riskLevel}`,
        {
          position: "top-right",
          autoClose: 4000,
        }
      );

      if (data.summary.riskLevel === "CRITICAL") {
        toast.error("🚨 CRITICAL Threat Detected!", {
          position: "top-right",
          autoClose: 5000,
        });
      } else if (data.summary.riskLevel === "HIGH") {
        toast.warning("⚠ High Risk Activity Detected!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    });

    return () => {
  socket.off("monitoringUpdated");
  socket.off("scanCompleted");
};
  }, []);

  const uploadLog = async (formData, token) => {
    try {
      setLoading(true);

      const data = await uploadLogService(formData, token);

      setSummary(data.summary);
      setThreats(data.threats);
      setParsedLogs(data.parsedLogs);
      setAnalysisSource("upload");

      setReportInfo({
        generatedAt: new Date().toLocaleString(),
        reportId: `VG-${Date.now()}`,
      });

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
    summary,
    threats,
    parsedLogs,
    reportInfo,
    loading,
    uploadLog,
    analysisSource,
}}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};