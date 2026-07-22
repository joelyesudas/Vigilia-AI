import { Search } from "lucide-react";
import { useThreats } from "../../context/ThreatContext";

export default function ThreatSearch() {
  const { search, setSearch } = useThreats();

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 16,
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Search size={20} color="#94A3B8" />

      <input
        type="text"
        placeholder="Search Threat, IP or MITRE Technique..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: 16,
        }}
      />
    </div>
  );
}