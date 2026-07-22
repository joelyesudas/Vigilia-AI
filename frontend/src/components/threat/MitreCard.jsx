export default function MitreCard({ threat }) {
  const mitre = threat.mitre;

  if (!mitre) return null;

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
        🎯 MITRE ATT&CK Mapping
      </h2>

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
          marginBottom: 25,
        }}
      >
        <div
          style={{
            background: "#1E3A8A",
            color: "#DBEAFE",
            padding: "10px 18px",
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          {mitre.techniqueId}
        </div>

        <div
          style={{
            background: "#0F766E",
            color: "#CCFBF1",
            padding: "10px 18px",
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          {mitre.technique}
        </div>

        <div
          style={{
            background: "#7C3AED",
            color: "#F3E8FF",
            padding: "10px 18px",
            borderRadius: 10,
            fontWeight: 700,
          }}
        >
          {mitre.tactic}
        </div>
      </div>

      <div
        style={{
          background: "#0B1120",
          border: "1px solid #24324D",
          borderRadius: 12,
          padding: 18,
        }}
      >
        <h3
          style={{
            color: "#38BDF8",
            marginBottom: 12,
          }}
        >
          Description
        </h3>

        <p
          style={{
            color: "#CBD5E1",
            lineHeight: "30px",
            margin: 0,
          }}
        >
          {mitre.description}
        </p>
      </div>
    </div>
  );
}