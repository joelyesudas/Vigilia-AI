import { useState } from "react";
import { motion } from "framer-motion";

import { useThreats } from "../../context/ThreatContext";

import ThreatCard from "./ThreatCard";
import ThreatModal from "../threat/ThreatModal";

export default function ThreatGrid() {
  const { filteredThreats } = useThreats();

  const [selectedThreat, setSelectedThreat] = useState(null);

  if (!filteredThreats || filteredThreats.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: "linear-gradient(180deg,#111827,#0F172A)",
          border: "1px solid #23324A",
          borderRadius: 24,
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 70,
            marginBottom: 24,
          }}
        >
          🛡️
        </div>

        <h2
          style={{
            color: "white",
            fontSize: 32,
            marginBottom: 12,
          }}
        >
          No Threats Found
        </h2>

        <p
          style={{
            color: "#94A3B8",
            fontSize: 17,
          }}
        >
          Your current filters returned no matching threats.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            Investigation Results
          </div>

          <div
            style={{
              color: "#94A3B8",
              marginTop: 6,
            }}
          >
            {filteredThreats.length} Threat
            {filteredThreats.length !== 1 ? "s" : ""} Available
          </div>
        </div>

        <div
          style={{
            background: "rgba(37,99,235,.12)",
            color: "#60A5FA",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
            border: "1px solid rgba(37,99,235,.25)",
          }}
        >
          Live Investigation
        </div>
      </motion.div>

      {/* Grid */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.35,
        }}
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(420px,1fr))",
          gap: 22,
        }}
      >
        {filteredThreats.map((threat, index) => (
          <motion.div
            key={threat.id ?? index}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
          >
            <ThreatCard
              threat={threat}
              onView={() => setSelectedThreat(threat)}
            />
          </motion.div>
        ))}
      </motion.div>

      <ThreatModal
        threat={selectedThreat}
        onClose={() => setSelectedThreat(null)}
      />
    </>
  );
}