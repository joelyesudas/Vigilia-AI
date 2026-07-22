export default function ThreatDetails({ threat }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
        marginBottom: 25,
      }}
    >
      <InfoCard title="Confidence" value={`${threat.confidence}%`} />

      <InfoCard
        title="IP Address"
        value={threat.ip || "N/A"}
      />

      <InfoCard
        title="Username"
        value={threat.username || "Unknown"}
      />

      <InfoCard
        title="Timestamp"
        value={threat.timestamp}
      />
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #23324D",
        borderRadius: 15,
        padding: 18,
      }}
    >
      <p
        style={{
          color: "#94A3B8",
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {title}
      </p>

      <h3
        style={{
          color: "white",
          margin: 0,
        }}
      >
        {value}
      </h3>
    </div>
  );
}