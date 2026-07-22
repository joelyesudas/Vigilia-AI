import { motion } from "framer-motion";
import { useMonitoring } from "../../context/MonitoringContext";

export default function ReportStats() {
  const { summary } = useMonitoring();

  const cards = [
    {
      title: "Security Score",
      value: summary?.securityScore ?? "--",
      color: "#3B82F6",
      subtitle: "Overall Protection",
      progress: `${summary?.securityScore ?? 0}%`,
    },
    {
      title: "Threats Detected",
      value: summary?.totalThreats ?? 0,
      color: "#EF4444",
      subtitle: "Today's Activity",
      progress: "70%",
    },
    {
      title: "Critical Threats",
      value: summary?.criticalThreats ?? 0,
      color: "#F97316",
      subtitle: "Immediate Action",
      progress: "45%",
    },
    {
      title: "Risk Level",
      value: summary?.riskLevel ?? "--",
      color: "#22C55E",
      subtitle: "Current Assessment",
      progress:
        summary?.riskLevel === "High"
          ? "90%"
          : summary?.riskLevel === "Medium"
          ? "60%"
          : "30%",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
        gap: 22,
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
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
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(180deg,#111827,#0F172A)",
            border: `1px solid ${card.color}35`,
            borderRadius: 22,
            padding: 24,
            boxShadow: `0 12px 30px ${card.color}15`,
          }}
        >
          {/* Glow */}

          <div
            style={{
              position: "absolute",
              top: -35,
              right: -35,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: card.color,
              opacity: 0.08,
              filter: "blur(45px)",
            }}
          />

          {/* Left Accent */}

          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 5,
              background: card.color,
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
              {card.title}
            </div>

            <div
              style={{
                color: card.color,
                fontSize: 42,
                fontWeight: 800,
                marginTop: 12,
              }}
            >
              {card.value}
            </div>

            <div
              style={{
                color: "#64748B",
                marginTop: 6,
                fontSize: 13,
              }}
            >
              {card.subtitle}
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
                  width: card.progress,
                }}
                transition={{
                  duration: 1,
                }}
                style={{
                  height: "100%",
                  background: card.color,
                  borderRadius: 999,
                }}
              />
            </div>

            <div
              style={{
                marginTop: 10,
                color: card.color,
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {card.progress}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}