import IncidentHero from "../components/incident/IncidentHero";
import IncidentStats from "../components/incident/IncidentStats";
import ActiveIncidents from "../components/incident/ActiveIncidents";

export default function IncidentResponse() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "28px",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239,68,68,.15), transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -220,
          left: -220,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,.18), transparent 70%)",
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <IncidentHero />

        <IncidentStats />

        <ActiveIncidents />
      </div>
    </div>
  );
}