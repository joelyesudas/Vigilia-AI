export default function RecommendationCard({ threat }) {
  const actions = [
    threat.recommendation,
    "Review authentication logs",
    "Enable Multi-Factor Authentication",
    "Monitor endpoint for suspicious activity",
    "Notify SOC Team",
  ];

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
        🛡 Recommended Actions
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              background: "#0B1120",
              border: "1px solid #24324D",
              borderRadius: 12,
              padding: "14px 18px",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#22C55E",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              ✓
            </div>

            <span
              style={{
                color: "#E2E8F0",
                fontSize: 15,
              }}
            >
              {action}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}