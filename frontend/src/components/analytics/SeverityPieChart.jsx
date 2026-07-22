import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

const data = [
  { name: "Critical", value: 3 },
  { name: "High", value: 5 },
  { name: "Medium", value: 7 },
  { name: "Low", value: 2 },
];

const COLORS = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
];

export default function SeverityPieChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 24,
        padding: 28,
        boxShadow: "0 15px 35px rgba(0,0,0,.25)",
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
              color: "#fff",
              fontSize: 26,
            }}
          >
            🍩 Threat Severity
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            Distribution of detected threats by severity.
          </p>
        </div>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: 30,
            background: "rgba(239,68,68,.12)",
            border: "1px solid rgba(239,68,68,.25)",
            color: "#EF4444",
            fontWeight: 700,
          }}
        >
          {total} Active
        </div>
      </div>

      {/* KPI Strip */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <Metric
          title="Critical"
          value="3"
          color="#EF4444"
        />

        <Metric
          title="High"
          value="5"
          color="#F97316"
        />

        <Metric
          title="Medium"
          value="7"
          color="#EAB308"
        />

        <Metric
          title="Low"
          value="2"
          color="#22C55E"
        />
      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: 12,
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              color: "#CBD5E1",
              paddingTop: 15,
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Footer */}

      <div
        style={{
          marginTop: 20,
          padding: 18,
          borderRadius: 16,
          background: "rgba(59,130,246,.08)",
          border: "1px solid rgba(59,130,246,.15)",
          color: "#CBD5E1",
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: "#60A5FA" }}>
          AI Insight
        </strong>

        <p
          style={{
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          Most detected threats fall within the <strong>Medium</strong> severity
          range. Three <strong>Critical</strong> incidents require immediate
          investigation to maintain a healthy security posture.
        </p>
      </div>
    </motion.div>
  );
}

function Metric({ title, value, color }) {
  return (
    <div
      style={{
        background: "#0B1220",
        border: "1px solid rgba(56,189,248,.10)",
        borderRadius: 16,
        padding: 18,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 13,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 28,
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}