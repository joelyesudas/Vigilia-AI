import { motion } from "framer-motion";
import { useDashboard } from "../../../context/DashboardContext";

export default function IncidentTimeline() {
  const { parsedLogs } = useDashboard();

  const severityColor = (severity = "") => {
    switch (severity.toUpperCase()) {
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

  const critical = parsedLogs.filter(
    (l) => l.severity?.toUpperCase() === "CRITICAL"
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
        display: "flex",
        flexDirection: "column",
        height: "100%",
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
            🕒 Incident Timeline
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            Chronological view of detected security events.
          </p>
        </div>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: 30,
            background: "rgba(59,130,246,.12)",
            border: "1px solid rgba(59,130,246,.25)",
            color: "#60A5FA",
            fontWeight: 700,
          }}
        >
          {parsedLogs.length} Events
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
          value={parsedLogs.length}
          color="#3B82F6"
        />

        <Metric
          title="Critical"
          value={critical}
          color="#EF4444"
        />

        <Metric
          title="Status"
          value="LIVE"
          color="#22C55E"
        />
      </div>

      {/* Timeline */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          paddingRight: 4,
        }}
      >
        {parsedLogs.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#94A3B8",
            }}
          >
            No timeline events available.
          </div>
        ) : (
          parsedLogs.map((log, index) => (
            <motion.div
              key={index}
              whileHover={{
                x: 6,
              }}
              transition={{
                duration: .2,
              }}
              style={{
                display: "flex",
                gap: 18,
              }}
            >
              {/* Timeline */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 26,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: severityColor(log.severity),
                    boxShadow: `0 0 14px ${severityColor(
                      log.severity
                    )}`,
                  }}
                />

                {index !== parsedLogs.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      background: "#23324A",
                      marginTop: 8,
                    }}
                  />
                )}
              </div>

              {/* Event */}

              <div
                style={{
                  flex: 1,
                  background: "#0F172A",
                  border: "1px solid rgba(56,189,248,.10)",
                  borderRadius: 18,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      background:
                        severityColor(log.severity) + "20",
                      color: severityColor(log.severity),
                      padding: "6px 12px",
                      borderRadius: 18,
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {log.severity}
                  </span>

                  <span
                    style={{
                      color: "#94A3B8",
                      fontSize: 13,
                    }}
                  >
                    {log.timestamp?.split(" ")[1] || "--:--"}
                  </span>
                </div>

                <div
                  style={{
                    color: "#E2E8F0",
                    lineHeight: 1.8,
                    fontSize: 14,
                  }}
                >
                  {log.raw}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          justifyContent: "space-between",
          color: "#94A3B8",
          fontSize: 14,
        }}
      >
        <span>Real-time security monitoring</span>

        <span
          style={{
            color: "#22C55E",
            fontWeight: 700,
          }}
        >
          ● LIVE
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