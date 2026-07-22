import { motion } from "framer-motion";
import { showInfo, showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";


export default function IncidentCard({
  incident,
  updateIncident,
}) {
  const navigate = useNavigate();
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "#EF4444";
      case "Contained":
        return "#F59E0B";
      case "Resolved":
        return "#22C55E";
      default:
        return "#64748B";
    }
  };

  const severityColor = getSeverityColor(
    incident.severity
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: .25,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg,#111827,#0F172A)",
        border: `1px solid ${severityColor}35`,
        boxShadow: `0 12px 30px ${severityColor}18`,
        borderRadius: 22,
        padding: 26,
      }}
    >

      {/* Severity Strip */}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: severityColor,
        }}
      />

      {/* Glow */}

      <div
        style={{
          position: "absolute",
          right: -40,
          top: -40,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: severityColor,
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
          gap: 25,
          flexWrap: "wrap",
        }}
      >

        <div style={{ flex: 1 }}>

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >

            <span
              style={{
                background: severityColor,
                color: "white",
                padding: "7px 15px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {incident.severity}
            </span>

            <span
              style={{
                background:
                  "rgba(37,99,235,.12)",
                color: "#60A5FA",
                padding: "7px 15px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              🤖 AI {incident.confidence}%
            </span>

            <span
              style={{
                background:
                  "rgba(168,85,247,.12)",
                color: "#C084FC",
                padding: "7px 15px",
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {incident.mitre?.techniqueId || "MITRE"}
            </span>

          </div>

          <h2
            style={{
              color: "white",
              fontSize: 30,
              marginTop: 20,
              marginBottom: 12,
            }}
          >
            🚨 {incident.title}
          </h2>

          <p
            style={{
              color: "#94A3B8",
              lineHeight: "30px",
              fontSize: 16,
            }}
          >
            {incident.description}
          </p>

        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 12,
          }}
        >

          <div
            style={{
              background:
                getStatusColor(
                  incident.status
                ),
              color: "white",
              padding: "8px 18px",
              borderRadius: 999,
              fontWeight: 700,
            }}
          >
            {incident.status}
          </div>

          <div
            style={{
              color: "#64748B",
              fontSize: 13,
            }}
          >
            ✔ AI Verified
          </div>

        </div>

      </div>

      {/* Info Grid */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(170px,1fr))",
          gap: 18,
          marginTop: 26,
        }}
      >

        <Info
          title="Assigned"
          value={incident.assigned}
        />

        <Info
          title="Source IP"
          value={incident.source}
        />

        <Info
          title="Timestamp"
          value={incident.time}
        />

        <Info
          title="Status"
          value={incident.status}
          color={getStatusColor(
            incident.status
          )}
        />

      </div>

      {/* AI Recommendation */}

      <div
        style={{
          marginTop: 24,
          background:
            "rgba(37,99,235,.08)",
          border:
            "1px solid rgba(37,99,235,.18)",
          borderRadius: 16,
          padding: 18,
        }}
      >

        <div
          style={{
            color: "#60A5FA",
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          🤖 AI Recommendation
        </div>

        <div
          style={{
            color: "#CBD5E1",
            lineHeight: "28px",
          }}
        >
          {incident.recommendation ||
            "Immediately isolate the affected endpoint, review authentication logs, validate network activity, and continue forensic investigation before recovery."}
        </div>

      </div>
            {/* Action Buttons */}

<div
  style={{
    display: "flex",
    gap: 16,
    marginTop: 28,
    flexWrap: "wrap",
  }}
>
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => {
      updateIncident(incident.id, {
        status: "Contained",
      });
      showInfo("🛡 Incident has been contained.");
    }}
    style={button("#F59E0B")}
  >
    🛡 Contain
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => {
      updateIncident(incident.id, {
        status: "Resolved",
      });
      showSuccess("✅ Incident resolved successfully.");
    }}
    style={button("#22C55E")}
  >
    ✅ Resolve
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => {
      updateIncident(incident.id, {
        assigned: "Level 2 SOC",
      });
      showInfo("⬆ Incident escalated to Level 2 SOC.");
    }}
    style={button("#2563EB")}
  >
    ⬆ Escalate
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.97 }}
    onClick={() => {
  showInfo("Opening Threat Investigation...");
  navigate("/threat-investigation");
}}
    style={button("#7C3AED")}
  >
    🔍 Investigate
  </motion.button>
</div>

</motion.div>
);
}
function Info({
  title,
  value,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      style={{
        background:
          "linear-gradient(180deg,#0B1120,#0F172A)",
        border: "1px solid #24324D",
        borderRadius: 14,
        padding: 16,
        transition: ".25s",
      }}
    >
      <div
        style={{
          color: "#64748B",
          fontSize: 12,
          marginBottom: 8,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: color || "white",
          fontWeight: 700,
          fontSize: 15,
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </div>
    </motion.div>
  );
}

function button(color) {
  return {
    background: `linear-gradient(135deg, ${color}, ${color})`,
    color: "white",
    border: "none",
    padding: "13px 22px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14,
    boxShadow: `0 10px 25px ${color}55`,
    transition: ".25s",
  };
}