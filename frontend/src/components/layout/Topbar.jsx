import { useEffect, useState } from "react";
import {
  Bell,
  Globe,
  Search,
  User,
  Upload,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
const location = useLocation();

const pageTitles = {
  "/": {
    title: "Dashboard",
    subtitle: "Real-time Security Operations Center",
  },
  "/monitoring": {
    title: "Monitoring",
    subtitle: "Endpoint & Infrastructure Monitoring",
  },
  "/upload": {
    title: "Upload Analysis",
    subtitle: "AI Powered Threat Analysis",
  },
  "/threat-investigation": {
    title: "Threat Investigation",
    subtitle: "Deep Threat Intelligence",
  },
  "/incident-response": {
    title: "Incident Response",
    subtitle: "SOC Response Workflow",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Executive Security Reports",
  },
  "/copilot": {
    title: "AI Copilot",
    subtitle: "Cybersecurity Assistant",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Platform Configuration",
  },
};

const currentPage =
  pageTitles[location.pathname] || {
    title: "Vigilia AI",
    subtitle: "Enterprise Security Platform",
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        height: "78px",
        background: "rgba(24,35,56,.75)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(56,189,248,.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      
      {<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 22,
  }}
>
  <div>
    <div
      style={{
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: 800,
      }}
    >
      {currentPage.title}
    </div>

    <div
      style={{
        color: "#94A3B8",
        marginTop: 4,
        fontSize: 13,
      }}
    >
      {currentPage.subtitle}
    </div>
  </div>

  <motion.div
    whileHover={{ scale: 1.02 }}
    style={{
      width: 390,
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#1F2B44",
      padding: "13px 18px",
      borderRadius: 14,
      border: "1px solid rgba(56,189,248,.15)",
    }}
  >
    <Search size={18} color="#94A3B8" />

    <input
      placeholder="Search threats, logs, CVEs, MITRE ATT&CK..."
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        color: "white",
        width: "100%",
        fontSize: 15,
        fontWeight: 500,
letterSpacing: ".2px",
      }}
    />
  </motion.div>
</div>
}
      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* AI Status */}
        <motion.div
  whileHover={{
    scale: 1.05,
  }}
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    borderRadius: 14,
    background: "rgba(34,197,94,.08)",
    border: "1px solid rgba(34,197,94,.2)",
  }}
>
  <ShieldCheck
    size={20}
    color="#22C55E"
  />

  <div>
    <div
      style={{
        color: "#22C55E",
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      AI Engine Online
    </div>

    <div
      style={{
        color: "#94A3B8",
        fontSize: 11,
      }}
    >
      Confidence 99.8%
    </div>
  </div>
</motion.div>

        {/* Time */}
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#E2E8F0",
            fontWeight: 500,
          }}
        >
          <Globe size={17} />

          {time}
        </motion.div>

        {/* Notification */}
        <motion.div
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  style={{
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "#1F2B44",
    border: "1px solid rgba(56,189,248,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }}
>
  <Bell size={20} color="white" />

  <div
    style={{
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 18,
      height: 18,
      borderRadius: "50%",
      background: "#EF4444",
      color: "white",
      fontSize: 10,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    3
  </div>
</motion.div>
        {/* User */}
        <motion.div
          whileHover={{
            scale: 1.04,
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#1F2B44",
            border: "1px solid rgba(56,189,248,.12)",
            padding: "10px 18px",
            borderRadius: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#2563EB",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <User
              color="white"
              size={20}
            />
          </div>

          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
              }}
            >
              {user?.name || "SOC Analyst"}
            </div>

            <div
              style={{
                color: "#94A3B8",
                fontSize: 12,
              }}
            >
              {user?.role || "Security Analyst"}
            </div>
          </div>
        </motion.div>
      </div>
<motion.button
  whileHover={{
    scale: 1.05,
  }}
  whileTap={{
    scale: 0.96,
  }}
  onClick={() => navigate("/upload")}
  style={{
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 24px",
    borderRadius: 14,
    background:
      "linear-gradient(90deg,#2563EB,#3B82F6)",
    color: "white",
    fontWeight: 600,
fontSize: 15,
    boxShadow:
      "0 10px 25px rgba(37,99,235,.35)",
  }}
>
  <Upload size={18} />
  Upload Log
</motion.button>

      <style>{`
        @keyframes pulseStatus{
          0%{
            transform:scale(.8);
            opacity:.6;
          }

          50%{
            transform:scale(1.3);
            opacity:1;
          }

          100%{
            transform:scale(.8);
            opacity:.6;
          }
        }
      `}</style>
    </motion.div>
  );
}