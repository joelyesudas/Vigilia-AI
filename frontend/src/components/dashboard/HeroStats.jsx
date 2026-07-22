import { useDashboard } from "../../context/DashboardContext";
import StatCard from "../common/StatCard";

export default function HeroStats() {
  const { summary, analysisSource } = useDashboard();

  const hasAnalysis = analysisSource !== null;
  const isSystemScan = analysisSource === "scan";

  const getRiskColor = () => {
    switch ((summary.riskLevel || "").toUpperCase()) {
      case "SAFE":
        return "#22C55E";
      case "LOW":
        return "#84CC16";
      case "MEDIUM":
        return "#FACC15";
      case "HIGH":
        return "#F97316";
      case "CRITICAL":
        return "#EF4444";
      default:
        return "#94A3B8";
    }
  };

  const stats = [
    {
      title: "Security",
      value: hasAnalysis && summary.securityScore != null
        ? `${summary.securityScore}%`
        : "—",
      color: "#22C55E",
    },
    {
      title: "Threats",
      value: hasAnalysis ? summary.totalThreats : "0",
      color: "#EF4444",
    },
    {
      title: "Events",
      value: hasAnalysis
        ? summary.totalEvents ?? "—"
        : "—",
      color: "#3B82F6",
    },
    {
      title: "Risk",
      value: hasAnalysis
        ? summary.riskLevel
        : "—",
      color: hasAnalysis ? getRiskColor() : "#94A3B8",
    },

    // These only make sense after a SYSTEM SCAN
    {
      title: "CPU",
      value: isSystemScan
        ? `${summary.cpu ?? "—"}%`
        : "—",
      color: "#38BDF8",
    },
    {
      title: "RAM",
      value: isSystemScan
        ? `${summary.memory ?? "—"}%`
        : "—",
      color: "#A855F7",
    },
    {
      title: "Disk",
      value: isSystemScan
        ? `${summary.disk ?? "—"}%`
        : "—",
      color: "#F59E0B",
    },
    {
      title: "Network",
      value: isSystemScan
        ? summary.network || "Online"
        : "—",
      color: "#22C55E",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8,1fr)",
        gap: 12,
      }}
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          color={stat.color}
          compact
        />
      ))}
    </div>
  );
}