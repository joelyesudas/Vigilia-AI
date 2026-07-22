import { useEffect } from "react";
import { motion } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { useMonitoring } from "../context/MonitoringContext";

import MonitoringHero from "../components/monitoring/MonitoringHero";
import LiveEventStream from "../components/monitoring/live/LiveEventStream";
import SystemChart from "../components/monitoring/live/SystemChart";
import EndpointHealth from "../components/monitoring/EndpointHealth";

const fadeUp = {
  initial: {
    opacity: 0,
    y: 18,
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

export default function Monitoring() {
  const { token } = useAuth();
  const { loadMonitoringData } = useMonitoring();

  useEffect(() => {
    if (token) {
      loadMonitoringData(token);
    }
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingBottom: 25,
      }}
    >
      {/* Hero */}

      <motion.div {...fadeUp}>
        <MonitoringHero />
      </motion.div>

      {/* Live Monitoring */}

      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <LiveEventStream />

        <SystemChart />
      </motion.div>

      {/* Endpoint Health */}

      <motion.div {...fadeUp}>
        <EndpointHealth />
      </motion.div>
    </div>
  );
}