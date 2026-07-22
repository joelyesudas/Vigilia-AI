import { motion } from "framer-motion";
import { useMonitoring } from "../../context/MonitoringContext";
import { useAuth } from "../../context/AuthContext";

import AgentStatus from "./AgentStatus";
import SystemMetrics from "./SystemMetrics";

export default function MonitoringHero() {
   const { token } = useAuth();

  const {
    runScan,
    loading,
    summary,
    endpoints,
  } = useMonitoring();

  const overviewCards = [
    {
      title: "Endpoints",
      value: endpoints?.length ?? "—",
      color: "#38BDF8",
    },
    {
      title: "Agents",
      value: endpoints?.filter(e => e.status === "online").length ?? "—",
      color: "#22C55E",
    },
    {
      title: "Threats",
      value: summary?.totalThreats ?? 0,
      color: "#EF4444",
    },
    {
      title: "Events",
      value: summary?.totalEvents ?? "—",
      color: "#F59E0B",
    },
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
        duration: 0.5,
      }}
      style={{
        background:
          "linear-gradient(135deg,#020617 0%,#071528 45%,#0F172A 100%)",
        border: "1px solid #1E3A5F",
        borderRadius: 28,
        padding: 40,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#2563EB25 0%,transparent 70%)",
          top: -140,
          right: -120,
          filter: "blur(70px)",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 420px",
          gap: 35,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT */}

        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#182B46",
              padding: "8px 16px",
              borderRadius: 30,
              color: "#38BDF8",
              fontWeight: 600,
              marginBottom: 22,
            }}
          >
            📡 LIVE MONITORING
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 48,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Enterprise Monitoring Center
          </h1>

          <p
            style={{
              marginTop: 18,
              color: "#94A3B8",
              fontSize: 17,
              lineHeight: "30px",
              maxWidth: 720,
            }}
          >
            Monitor every endpoint, detect suspicious behaviour,
            analyse security telemetry, and respond instantly using
            Vigilia AI's real-time cyber monitoring engine.
          </p>

          {/* Action Buttons */}

          <div
            style={{
              display: "flex",
              gap: 18,
              marginTop: 35,
              flexWrap: "wrap",
            }}
          >
            <button
    onClick={() => runScan(token)}
    disabled={loading}
    style={{
        background:
            "linear-gradient(90deg,#2563EB,#3B82F6)",
        color: "white",
        border: "none",
        padding: "15px 34px",
        borderRadius: 14,
        fontWeight: 700,
        fontSize: 15,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
    }}
>
    {loading ? "Scanning..." : "⚡ Run Full Scan"}
</button>

            <button
              style={{
                background: "#172338",
                color: "white",
                border: "1px solid #284364",
                padding: "15px 34px",
                borderRadius: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              📥 Export Monitoring Report
            </button>
          </div>

          {/* Status Pills */}

          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              "🟢 AI Online",
              "🛰 Agents Active",
              "🛡 Zero Trust",
              "⚡ Live Detection",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "#18263F",
                  color: "#E2E8F0",
                  padding: "10px 18px",
                  borderRadius: 30,
                  border: "1px solid #284364",
                  fontSize: 14,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <div
          style={{
            background: "#121D31",
            border: "1px solid #23324A",
            borderRadius: 24,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
              fontSize: 28,
            }}
          >
            🌐 Monitoring Overview
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            {overviewCards.map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#1A2A44",
                  borderRadius: 18,
                  padding: 18,
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
                    marginTop: 10,
                    color: card.color,
                    fontSize: 34,
                    fontWeight: 700,
                  }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Widgets */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 30,
          marginTop: 40,
        }}
      >
        <AgentStatus />
        <SystemMetrics />
      </div>
    </motion.section>
  );
}