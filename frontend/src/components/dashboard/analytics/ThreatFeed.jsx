import { motion } from "framer-motion";
import ThreatCard from "./ThreatCard";
import { useDashboard } from "../../../context/DashboardContext";

export default function ThreatFeed() {
  const { threats } = useDashboard();

  const getSeverityColor = (severity) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "#EF4444";
      case "HIGH":
        return "#F97316";
      case "MEDIUM":
        return "#FACC15";
      case "LOW":
        return "#22C55E";
      default:
        return "#3B82F6";
    }
  };

  const critical =
    threats.filter(
      (t) => t.severity?.toUpperCase() === "CRITICAL"
    ).length;

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: .25,
      }}
      style={{
        background:
          "linear-gradient(180deg,#111827,#0B1220)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 24,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow:
          "0 15px 35px rgba(0,0,0,.25)",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
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
            🚨 Live Threat Feed
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            AI-detected security events from monitored systems.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 18px",
            borderRadius: 30,
            background:
              "rgba(34,197,94,.12)",
            border:
              "1px solid rgba(34,197,94,.25)",
            color: "#22C55E",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow:
                "0 0 12px #22C55E",
            }}
          />

          LIVE
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Metric
          title="Active"
          value={threats.length}
          color="#3B82F6"
        />

        <Metric
          title="Critical"
          value={critical}
          color="#EF4444"
        />

        <Metric
          title="AI Confidence"
          value="99.8%"
          color="#22C55E"
        />
      </div>

      {/* ================= THREAT LIST ================= */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          paddingRight: 4,
        }}
      >
        {threats.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94A3B8",
              textAlign: "center",
            }}
          >
            ✅ No active threats detected.
          </div>
        ) : (
          threats.map((threat, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 5,
              }}
            >
              <ThreatCard
                title={threat.type}
                severity={threat.severity}
                color={getSeverityColor(
                  threat.severity
                )}
                time={threat.timestamp}
              />
            </motion.div>
          ))
        )}
      </div>

      {/* ================= FOOTER ================= */}

      <div
        style={{
          marginTop: 24,
          borderTop:
            "1px solid rgba(255,255,255,.06)",
          paddingTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#94A3B8",
          }}
        >
          Updated every 30 seconds
        </div>

        <div
          style={{
            color: "#60A5FA",
            fontWeight: 700,
          }}
        >
          {threats.length} Events
        </div>
      </div>
    </motion.div>
  );
}

function Metric({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#0F172A",
        border:
          "1px solid rgba(56,189,248,.10)",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          color,
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}