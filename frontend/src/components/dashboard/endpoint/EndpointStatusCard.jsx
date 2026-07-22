import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { showInfo, showSuccess } from "../../../utils/toast";

export default function EndpointStatusCard() {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [lastScan, setLastScan] = useState("2 min ago");
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 1800 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleScan = () => {
    if (isScanning) return;

    setIsScanning(true);

    showInfo("Starting endpoint scan...");

    setTimeout(() => {
      setLastScan("Just now");
      setTimeLeft(1800);
      setIsScanning(false);

      showSuccess("Endpoint scan completed successfully.");
    }, 2500);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const metrics = [
    { label: "CPU", value: "18%" },
    { label: "RAM", value: "42%" },
    { label: "Disk", value: "51%" },
    { label: "Network", value: "Online" },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "linear-gradient(180deg,#111827,#0B1220)",
        border: "1px solid #23324A",
        borderRadius: 20,
        padding: 24,
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#2563EB",
          opacity: 0.08,
          filter: "blur(70px)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
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
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              🛡 Endpoint Health
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              Real-time endpoint monitoring
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#22C55E",
              fontWeight: 600,
              fontSize: 13,
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
            Running
          </div>
        </div>

        {/* Status */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <StatusItem
            label="Last Scan"
            value={lastScan}
          />

          <StatusItem
            label="Next Scan"
            value={`${minutes}:${seconds}`}
          />

          <StatusItem
            label="Protection"
            value="Enabled"
          />

          <StatusItem
            label="Agent"
            value="Online"
          />
        </div>

        {/* Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                background: "#16263F",
                border: "1px solid rgba(56,189,248,.08)",
                borderRadius: 14,
                padding: 14,
              }}
            >
              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 12,
                }}
              >
                {metric.label}
              </div>

              <div
                style={{
                  marginTop: 6,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#38BDF8",
                }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Scan Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleScan}
          disabled={isScanning}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: 14,
            background: isScanning
              ? "#475569"
              : "linear-gradient(90deg,#2563EB,#3B82F6)",
            color: "white",
            fontWeight: 700,
            fontSize: 15,
            cursor: isScanning ? "not-allowed" : "pointer",
            transition: ".25s",
          }}
        >
          {isScanning ? "🔄 Scanning..." : "🛰 Scan Now"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function StatusItem({ label, value }) {
  return (
    <div
      style={{
        background: "#0F172A",
        border: "1px solid #23324A",
        borderRadius: 14,
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 12,
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 5,
          color: "white",
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}