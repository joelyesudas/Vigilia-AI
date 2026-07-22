import {
  Home,
  Activity,
  Search,
  Shield,
  FileText,
  Bot,
  Settings,
  Upload,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { showSuccess } from "../../utils/toast";

import { motion } from "framer-motion";

import logo from "../../assets/logo.jpeg";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Home size={20} />,
  },
  {
    name: "Monitoring",
    path: "/monitoring",
    icon: <Activity size={20} />,
  },
  {
  name: "Scan History",
  path: "/scan-history",
  icon: "🛡️",
},
  {
    name: "Upload Analysis",
    path: "/upload",
    icon: <Upload size={20} />,
  },
  {
    name: "Threat Investigation",
    path: "/threat-investigation",
    icon: <Search size={20} />,
  },
  {
    name: "Incident Response",
    path: "/incident-response",
    icon: <Shield size={20} />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FileText size={20} />,
  },
  {
    name: "AI Copilot",
    path: "/copilot",
    icon: <Bot size={20} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings size={20} />,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token"); // or whatever key you use
  showSuccess("Logged out successfully");
  navigate("/login");
};
  return (
    <motion.div
      initial={{
        x: -80,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      style={{
        width: "270px",
        height: "100vh",
        background:
          "linear-gradient(180deg,#081229,#0F172A,#111827)",
        borderRight: "1px solid rgba(56,189,248,.15)",
        display: "flex",
        flexDirection: "column",
        padding: "26px",
        boxSizing: "border-box",
        position: "sticky",
        top: 0,
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#2563EB30 0%,transparent 70%)",
          top: -120,
          right: -120,
          filter: "blur(40px)",
        }}
      />

      {/* Logo */}
      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 45,
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={logo}
          alt="Vigilia AI"
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            objectFit: "cover",
            boxShadow:
              "0 0 18px rgba(59,130,246,.45)",
          }}
        />

        <div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            Vigilia
          </div>

          <div
            style={{
              color: "#38BDF8",
              fontWeight: 700,
              letterSpacing: 2,
              marginTop: 4,
            }}
          >
            AI
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          position: "relative",
          zIndex: 2,
        }}
      >
        {menus.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <NavLink
              to={item.path}
              end={item.path === "/"}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 15,
                padding: "16px 18px",
                borderRadius: 16,
                textDecoration: "none",
                color: isActive ? "#FFFFFF" : "#CBD5E1",
                background: isActive
                  ? "linear-gradient(90deg,#2563EB,#1D4ED8)"
                  : "transparent",
                fontSize: 16,
                fontWeight: 600,
                transition: ".25s",
                boxShadow: isActive
                  ? "0 10px 25px rgba(37,99,235,.35)"
                  : "none",
              })}
            >
              {item.icon}
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <motion.div
        whileHover={{
          scale: 1.03,
        }}
        style={{
          marginTop: "auto",
          background:
            "linear-gradient(180deg,#111827,#0B1220)",
          border: "1px solid rgba(56,189,248,.15)",
          borderRadius: 20,
          padding: 22,
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
          System Status
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 14,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#22C55E",
              boxShadow: "0 0 18px #22C55E",
              animation: "pulseStatus 1.6s infinite",
            }}
          />

          <div
            style={{
              color: "#22C55E",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            Protected
          </div>
        </div>

        <div
          style={{
            color: "#94A3B8",
            marginTop: 10,
            fontSize: 15,
          }}
        >
          AI Engine Online
        </div>
      </motion.div>
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  onClick={handleLogout}
  style={{
    marginTop: 18,
    width: "100%",
    padding: "15px",
    borderRadius: 16,
    border: "1px solid rgba(239,68,68,.25)",
    background: "linear-gradient(135deg,#991B1B,#DC2626)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  }}
>
  <LogOut size={18} />
  Logout
</motion.button>
      <style>{`
        @keyframes pulseStatus{
          0%{
            transform:scale(.8);
            opacity:.5;
          }
          50%{
            transform:scale(1.3);
            opacity:1;
          }
          100%{
            transform:scale(.8);
            opacity:.5;
          }
        }
      `}</style>
    </motion.div>
  );
}