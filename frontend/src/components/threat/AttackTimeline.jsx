export default function AttackTimeline({ threat }) {
  const events = [
    {
      time: "09:15",
      icon: "👤",
      title: "User Login",
      color: "#22C55E",
    },
    {
      time: "09:16",
      icon: "🚨",
      title: threat.type,
      color: "#EF4444",
    },
    {
      time: "09:17",
      icon: "🔥",
      title: "Firewall Triggered",
      color: "#F97316",
    },
    {
      time: "09:18",
      icon: "🦠",
      title: "Malware Scan Initiated",
      color: "#EAB308",
    },
    {
      time: "09:19",
      icon: "🛡",
      title: "SOC Investigation Started",
      color: "#3B82F6",
    },
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
          marginBottom: 30,
        }}
      >
        🕒 Attack Timeline
      </h2>

      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
            position: "relative",
            paddingBottom: index !== events.length - 1 ? 30 : 0,
          }}
        >
          {/* Timeline Line */}
          {index !== events.length - 1 && (
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 35,
                width: 2,
                height: 35,
                background: "#334155",
              }}
            />
          )}

          {/* Icon */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: event.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {event.icon}
          </div>

          {/* Content */}
          <div>
            <div
              style={{
                color: "#38BDF8",
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {event.time}
            </div>

            <div
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              {event.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}