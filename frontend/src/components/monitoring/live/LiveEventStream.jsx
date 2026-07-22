import { motion } from "framer-motion";
import { useMonitoring } from "../../../context/MonitoringContext";
import EventCard from "./EventCard";

export default function LiveEventStream() {
  const { parsedLogs, loading } = useMonitoring();

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid #23324A",
        borderRadius: 22,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: 520,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: 22,
            }}
          >
            📜 Live Event Stream
          </h2>

          <div
            style={{
              marginTop: 5,
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            Real-time security telemetry
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#22C55E",
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
            }}
          />

          LIVE
        </div>
      </div>

      {/* Events */}

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingRight: 4,
        }}
      >
        {loading ? (
          <div
            style={{
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Loading monitoring data...
          </div>
        ) : parsedLogs.length === 0 ? (
          <div
            style={{
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Waiting for incoming endpoint logs...
          </div>
        ) : (
          parsedLogs.map((log, index) => (
            <EventCard
              key={index}
              log={log}
            />
          ))
        )}
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 14,
          borderTop: "1px solid #23324A",
          display: "flex",
          justifyContent: "space-between",
          color: "#94A3B8",
          fontSize: 13,
        }}
      >
        <span>Events Received</span>

        <span
          style={{
            color: "white",
            fontWeight: 700,
          }}
        >
          {parsedLogs.length}
        </span>
      </div>
    </motion.div>
  );
}