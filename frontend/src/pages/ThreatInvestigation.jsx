import { ThreatProvider } from "../context/ThreatContext";

import ThreatHero from "../components/threats/ThreatHero";
import ThreatSearch from "../components/threats/ThreatSearch";
import ThreatFilters from "../components/threats/ThreatFilters";
import ThreatGrid from "../components/threats/ThreatGrid";

export default function ThreatInvestigation() {
  return (
    <ThreatProvider>
      <div
        style={{
          padding: "28px",
          position: "relative",
          minHeight: "100vh",
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
              "radial-gradient(circle, rgba(37,99,235,.22), transparent 70%)",
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
              "radial-gradient(circle, rgba(6,182,212,.14), transparent 70%)",
            filter: "blur(100px)",
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
          <ThreatHero />

          <ThreatSearch />

          <ThreatFilters />

          <ThreatGrid />
        </div>
      </div>
    </ThreatProvider>
  );
}