import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "08:00", threats: 8 },
  { time: "09:00", threats: 12 },
  { time: "10:00", threats: 7 },
  { time: "11:00", threats: 15 },
  { time: "12:00", threats: 11 },
  { time: "13:00", threats: 18 },
  { time: "14:00", threats: 13 },
];

export default function ThreatChart() {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 20,
        padding: 24,
        height: 350,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        Threat Activity
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            stroke="#94A3B8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="threats"
            stroke="#3B82F6"
            strokeWidth={4}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}