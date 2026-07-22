import { useDashboard } from "../../context/DashboardContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { exportExecutiveReport } from "../../utils/exportPDF";

export default function AICommandCenter() {
  const { summary, threats, reportInfo } = useDashboard();

  const navigate = useNavigate();

  const latestThreat =
    threats && threats.length
      ? threats[threats.length - 1]
      : {
          type: "No Active Threats",
          severity: "SAFE",
          recommendation: "System operating normally.",
        };

  const generateExecutiveReport = () => {
    if (!threats.length) {
      toast.warning(
        "Please analyze logs before generating the report."
      );
      return;
    }

    exportExecutiveReport({
      summary,
      threats,
      reportInfo,
    });

    toast.success("📄 Executive Report Generated!");
  };

  const openCopilot = () => {
    navigate("/copilot");
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 24,
        padding: 30,
        marginTop: 30,
        boxShadow: "0 0 25px rgba(0,0,0,.15)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <div>
          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 28,
            }}
          >
            🤖 AI Command Center
          </h2>

          <p
            style={{
              color: "#94A3B8",
              marginTop: 10,
            }}
          >
            AI-generated security assessment based on the latest monitoring
            results.
          </p>
        </div>

        <div
          style={{
            background: "#0B1220",
            border: "1px solid #24324D",
            borderRadius: 18,
            padding: "12px 18px",
            color: "#22C55E",
            fontWeight: 600,
          }}
        >
          ● AI ONLINE
        </div>
      </div>

      {/* Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 35,
        }}
      >
        <Metric title="AI Confidence" value="99.8%" color="#38BDF8" />
        <Metric title="Risk Level" value={summary.riskLevel} color="#EF4444" />
        <Metric title="Threats" value={summary.totalThreats} color="#F97316" />
        <Metric
          title="Security Score"
          value={`${summary.securityScore}%`}
          color="#22C55E"
        />
      </div>

      {/* Latest Alert */}
      <div
        style={{
          background: "#0B1220",
          borderRadius: 18,
          padding: 22,
          border: "1px solid #24324D",
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginTop: 0,
          }}
        >
          🚨 Latest AI Assessment
        </h3>

        <p style={{ color: "#CBD5E1" }}>
          <strong>Threat:</strong> {latestThreat.type}
        </p>

        <p style={{ color: "#CBD5E1" }}>
          <strong>Severity:</strong> {latestThreat.severity}
        </p>

        <p style={{ color: "#CBD5E1" }}>
          <strong>Recommendation:</strong>{" "}
          {latestThreat.recommendation}
        </p>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: 15,
          marginTop: 25,
        }}
      >
        <button
          onClick={generateExecutiveReport}
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          📄 Generate Executive Report
        </button>

        <button
          onClick={openCopilot}
          style={{
            background: "#111827",
            color: "#fff",
            border: "1px solid #24324D",
            padding: "14px 24px",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          🤖 Open AI Copilot
        </button>
      </div>
    </div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0B1220",
        border: "1px solid #24324D",
        borderRadius: 18,
        padding: 20,
      }}
    >
      <div
        style={{
          color,
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}