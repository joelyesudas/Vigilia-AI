import ThreatDetails from "./ThreatDetails";
import RawLogCard from "./RawLogCard";
import MitreCard from "./MitreCard";
import RecommendationCard from "./RecommendationCard";
import ConfidenceGauge from "./ConfidenceGauge";
import AIAssessment from "./AIAssessment";
import AttackTimeline from "./AttackTimeline";
import IPIntelligence from "./IPIntelligence";

export default function ThreatModal({ threat, onClose }) {
  if (!threat) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#EF4444";
      case "High":
        return "#F97316";
      case "Medium":
        return "#EAB308";
      default:
        return "#22C55E";
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.65)",
          backdropFilter: "blur(4px)",
          zIndex: 998,
        }}
      />

      {/* Investigation Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "720px",
          maxWidth: "95vw",
          height: "100vh",
          background: "#081229",
          borderLeft: "1px solid #24324D",
          overflowY: "auto",
          padding: "35px",
          zIndex: 999,
          boxShadow: "-20px 0 60px rgba(0,0,0,.55)",
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
            <h1
              style={{
                color: "white",
                margin: 0,
                fontSize: 34,
              }}
            >
              🚨 {threat.type}
            </h1>

            <p
              style={{
                color: "#94A3B8",
                marginTop: 8,
              }}
            >
              Security Investigation Report
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              border: "none",
              background: "#1E293B",
              color: "white",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>

        {/* Severity Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: 14,
            background: getSeverityColor(threat.severity),
            color: "white",
            fontWeight: 700,
            marginBottom: 35,
          }}
        >
          {threat.severity.toUpperCase()}
        </div>

        {/* Confidence Gauge */}
        <div style={{ marginBottom: 35 }}>
          <ConfidenceGauge value={threat.confidence} />
        </div>

        {/* AI Security Analyst */}
        <div style={{ marginBottom: 35 }}>
          <AIAssessment threat={threat} />
        </div>

        {/* Threat Details */}
        <div style={{ marginBottom: 30 }}>
          <ThreatDetails threat={threat} />
        </div>

        {/* Attack Timeline */}
        <div style={{ marginBottom: 30 }}>
          <AttackTimeline threat={threat} />
        </div>

        {/* IP Intelligence */}
        <div style={{ marginBottom: 30 }}>
          <IPIntelligence threat={threat} />
        </div>

        {/* MITRE ATT&CK */}
        <div style={{ marginBottom: 30 }}>
          <MitreCard threat={threat} />
        </div>

        {/* Recommended Actions */}
        <div style={{ marginBottom: 30 }}>
          <RecommendationCard threat={threat} />
        </div>

        {/* Raw Log */}
        <div style={{ marginBottom: 30 }}>
          <RawLogCard threat={threat} />
        </div>
      </div>
    </>
  );
}