import { motion } from "framer-motion";

const severityConfig = {
  Critical: {
    color: "#EF4444",
    bg: "rgba(239,68,68,.12)",
  },
  High: {
    color: "#F97316",
    bg: "rgba(249,115,22,.12)",
  },
  Medium: {
    color: "#FACC15",
    bg: "rgba(250,204,21,.12)",
  },
  Low: {
    color: "#22C55E",
    bg: "rgba(34,197,94,.12)",
  },
};

export default function ThreatCard({
  threat,
  onView,
}) {
  const severity =
    severityConfig[threat.severity] ||
    severityConfig.Low;

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: .2,
      }}
      style={{
        background:
          "linear-gradient(180deg,#111827,#0F172A)",
        border: `1px solid ${severity.color}40`,
        borderRadius: 20,
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}

      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: severity.color,
          opacity: .08,
          filter: "blur(45px)",
        }}
      />

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: severity.bg,
                color: severity.color,
                padding: "6px 14px",
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {threat.severity}
            </span>

            <span
              style={{
                color: "#38BDF8",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              AI Confidence {threat.confidence}%
            </span>
          </div>

          <h2
            style={{
              color: "white",
              marginTop: 18,
              marginBottom: 12,
              fontSize: 28,
            }}
          >
            🚨 {threat.type}
          </h2>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: "28px",
              marginBottom: 24,
            }}
          >
            Vigilia AI detected suspicious behaviour that
            matches known attack patterns and recommends
            immediate investigation.
          </p>

          {/* Details */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(170px,1fr))",
              gap: 18,
            }}
          >
            <Info
              title="MITRE"
              value={
                threat.mitre?.techniqueId || "-"
              }
            />

            <Info
              title="Source IP"
              value={threat.ip || "Unknown"}
            />

            <Info
              title="Timestamp"
              value={threat.timestamp}
            />

            <Info
              title="Risk Score"
              value={`${threat.confidence}%`}
            />
          </div>
        </div>

        {/* Action */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 14,
          }}
        >
          <button
            onClick={onView}
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
              color: "white",
              border: "none",
              borderRadius: 14,
              padding: "14px 24px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Investigate →
          </button>

          <span
            style={{
              color: "#64748B",
              fontSize: 12,
            }}
          >
            AI Verified
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#0B1220",
        border: "1px solid #23324A",
        borderRadius: 14,
        padding: 14,
      }}
    >
      <div
        style={{
          color: "#64748B",
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "white",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}