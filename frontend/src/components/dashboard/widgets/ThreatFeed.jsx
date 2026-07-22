const alerts = [
  {
    severity: "Critical",
    title: "Ransomware Activity",
    color: "#EF4444",
  },
  {
    severity: "High",
    title: "Brute Force Attack",
    color: "#F97316",
  },
  {
    severity: "Medium",
    title: "Suspicious Login",
    color: "#F59E0B",
  },
  {
    severity: "Low",
    title: "Port Scan",
    color: "#22C55E",
  },
];

export default function ThreatFeed() {
  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 24,
        border: "1px solid #24324D",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        Live Threat Feed
      </h2>

      {alerts.map((item) => (
        <div
          key={item.title}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
            padding: "16px 0",
            borderBottom: "1px solid #1E293B",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: item.color,
            }}
          />

          <div>
            <div
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                color: "#94A3B8",
              }}
            >
              {item.severity}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}