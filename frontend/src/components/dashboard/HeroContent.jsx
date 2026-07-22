import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function HeroContent() {
  const { user } = useAuth();
  const { summary, analysisSource, reportInfo } = useDashboard();

const hasAnalysis = analysisSource !== null;

const threatColor = () => {
  switch ((summary.riskLevel || "").toUpperCase()) {
    case "LOW":
      return "#22C55E";
    case "MEDIUM":
      return "#F59E0B";
    case "HIGH":
      return "#EF4444";
    case "CRITICAL":
      return "#DC2626";
    default:
      return "#94A3B8";
  }
};

const lastAnalysis =
  hasAnalysis && reportInfo.generatedAt
    ? reportInfo.generatedAt
    : "Never";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{
        maxWidth: 650,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Online Badge */}

      <motion.div
        variants={item}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 18px",
          borderRadius: 30,
          background: "rgba(59,130,246,.10)",
          border: "1px solid rgba(59,130,246,.25)",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 12px #22C55E",
          }}
        />

        <span
          style={{
            color: "#FFFFFF",
            fontWeight: 700,
          }}
        >
          Welcome back, {user?.name || "SOC Analyst"}
        </span>
      </motion.div>

      {/* Main Title */}

      <motion.h1
        variants={item}
        style={{
          marginTop: 24,
          marginBottom: 0,
          fontSize: 64,
          fontWeight: 900,
          lineHeight: 1,
          color: "#FFFFFF",
          letterSpacing: -2,
        }}
      >
        Vigilia AI
      </motion.h1>

      <motion.h2
        variants={item}
        style={{
          marginTop: 12,
          marginBottom: 0,
          fontSize: 34,
          fontWeight: 700,
          color: "#60A5FA",
        }}
      >
        Enterprise Cyber Defense Platform
      </motion.h2>

      {/* Description */}

      <motion.p
        variants={item}
        style={{
          marginTop: 22,
          fontSize: 18,
          color: "#CBD5E1",
          lineHeight: 1.8,
          maxWidth: 620,
        }}
      >
        Detect sophisticated cyber threats, monitor enterprise
        infrastructure, correlate security events, map attacks to
        MITRE ATT&CK, and automate investigations using
        AI-powered cyber intelligence.
      </motion.p>

      {/* Feature Chips */}

      <motion.div
        variants={item}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 28,
        }}
      >
        {[
          "🤖 AI Detection",
          "🛡 MITRE ATT&CK",
          "⚡ Live Monitoring",
          "🌍 Global Intelligence",
          "🔐 Zero Trust",
        ].map((chip) => (
          <div
            key={chip}
            style={{
              padding: "10px 18px",
              borderRadius: 25,
              background: "#16263F",
              border: "1px solid rgba(59,130,246,.15)",
              color: "#E2E8F0",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {chip}
          </div>
        ))}
      </motion.div>

      {/* Live Status */}

      <motion.div
  variants={item}
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 16,
    marginTop: 30,
  }}
>
  <StatusCard
    title="AI Engine"
    value={hasAnalysis ? "ONLINE" : "IDLE"}
    color={hasAnalysis ? "#22C55E" : "#94A3B8"}
  />

  <StatusCard
    title="Threat Level"
    value={hasAnalysis ? summary.riskLevel : "—"}
    color={hasAnalysis ? threatColor() : "#94A3B8"}
  />

  <StatusCard
    title={
      analysisSource === "upload"
        ? "Last Log Analysis"
        : "Last Scan"
    }
    value={lastAnalysis}
    color="#3B82F6"
  />
</motion.div>

      {/* Buttons */}

      <motion.div
        variants={item}
        style={{
          marginTop: 30,
        }}
      >
        <HeroButtons />
      </motion.div>

      {/* Hero Stats */}

      <motion.div
        variants={item}
        style={{
          marginTop: 34,
        }}
      >
        <HeroStats />
      </motion.div>
    </motion.div>
  );
}

function StatusCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,.88)",
        border: "1px solid rgba(59,130,246,.12)",
        borderRadius: 18,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}