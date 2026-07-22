import { motion } from "framer-motion";

export default function MetricCard({
  title,
  value,
  color = "#38BDF8",
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid #23324A",
        borderRadius: 18,
        padding: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}

      <div
        style={{
          position: "absolute",
          top: -35,
          right: -35,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: color,
          opacity: 0.12,
          filter: "blur(40px)",
        }}
      />

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "#94A3B8",
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 10px ${color}`,
          }}
        />
      </div>

      {/* Value */}

      <div
        style={{
          marginTop: 16,
          fontSize: 34,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>

      {/* Progress */}

      <div
        style={{
          marginTop: 18,
        }}
      >
        <div
          style={{
            height: 6,
            borderRadius: 20,
            background: "#1E293B",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "82%",
              height: "100%",
              background: color,
              borderRadius: 20,
            }}
          />
        </div>
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
        }}
      >
        <span
          style={{
            color: "#64748B",
          }}
        >
          Updated now
        </span>

        <span
          style={{
            color,
            fontWeight: 700,
          }}
        >
          ▲ Stable
        </span>
      </div>
    </motion.div>
  );
}