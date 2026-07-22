import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020617 0%,#07101F 45%,#0F172A 100%)",
        position: "relative",
      }}
    >
      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#2563EB25 0%,transparent 70%)",
          top: -180,
          left: -180,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#38BDF81A 0%,transparent 70%)",
          right: -120,
          bottom: -120,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Sidebar */}

      <div
        style={{
          width: 270,
          minWidth: 270,
          maxWidth: 270,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <Sidebar />
      </div>

      {/* Main */}

      <div
        style={{
          marginLeft: 270,
          width: "calc(100vw - 270px)",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Topbar */}

        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            flexShrink: 0,
          }}
        >
          <Topbar />
        </motion.div>

        {/* Content */}

        <motion.main
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.55,
          }}
          style={{
            flex: 1,
            width: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            padding: "24px",
            scrollbarWidth: "thin",
            scrollbarColor: "#2563EB transparent",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              minWidth: 0,
              minHeight: "100%",
            }}
          >
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
}