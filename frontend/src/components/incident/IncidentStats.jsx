import { motion } from "framer-motion";

const stats = [
  {
    title: "Open Incidents",
    value: 5,
    color: "#EF4444",
    progress: "72%",
    subtitle: "Require Action",
  },
  {
    title: "Contained",
    value: 2,
    color: "#F59E0B",
    progress: "40%",
    subtitle: "Isolation Complete",
  },
  {
    title: "Resolved",
    value: 8,
    color: "#22C55E",
    progress: "100%",
    subtitle: "Closed Successfully",
  },
  {
    title: "Critical",
    value: 3,
    color: "#3B82F6",
    progress: "60%",
    subtitle: "High Priority",
  },
];

export default function IncidentStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: 22,
        marginBottom: 35,
      }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.08,
          }}
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          style={{
            background:
              "linear-gradient(180deg,#111827,#0F172A)",
            border: `1px solid ${stat.color}35`,
            borderRadius: 22,
            padding: 24,
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 12px 30px ${stat.color}15`,
          }}
        >
          {/* Glow */}

          <div
            style={{
              position: "absolute",
              right: -35,
              top: -35,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: stat.color,
              opacity: .08,
              filter: "blur(45px)",
            }}
          />

          {/* Left Color Strip */}

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 5,
              background: stat.color,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                color: "#94A3B8",
                fontSize: 14,
              }}
            >
              {stat.title}
            </div>

            <div
              style={{
                color: stat.color,
                fontSize: 42,
                fontWeight: 800,
                marginTop: 12,
              }}
            >
              {stat.value}
            </div>

            <div
              style={{
                color: "#64748B",
                marginTop: 6,
                fontSize: 13,
              }}
            >
              {stat.subtitle}
            </div>

            <div
              style={{
                marginTop: 20,
                height: 7,
                borderRadius: 999,
                background: "#1E293B",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: stat.progress,
                }}
                transition={{
                  duration: 1,
                }}
                style={{
                  height: "100%",
                  background: stat.color,
                  borderRadius: 999,
                }}
              />
            </div>

            <div
              style={{
                marginTop: 10,
                color: stat.color,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {stat.progress} Complete
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}