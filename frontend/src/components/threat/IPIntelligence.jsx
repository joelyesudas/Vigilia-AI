export default function IPIntelligence({ threat }) {
  const getRiskColor = () => {
    switch (threat.severity) {
      case "Critical":
        return "#EF4444";
      case "High":
        return "#F97316";
      case "Medium":
        return "#EAB308";
      default:
        return "#22C55E";
    }
  };

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 18,
        padding: 25,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        🌍 IP Intelligence
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 18,
        }}
      >
        <Info title="IP Address" value={threat.ip || "Unknown"} />

        <Info title="Country" value="🇮🇳 India" />

        <Info title="ISP" value="Private Network" />

        <Info
          title="Risk Score"
          value={`${threat.confidence}/100`}
          color={getRiskColor()}
        />

        <Info title="Reputation" value="Suspicious" />

        <Info title="Threat Feed" value="MITRE Correlated" />
      </div>
    </div>
  );
}

function Info({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0B1120",
        border: "1px solid #24324D",
        borderRadius: 12,
        padding: 16,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: color || "white",
          fontWeight: 700,
          fontSize: 17,
        }}
      >
        {value}
      </div>
    </div>
  );
}