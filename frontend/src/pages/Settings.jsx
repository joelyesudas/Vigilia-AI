import { motion } from "framer-motion";

import ProfileSettings from "../components/settings/ProfileSettings";
import AISettings from "../components/settings/AISettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import ReportSettings from "../components/settings/ReportSettings";
import SecuritySettings from "../components/settings/SecuritySettings";

export default function Settings() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 30,
        background:
          "radial-gradient(circle at top right, rgba(59,130,246,.08), transparent 35%), radial-gradient(circle at bottom left, rgba(168,85,247,.08), transparent 35%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#020617,#081229,#0F172A)",
          border: "1px solid #1E3A5F",
          borderRadius: 28,
          padding: 45,
          marginBottom: 35,
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "#2563EB",
            opacity: .08,
            filter: "blur(80px)",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(37,99,235,.12)",
              color: "#60A5FA",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            ⚙️ Enterprise Configuration
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 54,
              margin: 0,
            }}
          >
            Settings Center
          </h1>

          <p
            style={{
              color: "#94A3B8",
              marginTop: 22,
              maxWidth: 760,
              lineHeight: "34px",
              fontSize: 18,
            }}
          >
            Configure AI behavior, notification preferences,
            reporting, profile information and enterprise
            security policies for Vigilia AI.
          </p>
        </div>
      </motion.div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(360px,1fr))",
          gap: 24,
        }}
      >
        <ProfileSettings />
        <AISettings />
        <NotificationSettings />
        <ReportSettings />
        <SecuritySettings />

        <motion.div
          whileHover={{
            y: -4,
          }}
          style={{
            background:
              "linear-gradient(180deg,#111827,#0F172A)",
            border: "1px solid #24324D",
            borderRadius: 22,
            padding: 30,
          }}
        >
          <h2
            style={{
              color: "white",
              marginBottom: 24,
            }}
          >
            ℹ️ System Information
          </h2>

          <Info label="Platform" value="Vigilia AI" />
          <Info label="Version" value="1.0.0" />
          <Info label="AI Engine" value="Gemini 2.5 Flash" />
          <Info
            label="Status"
            value="● Operational"
            color="#22C55E"
          />
          <Info label="License" value="Enterprise" />
          <Info label="Last Update" value="July 2026" />
        </motion.div>
      </div>
    </div>
  );
}

function Info({ label, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <span style={{ color: "#94A3B8" }}>
        {label}
      </span>

      <span
        style={{
          color: color || "white",
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  );
}