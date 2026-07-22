import { motion } from "framer-motion";

export default function AgentCard({
  title,
  status = "Online",
  os = "Unknown",
  version = "v1.0.0",
  color = "#22C55E",
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid #23324A",
        borderRadius: 18,
        padding: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {/* Left Section */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Status Indicator */}

        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 12px ${color}`,
            flexShrink: 0,
          }}
        />

        {/* Information */}

        <div>
          <div
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 6,
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            <span>{os}</span>

            <span>•</span>

            <span>{version}</span>

            <span>•</span>

            <span>Heartbeat: 5 sec ago</span>
          </div>
        </div>
      </div>

      {/* Right Section */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        <span
          style={{
            background: `${color}20`,
            color: color,
            padding: "6px 14px",
            borderRadius: 18,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          {status}
        </span>

        <span
          style={{
            color: "#64748B",
            fontSize: 12,
          }}
        >
          Health: 99%
        </span>
      </div>
    </motion.div>
  );
}