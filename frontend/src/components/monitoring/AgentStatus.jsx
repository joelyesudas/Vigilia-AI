import AgentCard from "./AgentCard";

const agents = [
  {
    title: "Windows Endpoint",
    status: "Online",
    os: "Windows 11",
    version: "v2.4.1",
    color: "#22C55E",
  },
  {
    title: "Linux Server",
    status: "Online",
    os: "Ubuntu 24.04",
    version: "v2.4.1",
    color: "#22C55E",
  },
  {
    title: "Firewall Gateway",
    status: "Warning",
    os: "pfSense",
    version: "v2.3.8",
    color: "#F59E0B",
  },
  {
    title: "Docker Host",
    status: "Online",
    os: "Docker Engine",
    version: "v2.4.0",
    color: "#38BDF8",
  },
];

export default function AgentStatus() {
  return (
    <div
      style={{
        background: "#101A2C",
        border: "1px solid #23324A",
        borderRadius: 22,
        padding: 24,
        height: "100%",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 22,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: 22,
            }}
          >
            🛰 Active Agents
          </h2>

          <div
            style={{
              marginTop: 4,
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            Endpoint monitoring status
          </div>
        </div>

        <div
          style={{
            background: "#16263F",
            color: "#38BDF8",
            padding: "6px 12px",
            borderRadius: 18,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {agents.length} Connected
        </div>
      </div>

      {/* Cards */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {agents.map((agent) => (
          <AgentCard
            key={agent.title}
            title={agent.title}
            status={agent.status}
            os={agent.os}
            version={agent.version}
            color={agent.color}
          />
        ))}
      </div>
    </div>
  );
}