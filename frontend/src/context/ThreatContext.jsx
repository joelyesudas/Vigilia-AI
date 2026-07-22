import { createContext, useContext, useMemo, useState } from "react";
import { useDashboard } from "./DashboardContext";

const ThreatContext = createContext();

export const ThreatProvider = ({ children }) => {
  const { threats } = useDashboard();

  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("All");

  const filteredThreats = useMemo(() => {
  return (threats || []).filter((threat) => {
    if (!threat) return false;

    const matchesSeverity =
      severity === "All" ||
      (threat.severity ?? "").toLowerCase() === severity.toLowerCase();

    const q = search.toLowerCase();

    return (
      (threat.title ?? threat.type ?? "")
        .toLowerCase()
        .includes(q) ||

      (threat.ip ?? "")
        .toLowerCase()
        .includes(q) ||

      (threat.mitre?.techniqueId ?? "")
        .toLowerCase()
        .includes(q) ||

      (threat.mitre?.technique ?? "")
        .toLowerCase()
        .includes(q)
    ) && matchesSeverity;
  });
}, [threats, search, severity]);

  return (
    <ThreatContext.Provider
      value={{
        search,
        setSearch,
        severity,
        setSeverity,
        filteredThreats,
      }}
    >
      {children}
    </ThreatContext.Provider>
  );
};

export const useThreats = () => useContext(ThreatContext);