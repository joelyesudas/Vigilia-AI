import { motion } from "framer-motion";
import { useMonitoring } from "../../context/MonitoringContext";

export default function ThreatSummary() {
  const { threats, summary } = useMonitoring();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid #24324D",
        borderRadius: 24,
        padding: 30,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 28,
        }}
      >
        <div>
          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: 30,
            }}
          >
            🚨 Executive Threat Summary
          </h2>

          <p
            style={{
              color: "#94A3B8",
              marginTop: 10,
              maxWidth: 650,
              lineHeight: "28px",
            }}
          >
            AI-generated overview of detected threats,
            current security posture, and recommended
            response priorities.
          </p>
        </div>

        <div
          style={{
            background: "rgba(37,99,235,.12)",
            border: "1px solid rgba(37,99,235,.25)",
            color: "#60A5FA",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          🤖 AI Generated
        </div>
      </div>

      {/* AI Summary */}

      <div
        style={{
          background: "rgba(37,99,235,.08)",
          border: "1px solid rgba(37,99,235,.18)",
          borderRadius: 18,
          padding: 22,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#60A5FA",
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          AI Executive Summary
        </div>

        <div
          style={{
            color: "#CBD5E1",
            lineHeight: "30px",
          }}
        >
          Vigilia AI analyzed{" "}
          <strong>{summary?.totalThreats ?? 0}</strong> detected
          threat(s). Current risk level is{" "}
          <strong>{summary?.riskLevel ?? "Unknown"}</strong>.
          Immediate attention is recommended for{" "}
          <strong>{summary?.criticalThreats ?? 0}</strong> critical
          incident(s). Review affected systems, validate MITRE
          ATT&CK mappings, and continue monitoring endpoint
          activity for further indicators of compromise.
        </div>
      </div>

      {/* Threat List */}

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {threats.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#94A3B8",
              padding: 40,
            }}
          >
            ✅ No threats available.
          </div>
        ) : (
          threats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{
                opacity: 0,
                x: -15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.01,
              }}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#0B1120",
                border: "1px solid #24324D",
                borderRadius: 16,
                padding: "18px 22px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 17,
                  }}
                >
                  {threat.type}
                </div>

                <div
                  style={{
                    color: "#64748B",
                    marginTop: 6,
                    fontSize: 14,
                  }}
                >
                  {threat.mitre?.techniqueId || "MITRE Unknown"} •{" "}
                  {threat.timestamp}
                </div>
              </div>

              <div
                style={{
                  background:
                    threat.severity === "Critical"
                      ? "#EF4444"
                      : threat.severity === "High"
                      ? "#F97316"
                      : "#EAB308",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                {threat.severity}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}