import { motion } from "framer-motion";

export default function ThreatCard({
  color,
  title,
  severity,
  time,
}) {
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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 18px",
        background: "#0F172A",
        border: `1px solid ${color}25`,
        borderRadius: 16,
        cursor: "pointer",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Status Dot */}
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
            flexShrink: 0,
          }}
        />

        {/* Content */}
        <div>
          <div
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: 16,
              marginBottom: 6,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: `${color}20`,
                color,
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {severity}
            </span>

            <span
              style={{
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          color: "#64748B",
          fontSize: 22,
          fontWeight: 300,
        }}
      >
        ›
      </div>
    </motion.div>
  );
}