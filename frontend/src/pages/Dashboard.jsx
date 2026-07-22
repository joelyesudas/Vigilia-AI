import { motion } from "framer-motion";

import Hero from "../components/dashboard/Hero";
import EndpointStatusCard from "../components/dashboard/endpoint/EndpointStatusCard";
import { useDashboard } from "../context/DashboardContext";
import ThreatFeed from "../components/dashboard/analytics/ThreatFeed";
import ThreatChart from "../components/dashboard/analytics/ThreatChart";
import MitrePanel from "../components/dashboard/analytics/MitrePanel";
import IncidentTimeline from "../components/dashboard/analytics/IncidentTimeline";

import ExecutiveSummary from "../components/analytics/ExecutiveSummary";
import ThreatTrendChart from "../components/analytics/ThreatTrendChart";
import SeverityPieChart from "../components/analytics/SeverityPieChart";
import RecentActivity from "../components/analytics/RecentActivity";
import AICommandCenter from "../components/analytics/AICommandCenter";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
  },
  transition: {
    duration: 0.45,
  },
};

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      style={{
        background: "#101826",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 20,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 120,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 14,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { summary, analysisSource } = useDashboard();

const hasData = analysisSource !== null;
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingBottom: 30,
      }}
    >
      {/* =========================================
   ENTERPRISE HERO
========================================= */}

<motion.section
  {...fadeUp}
  style={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  }}
>

  {/* Main Hero */}

  <div
    style={{
      background:
        "linear-gradient(135deg,#0c1729 0%,#101f38 50%,#132746 100%)",
      border: "1px solid rgba(80,150,255,.18)",
      borderRadius: 28,
      padding: 30,
      overflow: "hidden",
      position: "relative",
      boxShadow:
        "0 20px 60px rgba(0,0,0,.35)",
    }}
  >
    <Hero />
  </div>

  {/* KPI + Endpoint */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(5,1fr)",
      gap: 18,
    }}
  >

    <StatCard
  title="Security Score"
  value={
    hasData
      ? `${summary.securityScore}%`
      : "—"
  }
  color="#36d399"
/>

<StatCard
  title="Threats"
  value={
    hasData
      ? summary.totalThreats
      : "0"
  }
  color="#ff6b6b"
/>

<StatCard
  title="Events"
  value={
    hasData
      ? summary.totalEvents ?? "—"
      : "—"
  }
  color="#60a5fa"
/>

<StatCard
  title="Analysis Source"
  value={
    analysisSource === "scan"
      ? "System"
      : analysisSource === "upload"
      ? "Log"
      : "—"
  }
  color="#a78bfa"
/>

    <EndpointStatusCard />

  </div>

</motion.section>

      {/* AI + Executive */}

      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <AICommandCenter />
        <ExecutiveSummary />
      </motion.div>

      {/* Threat Analytics */}

      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <ThreatTrendChart />
        <SeverityPieChart />
      </motion.div>

      {/* Threat Feed */}

      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <ThreatFeed />
        <ThreatChart />
      </motion.div>

      {/* MITRE + Timeline */}

      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <MitrePanel />
        <IncidentTimeline />
      </motion.div>

      {/* Recent Activity */}

      <motion.div {...fadeUp}>
        <RecentActivity />
      </motion.div>
    </motion.div>
  );
}