import { useThreats } from "../../context/ThreatContext";

export default function ThreatFilters() {
  const { severity, setSeverity } = useThreats();

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
      }}
    >
      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        style={{
          background: "#111827",
          color: "white",
          border: "1px solid #24324D",
          padding: "12px 18px",
          borderRadius: 10,
          fontSize: 15,
        }}
      >
        <option>All</option>
        <option>Critical</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>
  );
}