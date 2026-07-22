import HeroGlobe from "./HeroGlobe";

export default function HeroBackground() {
  // Inject pulse animation once
  if (!document.getElementById("vigilia-pulse")) {
    const style = document.createElement("style");

    style.id = "vigilia-pulse";

    style.innerHTML = `
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.8);
          opacity: .35;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    `;

    document.head.appendChild(style);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        width: "100%",
        height: "100%",
      }}
    >
      {/* ================= Globe ================= */}

      <div
        style={{
          position: "relative",
          width: 480,
          height: 480,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Outer Glow */}

        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(59,130,246,.12)",
            filter: "blur(90px)",
          }}
        />

        {/* Orbit Ring */}

        <div
          style={{
            position: "absolute",
            width: 390,
            height: 390,
            borderRadius: "50%",
            border: "1px solid rgba(59,130,246,.15)",
          }}
        />

        {/* Orbit Ring */}

        <div
          style={{
            position: "absolute",
            width: 330,
            height: 330,
            borderRadius: "50%",
            border: "1px dashed rgba(34,211,238,.18)",
          }}
        />

        {/* Hero Globe */}

        <div
          style={{
            transform: "scale(1.18)",
            zIndex: 5,
          }}
        >
          <HeroGlobe />
        </div>

        {/* Threat Nodes */}

        <ThreatNode top={60} left={70} />

        <ThreatNode top={120} right={40} />

        <ThreatNode bottom={70} left={110} />

        <ThreatNode bottom={110} right={90} />
      </div>

      {/* ================= Threat Intelligence Card ================= */}

      <div
        style={{
          width: 340,
          background: "rgba(15,23,42,.88)",
          border: "1px solid rgba(56,189,248,.12)",
          borderRadius: 22,
          padding: 22,
          backdropFilter: "blur(12px)",
          boxShadow: "0 15px 30px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
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

          <span
            style={{
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Global Threat Intelligence
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <Metric
            title="Threats"
            value="12"
            color="#EF4444"
          />

          <Metric
            title="Events"
            value="148"
            color="#3B82F6"
          />

          <Metric
            title="Agents"
            value="18"
            color="#22C55E"
          />

          <Metric
            title="Risk"
            value="High"
            color="#F59E0B"
          />
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div
      style={{
        background: "#16263F",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 12,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 30,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ThreatNode(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: "#38BDF8",
        boxShadow: "0 0 18px #38BDF8",
        animation: "pulse 2.2s infinite",
        ...props,
      }}
    />
  );
}