import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "../../context/DashboardContext";

export default function RecentActivity() {
  const { threats } = useDashboard();

  const [visibleThreats, setVisibleThreats] = useState([]);

  useEffect(() => {
    setVisibleThreats([]);

    if (!threats.length) return;

    threats.forEach((threat, index) => {
      setTimeout(() => {
        setVisibleThreats((prev) => [...prev, threat]);
      }, index * 500);
    });
  }, [threats]);

  const getIcon = (type = "") => {
    const text = type.toLowerCase();

    if (text.includes("ransom")) return "🚨";
    if (text.includes("brute")) return "🔐";
    if (text.includes("malware")) return "🦠";
    if (text.includes("network")) return "🌐";
    if (text.includes("unauthorized")) return "⚠️";
    if (text.includes("critical")) return "🔥";

    return "🛡️";
  };

  const getSeverityColor = (severity = "") => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "#EF4444";
      case "high":
        return "#F97316";
      case "medium":
        return "#FACC15";
      default:
        return "#22C55E";
    }
  };

  const critical = threats.filter(
    (t) => t.severity?.toLowerCase() === "critical"
  ).length;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "linear-gradient(180deg,#111827,#0B1220)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 24,
        padding: 28,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 15px 35px rgba(0,0,0,.25)",
      }}
    >
      {/* Header */}

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
            ⚡ Live Activity
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            Recent security activity detected by Vigilia AI.
          </p>
        </div>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: 30,
            background: "rgba(34,197,94,.12)",
            border: "1px solid rgba(34,197,94,.25)",
            color: "#22C55E",
            fontWeight: 700,
          }}
        >
          ● LIVE
        </div>
      </div>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Metric
          title="Events"
          value={threats.length}
          color="#3B82F6"
        />

        <Metric
          title="Critical"
          value={critical}
          color="#EF4444"
        />

        <Metric
          title="Monitoring"
          value="ON"
          color="#22C55E"
        />
      </div>

      {/* Feed */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingRight: 4,
        }}
      >
        {!visibleThreats.length ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94A3B8",
            }}
          >
            Waiting for security events...
          </div>
        ) : (
          visibleThreats
            .slice()
            .reverse()
            .map((threat, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: -25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                whileHover={{
                  x: 6,
                }}
                style={{
                  background: "#0F172A",
                  border: "1px solid rgba(56,189,248,.10)",
                  borderRadius: 18,
                  padding: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#E2E8F0",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {getIcon(threat.type)} {threat.type}
                  </div>

                  <div
                    style={{
                      color: "#94A3B8",
                      marginTop: 6,
                      fontSize: 13,
                    }}
                  >
                    {new Date().toLocaleTimeString()} •{" "}
                    {threat.ip || "Unknown IP"}
                  </div>
                </div>

                <span
                  style={{
                    background:
                      getSeverityColor(threat.severity) + "20",
                    color: getSeverityColor(threat.severity),
                    padding: "7px 14px",
                    borderRadius: 18,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {threat.severity}
                </span>
              </motion.div>
            ))
        )}
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          justifyContent: "space-between",
          color: "#94A3B8",
          fontSize: 14,
        }}
      >
        <span>Updated in real time</span>

        <span
          style={{
            color: "#60A5FA",
            fontWeight: 700,
          }}
        >
          {visibleThreats.length} Displayed
        </span>
      </div>
    </motion.div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0F172A",
        border: "1px solid rgba(56,189,248,.10)",
        borderRadius: 16,
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
          fontWeight: 800,
          fontSize: 28,
        }}
      >
        {value}
      </div>
    </div>
  );
}