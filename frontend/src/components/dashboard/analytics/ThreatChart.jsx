import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useDashboard } from "../../../context/DashboardContext";

export default function ThreatChart() {
  const { threats } = useDashboard();

  const counts = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  };

  threats.forEach((threat) => {
    const severity =
      threat.severity.charAt(0).toUpperCase() +
      threat.severity.slice(1).toLowerCase();

    if (counts[severity] !== undefined) {
      counts[severity]++;
    }
  });

  const data = [
    {
      severity: "Critical",
      threats: counts.Critical,
    },
    {
      severity: "High",
      threats: counts.High,
    },
    {
      severity: "Medium",
      threats: counts.Medium,
    },
    {
      severity: "Low",
      threats: counts.Low,
    },
  ];

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #23324A",
        borderRadius: "22px",
        padding: "30px",
        flex: 2,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "25px",
          fontSize: "24px",
        }}
      >
        Threat Severity Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            stroke="#1E293B"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="severity"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#94A3B8"
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #23324A",
              borderRadius: "12px",
              color: "white",
            }}
          />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#3B82F6"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#60A5FA",
            }}
            activeDot={{
              r: 8,
              fill: "#38BDF8",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}