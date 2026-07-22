import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { motion } from "framer-motion";
import { useMonitoring } from "../../../context/MonitoringContext";

export default function SystemChart() {
  const { summary, loading } = useMonitoring();

  if (loading || !summary) {
    return (
      <div
        style={{
          flex: 1,
          background: "linear-gradient(180deg,#111827,#0F172A)",
          border: "1px solid #23324A",
          borderRadius: 22,
          padding: 24,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading threat analytics...
      </div>
    );
  }

  const chartData = [
    {
      severity: "Critical",
      threats: summary.criticalThreats || 0,
      color: "#DC2626",
    },
    {
      severity: "High",
      threats: summary.highThreats || 0,
      color: "#EF4444",
    },
    {
      severity: "Medium",
      threats: summary.mediumThreats || 0,
      color: "#F59E0B",
    },
    {
      severity: "Low",
      threats: summary.lowThreats || 0,
      color: "#22C55E",
    },
  ];

  const totalThreats = chartData.reduce(
    (sum, item) => sum + item.threats,
    0
  );

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      style={{
        flex: 1,
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid #23324A",
        borderRadius: 22,
        padding: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
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
            📊 Threat Severity Analytics
          </h2>

          <div
            style={{
              marginTop: 5,
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            Distribution of detected security threats
          </div>
        </div>

        <div
          style={{
            background: "#16263F",
            color: "#38BDF8",
            padding: "8px 14px",
            borderRadius: 18,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "white",
            }}
          >
            {totalThreats}
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#94A3B8",
            }}
          >
            Total
          </div>
        </div>
      </div>

      {/* Chart */}

      <div style={{ flex: 1 }}>
        <ResponsiveContainer
          width="100%"
          height={330}
        >
          <BarChart data={chartData}>
            <CartesianGrid
              stroke="#23324A"
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
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(59,130,246,.08)",
              }}
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #23324A",
                borderRadius: 12,
                color: "white",
              }}
            />

            <Bar
              dataKey="threats"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 16,
          flexWrap: "wrap",
        }}
      >
        {chartData.map((item) => (
          <div
            key={item.severity}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#CBD5E1",
              fontSize: 13,
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

            {item.severity}
          </div>
        ))}
      </div>
    </motion.div>
  );
}