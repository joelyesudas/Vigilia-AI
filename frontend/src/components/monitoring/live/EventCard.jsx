import { motion } from "framer-motion";

export default function EventCard({ log }) {
  const severity = (log.severity || "INFO").toUpperCase();

  const severityMap = {
    INFO: {
      color: "#22C55E",
      bg: "rgba(34,197,94,.15)",
    },
    WARNING: {
      color: "#FACC15",
      bg: "rgba(250,204,21,.15)",
    },
    ERROR: {
      color: "#EF4444",
      bg: "rgba(239,68,68,.15)",
    },
    CRITICAL: {
      color: "#DC2626",
      bg: "rgba(220,38,38,.18)",
    },
    UNKNOWN: {
      color: "#94A3B8",
      bg: "rgba(148,163,184,.15)",
    },
  };

  const config =
    severityMap[severity] || {
      color: "#3B82F6",
      bg: "rgba(59,130,246,.15)",
    };

  return (
    <motion.div
      whileHover={{
        y: -2,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background: "#0F172A",
        border: "1px solid #23324A",
        borderRadius: 16,
        padding: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 18,
      }}
    >
      {/* Left */}

      <div
        style={{
          display: "flex",
          gap: 16,
          flex: 1,
        }}
      >
        {/* Status */}

        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: config.color,
            boxShadow: `0 0 12px ${config.color}`,
            marginTop: 6,
            flexShrink: 0,
          }}
        />

        {/* Content */}

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                background: config.bg,
                color: config.color,
                padding: "4px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {severity}
            </span>

            <span
              style={{
                color: "#64748B",
                fontSize: 12,
              }}
            >
              Endpoint Event
            </span>
          </div>

          <div
            style={{
              color: "#E2E8F0",
              lineHeight: "24px",
              fontSize: 14,
            }}
          >
            {log.raw}
          </div>
        </div>
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
          minWidth: 90,
        }}
      >
        <div
          style={{
            color: "#38BDF8",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {log.timestamp?.split(" ")[1] || "--:--"}
        </div>

        <div
          style={{
            color: "#64748B",
            fontSize: 12,
          }}
        >
          Live
        </div>
      </div>
    </motion.div>
  );
}