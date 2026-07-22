import { motion } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import BackgroundParticles from "../common/BackgroundParticles";
import { useDashboard } from "../../context/DashboardContext";

export default function Hero() {
  const { summary, analysisSource } = useDashboard();

  const badges = analysisSource
    ? [
        analysisSource === "scan" ? "🖥 System Scan" : "📄 Log Analysis",
        `${summary.totalThreats || 0} Threat${
          summary.totalThreats === 1 ? "" : "s"
        }`,
        summary.riskLevel || "Unknown Risk",
        "🤖 AI Monitoring",
      ]
    : [
        "⚪ No Analysis",
        "0 Threats",
        "Awaiting Scan",
        "🤖 AI Monitoring",
      ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        minHeight: 300,
        background:
          "linear-gradient(135deg,#020617 0%,#081229 45%,#0F172A 100%)",
        border: "1px solid rgba(56,189,248,.10)",
        boxShadow: "0 15px 45px rgba(0,0,0,.35)",
      }}
    >
      {/* Background Particles */}
      <BackgroundParticles />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 30%, rgba(37,99,235,.15), transparent 45%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          alignItems: "center",
          gap: 50,
          minHeight: 420,
          padding: "45px 50px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Left */}
        <HeroContent />

        {/* Right */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 22,
            height: "100%",
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HeroBackground />
          </motion.div>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {badges.map((item) => (
              <div
                key={item}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(59,130,246,.08)",
                  border: "1px solid rgba(59,130,246,.22)",
                  color: "#93C5FD",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -140,
            top: -140,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(59,130,246,.14)",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.section>
  );
}