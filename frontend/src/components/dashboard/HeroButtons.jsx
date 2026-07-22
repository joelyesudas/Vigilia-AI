import { useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

import { useDashboard } from "../../context/DashboardContext";
import { useAuth } from "../../context/AuthContext";

export default function HeroButtons() {
  const fileInputRef = useRef(null);

  const { uploadLog, loading } = useDashboard();
  const { token } = useAuth();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const uploadSelectedFile = async (file) => {
    try {
      const formData = new FormData();

      formData.append("log", file);

      await uploadLog(formData, token);

      toast.success("🛡 Log analyzed successfully!");
    } catch (error) {
      console.error("Upload Error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Upload failed!"
      );
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    await uploadSelectedFile(file);
  };

  // ==========================
  // Demo Attack Simulation
  // ==========================
  const handleDemoSimulation = async () => {
    try {
      toast.info("🚀 Running attack simulation...");

      const response = await fetch("/demoAttack.log");

      if (!response.ok) {
        throw new Error("Unable to load demoAttack.log");
      }

      const blob = await response.blob();

      const file = new File([blob], "demoAttack.log", {
        type: "text/plain",
      });

      await uploadSelectedFile(file);

      toast.success("🔥 Demo attack simulation completed!");
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    }
  };

  // ==========================
  // Manual System Scan
  // ==========================
  const handleSystemScan = async () => {
    try {
      toast.info("🛡 Starting system scan...");

      await axios.post("http://localhost:5000/api/scans/manual");

      toast.success("✅ System scan completed!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to start system scan."
      );
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "45px",
          marginBottom: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* Demo Simulation */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 35px rgba(220,38,38,.45)",
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          onClick={handleDemoSimulation}
          style={{
            background:
              "linear-gradient(135deg,#DC2626,#B91C1C)",
            color: "white",
            border: "none",
            padding: "20px 34px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          🚀 Run Attack Simulation
        </motion.button>

        {/* Manual Scan */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 35px rgba(34,197,94,.45)",
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          onClick={handleSystemScan}
          style={{
            background:
              "linear-gradient(135deg,#22C55E,#16A34A)",
            color: "white",
            border: "none",
            padding: "20px 34px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          🛡 Scan My Computer
        </motion.button>

        {/* Upload Logs */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 35px rgba(37,99,235,.45)",
          }}
          whileTap={{
            scale: 0.96,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          onClick={handleUploadClick}
          disabled={loading}
          style={{
            background:
              "linear-gradient(135deg,#2563EB,#1D4ED8)",
            color: "white",
            border: "none",
            padding: "20px 34px",
            borderRadius: "16px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "⏳ Uploading..." : "📂 Upload Logs"}
        </motion.button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".log,.txt,.csv,.json,.evtx"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
}