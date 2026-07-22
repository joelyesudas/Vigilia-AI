import { useDashboard } from "../../context/DashboardContext";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";

import { motion } from "framer-motion";



export default function ThreatTrendChart() {
  const { summary } = useDashboard();

const currentThreats = summary.totalThreats || 0;

const data = [
  {
    day: "Current",
    threats: currentThreats,
  },
];
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
            📈 Threat Analytics
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#94A3B8",
            }}
          >
            Threat activity generated from the latest endpoint scan.
          </p>
        </div>

        <div
          style={{
            padding: "10px 18px",
            borderRadius: 30,
            background: "rgba(59,130,246,.12)",
            border: "1px solid rgba(59,130,246,.25)",
            color: "#60A5FA",
            fontWeight: 700,
          }}
        >
          Latest Scan
        </div>
      </div>

      {/* KPI Strip */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Metric
  title="Detected Threats"
  value={summary.totalThreats}
  color="#EF4444"
/>

        <Metric
  title="Events"
  value={summary.totalEvents}
  color="#3B82F6"
/>

        <Metric
  title="Risk"
  value={summary.riskLevel}
  color="#22C55E"
/>
      </div>

      {/* Chart */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart data={data}>
          <defs>
            <linearGradient
              id="threatFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#3B82F6"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#3B82F6"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#23304D"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <YAxis stroke="#94A3B8" />

          <Tooltip
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: 12,
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="threats"
            stroke="#2563EB"
            fill="url(#threatFill)"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#60A5FA"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#60A5FA",
            }}
            activeDot={{
              r: 8,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Footer */}

      <div
        style={{
          marginTop: 22,
          display: "flex",
          justifyContent: "space-between",
          color: "#94A3B8",
          fontSize: 14,
        }}
      >
        <span>Updated every 30 seconds</span>

        <span
          style={{
            color: "#22C55E",
            fontWeight: 600,
          }}
        >
          ● LIVE DATA
        </span>
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
          color,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}