import MetricCard from "./MetricCard";
import { useMonitoring } from "../../context/MonitoringContext";

export default function SystemMetrics() {
  const { summary, loading } = useMonitoring();

  const metrics = loading || !summary
    ? [
        { title: "Security Score", value: "--", color: "#38BDF8" },
        { title: "Risk Level", value: "--", color: "#F59E0B" },
        { title: "Total Threats", value: "--", color: "#EF4444" },
        { title: "Critical Threats", value: "--", color: "#DC2626" },
        { title: "Protected Endpoints", value: "--", color: "#22C55E" },
        { title: "AI Confidence", value: "--", color: "#8B5CF6" },
      ]
    : [
        {
          title: "Security Score",
          value: summary.securityScore,
          color: "#38BDF8",
        },
        {
          title: "Risk Level",
          value: summary.riskLevel,
          color: "#F59E0B",
        },
        {
          title: "Total Threats",
          value: summary.totalThreats,
          color: "#EF4444",
        },
        {
          title: "Critical Threats",
          value: summary.criticalThreats,
          color: "#DC2626",
        },
        {
          title: "Protected Endpoints",
          value: summary.totalEndpoints ?? "48",
          color: "#22C55E",
        },
        {
          title: "AI Confidence",
          value: `${summary.aiConfidence ?? 98}%`,
          color: "#8B5CF6",
        },
      ];

  return (
    <div
      style={{
        background: "#101A2C",
        border: "1px solid #23324A",
        borderRadius: 22,
        padding: 24,
        height: "100%",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: 22,
            }}
          >
            📊 System Metrics
          </h2>

          <div
            style={{
              marginTop: 4,
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            Live monitoring telemetry
          </div>
        </div>

        <div
          style={{
            background: "#16263F",
            color: "#38BDF8",
            padding: "6px 12px",
            borderRadius: 18,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          LIVE
        </div>
      </div>

      {/* Metrics Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 18,
        }}
      >
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            color={metric.color}
          />
        ))}
      </div>
    </div>
  );
}