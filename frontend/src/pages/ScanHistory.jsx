import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const headerStyle = {
  padding: "18px 16px",
  color: "#CBD5E1",
  fontWeight: 700,
  textAlign: "left",
  borderBottom: "1px solid rgba(255,255,255,.08)",
};

const cellStyle = {
  padding: "18px 16px",
  color: "#E2E8F0",
};

function SummaryCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        background: "linear-gradient(180deg,#111827,#0F172A)",
        border: "1px solid rgba(56,189,248,.15)",
        borderRadius: 22,
        padding: 22,
        boxShadow: "0 15px 35px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 14,
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: 12,
          color,
          fontSize: 34,
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </motion.div>
  );
}

export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadScans = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/scans/history"
      );

      setScans(res.data.scans || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadScans();
  }, []);

  const filteredScans = useMemo(() => {
    return scans.filter((scan) =>
      scan.riskLevel
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, scans]);

  const totalScans = scans.length;

  const avgScore =
    scans.length === 0
      ? 0
      : Math.round(
          scans.reduce(
            (sum, s) => sum + (s.securityScore || 0),
            0
          ) / scans.length
        );

  const totalThreats = scans.reduce(
    (sum, s) => sum + (s.summary?.totalThreats || 0),
    0
  );

  const safeSystems = scans.filter(
    (s) => s.riskLevel === "Safe"
  ).length;

  if (loading)
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#38BDF8",
          fontSize: 24,
          fontWeight: 700,
        }}
      >
        Loading Scan History...
      </div>
    );

  return (
    <div
      style={{
        padding: 30,
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 34,
            }}
          >
            🛡 Scan History
          </h1>

          <p
            style={{
              color: "#94A3B8",
              marginTop: 8,
            }}
          >
            Historical endpoint security scans powered by Vigilia AI
          </p>
        </div>

        <button
          onClick={loadScans}
          style={{
            background: "#2563EB",
            border: "none",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 14,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          🔄 Refresh
        </button>
      </div>

      <input
        placeholder="Search by Risk Level..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 25,
          background: "#111827",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.08)",
          borderRadius: 14,
          padding: 14,
          outline: "none",
          fontSize: 15,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <SummaryCard
          title="Total Scans"
          value={totalScans}
          color="#3B82F6"
        />

        <SummaryCard
          title="Average Score"
          value={`${avgScore}%`}
          color="#22C55E"
        />

        <SummaryCard
          title="Threats Found"
          value={totalThreats}
          color="#EF4444"
        />

        <SummaryCard
          title="Safe Systems"
          value={safeSystems}
          color="#A855F7"
        />
      </div>
            <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "linear-gradient(180deg,#111827,#0F172A)",
          border: "1px solid rgba(56,189,248,.15)",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,.30)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#111827",
            }}
          >
            <tr>
              <th style={headerStyle}>Time</th>
              <th style={headerStyle}>Security Score</th>
              <th style={headerStyle}>Risk Level</th>
              <th style={headerStyle}>Threats</th>
              <th style={headerStyle}>Processes</th>
              <th style={headerStyle}>Duration</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredScans.map((scan) => (
              <tr
                key={scan._id}
                style={{
                  borderBottom:
                    "1px solid rgba(255,255,255,.05)",
                  transition: ".25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "rgba(59,130,246,.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "transparent";
                }}
              >
                <td style={cellStyle}>
                  {new Date(
                    scan.createdAt
                  ).toLocaleString()}
                </td>

                <td style={cellStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 120,
                        height: 8,
                        background: "#1E293B",
                        borderRadius: 50,
                      }}
                    >
                      <div
                        style={{
                          width: `${scan.securityScore}%`,
                          height: "100%",
                          borderRadius: 50,
                          background:
                            scan.securityScore >= 90
                              ? "#22C55E"
                              : scan.securityScore >= 70
                              ? "#F59E0B"
                              : "#EF4444",
                        }}
                      />
                    </div>

                    <strong>
                      {scan.securityScore}%
                    </strong>
                  </div>
                </td>

                <td style={cellStyle}>
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: 30,
                      color: "#fff",
                      fontWeight: 700,
                      background:
                        scan.riskLevel === "Critical"
                          ? "#DC2626"
                          : scan.riskLevel === "High"
                          ? "#EA580C"
                          : scan.riskLevel === "Medium"
                          ? "#CA8A04"
                          : scan.riskLevel === "Low"
                          ? "#16A34A"
                          : "#2563EB",
                    }}
                  >
                    {scan.riskLevel}
                  </span>
                </td>

                <td style={cellStyle}>
                  {scan.summary?.totalThreats ?? 0}
                </td>

                <td style={cellStyle}>
                  {scan.processes?.total ?? 0}
                </td>

                <td style={cellStyle}>
                  {scan.duration} sec
                </td>

                <td style={cellStyle}>
                  <button
                    style={{
                      background: "#2563EB",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          color: "#94A3B8",
          fontSize: 14,
        }}
      >
        <span>
          Showing <strong>{filteredScans.length}</strong> of{" "}
          <strong>{scans.length}</strong> scans
        </span>

        <span>
          Last Updated: {new Date().toLocaleTimeString()}
        </span>
      </div>

      {filteredScans.length === 0 && (
        <div
          style={{
            marginTop: 30,
            padding: 40,
            textAlign: "center",
            borderRadius: 20,
            background: "#111827",
            border: "1px solid rgba(56,189,248,.15)",
          }}
        >
          <div
            style={{
              fontSize: 55,
            }}
          >
            🛡️
          </div>

          <h2
            style={{
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            No Scan Results Found
          </h2>

          <p
            style={{
              color: "#94A3B8",
            }}
          >
            Try changing the search filter or run a new system scan.
          </p>
        </div>
      )}
    </div>
  );
}