import { motion } from "framer-motion";
import { useDashboard } from "../../context/DashboardContext";
const getRiskColor = (risk) => {
  switch ((risk || "").toUpperCase()) {
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
      return "#3B82F6";
  }
};

export default function ExecutiveSummary() {
  const { summary } = useDashboard();

  const blockedThreats = Math.max(
    0,
    summary.totalEvents - summary.totalThreats
  );

  const cards = [
    {
      title: "Threats Detected",
      value: summary.totalThreats,
      color: "#EF4444",
      icon: "🚨",
      subtitle: `${summary.totalThreats} Active Threats`,
    },
    {
      title: "Risk Level",
      value: summary.riskLevel,
      color: getRiskColor(summary.riskLevel),
      icon: "⚠️",
      subtitle: "AI Risk Assessment",
    },
    {
      title: "Events Processed",
      value: summary.totalEvents,
      color: summary.totalThreats > 0 ? "#F97316" : "#22C55E",
      icon: "📡",
      subtitle: "Logs Analysed",
    },
    {
      title: "Security Score",
      value: `${summary.securityScore}%`,
      color: "#38BDF8",
      icon: "🛡️",
      subtitle: "Overall Protection",
    },
  ];
  return (
    <div
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 24,
        padding: 28,
        boxShadow: "0 15px 40px rgba(0,0,0,.25)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 26,
            }}
          >
            📈 Executive Security Overview
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            Real-time security posture generated from the latest analysis.
          </p>
        </div>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: 30,
            background:
  summary.totalThreats > 0
    ? "rgba(249,115,22,.12)"
    : "rgba(34,197,94,.12)",
            border:
  summary.totalThreats > 0
    ? "1px solid rgba(249,115,22,.25)"
    : "1px solid rgba(34,197,94,.25)",
            color: "#22C55E",
            fontWeight: 700,
          }}
        >
          ● LIVE
        </div>
      </div>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 18,
        }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            transition={{
              duration: .2,
            }}
            style={{
              background: "#0B1220",
              border: "1px solid rgba(56,189,248,.12)",
              borderRadius: 20,
              padding: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                }}
              >
                {card.title}
              </span>

              <span
                style={{
                  fontSize: 22,
                }}
              >
                {card.icon}
              </span>
            </div>

            <div
              style={{
                marginTop: 18,
                fontSize: 40,
                fontWeight: 800,
                color: card.color,
              }}
            >
              {card.value}
            </div>

            <div
              style={{
                marginTop: 12,
                color: "#CBD5E1",
                fontSize: 14,
              }}
            >
              {card.subtitle}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Summary */}

      <div
        style={{
          marginTop: 28,
          padding: 20,
          borderRadius: 18,
          background: "rgba(37,99,235,.08)",
          border: "1px solid rgba(37,99,235,.15)",
          color: "#CBD5E1",
          lineHeight: 1.8,
        }}
      >
        <strong style={{ color: "#60A5FA" }}>
          AI Executive Assessment
        </strong>

        <p
  style={{
    marginTop: 12,
    marginBottom: 0,
  }}
>
  Vigilia AI analyzed{" "}
  <strong>{summary.totalEvents} security events</strong> during the latest
  scan and identified{" "}
  <strong>{summary.totalThreats} potential threat(s)</strong>.

  {" "}

  The current overall security score is{" "}
  <strong>{summary.securityScore}%</strong>, resulting in a{" "}
  <strong
    style={{
      color: getRiskColor(summary.riskLevel),
    }}
  >
    {summary.riskLevel}
  </strong>{" "}
  risk assessment.

  {" "}

  {summary.totalThreats === 0
    ? "No active threats were detected. The monitored endpoint is currently operating within a healthy security posture."
    : summary.totalThreats <= 2
    ? "A small number of threats require investigation. Continue monitoring and review the generated recommendations."
    : summary.totalThreats <= 5
    ? "Multiple threats have been detected. Immediate investigation is recommended to prevent escalation."
    : "A significant number of threats have been detected. Immediate remediation and continuous monitoring are strongly recommended."}
</p>
      </div>
    </div>
  );
}