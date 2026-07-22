import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useMonitoring } from "../../context/MonitoringContext";
import IncidentCard from "./IncidentCard";

export default function ActiveIncidents() {
  const { threats } = useMonitoring();

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    if (!threats || threats.length === 0) {
      setIncidents([]);
      return;
    }

    const mappedIncidents = threats.map((threat) => ({
      id: threat.id,
      title: threat.type,
      description: threat.matchedLog,
      severity: threat.severity,
      assigned: "AI Engine",
      status: "Open",
      time: threat.timestamp,
      source: threat.ip || "Unknown",
      confidence: threat.confidence,
      recommendation: threat.recommendation,
      mitre: threat.mitre,
    }));

    setIncidents(mappedIncidents);
  }, [threats]);

  const updateIncident = (id, changes) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? { ...incident, ...changes }
          : incident
      )
    );
  };

  if (incidents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background:
            "linear-gradient(180deg,#111827,#0F172A)",
          border: "1px solid #24324D",
          borderRadius: 24,
          padding: 70,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 70,
            marginBottom: 20,
          }}
        >
          ✅
        </div>

        <h2
          style={{
            color: "white",
            marginBottom: 10,
          }}
        >
          No Active Incidents
        </h2>

        <p
          style={{
            color: "#94A3B8",
            fontSize: 16,
          }}
        >
          Vigilia AI has not detected any active security incidents.
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
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Active Security Incidents
          </div>

          <div
            style={{
              color: "#94A3B8",
              marginTop: 6,
            }}
          >
            {incidents.length} Incident
            {incidents.length !== 1 ? "s" : ""} Currently Open
          </div>
        </div>

        <div
          style={{
            background:
              "rgba(239,68,68,.12)",
            border:
              "1px solid rgba(239,68,68,.25)",
            color: "#EF4444",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: 700,
          }}
        >
          ● Live Monitoring
        </div>
      </motion.div>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gap: 24,
        }}
      >
        {incidents.map((incident, index) => (
          <motion.div
            key={incident.id}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.06,
            }}
          >
            <IncidentCard
              incident={incident}
              updateIncident={updateIncident}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}