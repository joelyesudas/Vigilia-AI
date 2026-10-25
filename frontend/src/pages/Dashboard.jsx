
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Hero from "../components/dashboard/Hero";
import EndpointStatusCard from "../components/dashboard/endpoint/EndpointStatusCard";
import { useDashboard } from "../context/DashboardContext";
import ThreatFeed from "../components/dashboard/analytics/ThreatFeed";
import ThreatChart from "../components/dashboard/analytics/ThreatChart";
import MitrePanel from "../components/dashboard/analytics/MitrePanel";
import IncidentTimeline from "../components/dashboard/analytics/IncidentTimeline";

import ExecutiveSummary from "../components/analytics/ExecutiveSummary";
import ThreatTrendChart from "../components/analytics/ThreatTrendChart";
import SeverityPieChart from "../components/analytics/SeverityPieChart";
import RecentActivity from "../components/analytics/RecentActivity";
import AICommandCenter from "../components/analytics/AICommandCenter";

import { investigateIncident } from "../services/copilotService";
import { showSuccess } from "../utils/toast";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        background: "#101826",
        border: "1px solid rgba(255,255,255,.06)",
        borderRadius: 20,
        padding: 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 120,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 14,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      <div style={{ fontSize: 34, fontWeight: 700, color }}>
        {value}
      </div>
    </motion.div>
  );
}

function AgentStatusCard({ label, value, color }) {
  return (
    <div
      style={{
        background: "#0B1729",
        border: "1px solid #233753",
        borderRadius: 12,
        padding: 16,
        minWidth: 0,
      }}
    >
      <div
        style={{
          color: "#94A3B8",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 0.7,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color,
          fontSize: 15,
          fontWeight: 700,
          marginTop: 9,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================================
   FORMATTED AI INVESTIGATION REPORT
========================================= */

function InvestigationReport({ report }) {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #080F1D, #0B1424)",
        border: "1px solid #263A57",
        borderRadius: 16,
        padding: "28px 30px",
        maxHeight: 680,
        overflowY: "auto",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,.025)",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                color: "#F8FAFC",
                fontSize: 26,
                fontWeight: 800,
                lineHeight: 1.4,
                margin: "0 0 22px",
                paddingBottom: 16,
                borderBottom: "1px solid #263A57",
              }}
            >
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2
              style={{
                color: "#7DD3FC",
                fontSize: 21,
                fontWeight: 800,
                marginTop: 30,
                marginBottom: 15,
                paddingLeft: 13,
                borderLeft: "4px solid #0EA5E9",
                lineHeight: 1.5,
              }}
            >
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3
              style={{
                color: "#C4B5FD",
                fontSize: 17,
                fontWeight: 800,
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p
              style={{
                color: "#CBD5E1",
                fontSize: 14,
                lineHeight: 1.95,
                margin: "0 0 17px",
              }}
            >
              {children}
            </p>
          ),

          strong: ({ children }) => (
            <strong
              style={{
                color: "#F8FAFC",
                fontWeight: 800,
              }}
            >
              {children}
            </strong>
          ),

          em: ({ children }) => (
            <em
              style={{
                color: "#BAE6FD",
                fontStyle: "italic",
              }}
            >
              {children}
            </em>
          ),

          ul: ({ children }) => (
            <ul
              style={{
                paddingLeft: 26,
                margin: "12px 0 22px",
              }}
            >
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol
              style={{
                paddingLeft: 28,
                margin: "12px 0 22px",
              }}
            >
              {children}
            </ol>
          ),

          li: ({ children }) => (
            <li
              style={{
                color: "#CBD5E1",
                fontSize: 14,
                lineHeight: 1.95,
                paddingLeft: 5,
                marginBottom: 9,
              }}
            >
              {children}
            </li>
          ),

          code: ({ children, className }) => (
            <code
              style={{
                color: "#7DD3FC",
                background: "#13243A",
                border: "1px solid #263A57",
                borderRadius: 5,
                padding: className ? "3px 6px" : "2px 6px",
                fontSize: 13,
                overflowWrap: "anywhere",
              }}
            >
              {children}
            </code>
          ),

          blockquote: ({ children }) => (
            <blockquote
              style={{
                margin: "20px 0",
                padding: "14px 18px",
                background: "rgba(14,165,233,.07)",
                borderLeft: "4px solid #0EA5E9",
                borderRadius: "0 9px 9px 0",
              }}
            >
              {children}
            </blockquote>
          ),

          hr: () => (
            <hr
              style={{
                border: 0,
                borderTop: "1px solid #263A57",
                margin: "26px 0",
              }}
            />
          ),

          table: ({ children }) => (
            <div style={{ overflowX: "auto", margin: "18px 0" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "#CBD5E1",
                  fontSize: 13,
                }}
              >
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th
              style={{
                textAlign: "left",
                padding: 12,
                color: "#7DD3FC",
                background: "#13243A",
                border: "1px solid #263A57",
              }}
            >
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td
              style={{
                padding: 12,
                border: "1px solid #263A57",
                lineHeight: 1.7,
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {report || "No investigation report was returned."}
      </ReactMarkdown>
    </div>
  );
}

/* =========================================
   AI AGENT INVESTIGATION PANEL
========================================= */

function AgentInvestigationPanel() {
  const [investigating, setInvestigating] = useState(false);
  const [investigation, setInvestigation] = useState(null);
  const [error, setError] = useState("");

  const handleInvestigate = async () => {
    if (investigating) return;

    setInvestigating(true);
    setError("");
    setInvestigation(null);

    try {
      const result = await investigateIncident();

      if (!result.success) {
        throw new Error(
          result.message || "Investigation was unsuccessful."
        );
      }

      setInvestigation(result);
      showSuccess("AI investigation completed.");
    } catch (err) {
      console.error("AI Agent investigation failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to investigate the latest incident."
      );
    } finally {
      setInvestigating(false);
    }
  };

  return (
    <motion.section
      {...fadeUp}
      style={{
        background:
          "linear-gradient(135deg, #0C1729 0%, #101F38 55%, #102541 100%)",
        border: "1px solid rgba(56,189,248,.2)",
        borderRadius: 22,
        padding: 26,
        color: "#E2E8F0",
        boxShadow: "0 18px 45px rgba(0,0,0,.2)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 27 }}>🤖</span>

            <h2
              style={{
                margin: 0,
                fontSize: 23,
                fontWeight: 800,
                color: "#F8FAFC",
              }}
            >
              AI Agent Investigation
            </h2>

            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#7DD3FC",
                background: "rgba(14,165,233,.12)",
                border: "1px solid rgba(56,189,248,.25)",
                padding: "5px 9px",
                borderRadius: 20,
              }}
            >
              GEMINI POWERED
            </span>
          </div>

          <p
            style={{
              color: "#94A3B8",
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 680,
              marginBottom: 0,
            }}
          >
            Investigate analyzed security logs, inspect evidence using
            AI-powered tools, and generate an incident report for SOC
            analyst review.
          </p>
        </div>

        <button
          type="button"
          onClick={handleInvestigate}
          disabled={investigating}
          style={{
            padding: "13px 20px",
            border: "none",
            borderRadius: 11,
            background: investigating
              ? "#334155"
              : "linear-gradient(135deg,#2563EB,#0284C7)",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 800,
            cursor: investigating ? "not-allowed" : "pointer",
            opacity: investigating ? 0.8 : 1,
          }}
        >
          {investigating ? "⏳ Investigating..." : "🔍 Investigate Incident"}
        </button>
      </div>

      {investigating && (
        <div
          role="status"
          style={{
            marginTop: 22,
            padding: 17,
            borderRadius: 12,
            background: "rgba(14,165,233,.08)",
            border: "1px solid rgba(56,189,248,.2)",
          }}
        >
          <strong style={{ color: "#38BDF8" }}>
            Investigation in progress
          </strong>

          <p
            style={{
              color: "#94A3B8",
              fontSize: 13,
              lineHeight: 1.7,
              marginBottom: 0,
            }}
          >
            Retrieving analyzed logs, executing available investigation
            tools, and generating the report.
          </p>
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            marginTop: 22,
            padding: 16,
            borderRadius: 12,
            background: "rgba(127,29,29,.2)",
            border: "1px solid rgba(248,113,113,.35)",
            color: "#FCA5A5",
            lineHeight: 1.7,
          }}
        >
          <strong>Investigation failed</strong>
          <div>{error}</div>
        </div>
      )}

      {investigation && (
        <div style={{ marginTop: 26 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 12,
              marginBottom: 26,
            }}
          >
            <AgentStatusCard
              label="INVESTIGATION"
              value="Completed"
              color="#4ADE80"
            />

            <AgentStatusCard
              label="INCIDENT ID"
              value={investigation.incidentId || "Not provided"}
              color="#7DD3FC"
            />

            <AgentStatusCard
              label="AGENT STEPS"
              value={investigation.stepsCompleted ?? "N/A"}
              color="#C4B5FD"
            />

            <AgentStatusCard
              label="HUMAN REVIEW"
              value={investigation.needsReview ? "Required" : "Not flagged"}
              color={investigation.needsReview ? "#FBBF24" : "#4ADE80"}
            />
          </div>

          <h3
            style={{
              color: "#F8FAFC",
              fontSize: 19,
              fontWeight: 800,
              marginBottom: 15,
            }}
          >
            📋 Investigation Report
          </h3>

          <InvestigationReport report={investigation.report} />

          <div style={{ marginTop: 28 }}>
            <h3
              style={{
                color: "#F8FAFC",
                fontSize: 19,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              🛠️ Investigation Tool Trace
            </h3>

            <p
              style={{
                color: "#94A3B8",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              Inspect the tools executed by the agent and their returned
              evidence.
            </p>

            {Array.isArray(investigation.trace) &&
            investigation.trace.length > 0 ? (
              <div style={{ display: "grid", gap: 12 }}>
                {investigation.trace.map((item, index) => (
                  <div
                    key={`${item.tool || "tool"}-${index}`}
                    style={{
                      padding: 16,
                      background: "#0B1729",
                      border: "1px solid #233753",
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <strong
                        style={{
                          color: "#E2E8F0",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {item.tool || "Unknown tool"}
                      </strong>

                      <span
                        style={{
                          color:
                            item.status === "completed"
                              ? "#86EFAC"
                              : "#FCA5A5",
                          fontSize: 11,
                          fontWeight: 800,
                        }}
                      >
                        {(item.status || "unknown").toUpperCase()}
                      </span>
                    </div>

                    {item.message && (
                      <p
                        style={{
                          color: "#CBD5E1",
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        {item.message}
                      </p>
                    )}

                    {item.result !== undefined && (
                      <details style={{ marginTop: 12 }}>
                        <summary
                          style={{
                            color: "#38BDF8",
                            cursor: "pointer",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          View execution results
                        </summary>

                        <pre
                          style={{
                            marginTop: 12,
                            padding: 14,
                            borderRadius: 9,
                            background: "#050B15",
                            color: "#CBD5E1",
                            whiteSpace: "pre-wrap",
                            overflowWrap: "anywhere",
                            overflowX: "auto",
                            fontSize: 12,
                            lineHeight: 1.7,
                          }}
                        >
                          {JSON.stringify(item.result, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "#94A3B8" }}>
                No tool execution details were returned.
              </p>
            )}
          </div>

          <div
            style={{
              marginTop: 24,
              padding: 16,
              background: "rgba(245,158,11,.07)",
              border: "1px solid rgba(245,158,11,.2)",
              borderRadius: 12,
            }}
          >
            <strong style={{ color: "#FBBF24", fontSize: 13 }}>
              ⚠️ Analyst Review
            </strong>

            <p
              style={{
                color: "#94A3B8",
                fontSize: 12,
                lineHeight: 1.7,
                marginBottom: 0,
              }}
            >
              Verify findings against the original security logs before
              taking defensive action. This agent recommends actions but
              does not execute incident response actions.
            </p>

            <button
              type="button"
              onClick={handleInvestigate}
              disabled={investigating}
              style={{
                marginTop: 15,
                background: "#172554",
                border: "1px solid #1D4ED8",
                color: "#BFDBFE",
                borderRadius: 9,
                padding: "10px 14px",
                fontWeight: 700,
                cursor: investigating ? "not-allowed" : "pointer",
              }}
            >
              Run Investigation Again
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
}

/* =========================================
   MAIN DASHBOARD
========================================= */

export default function Dashboard() {
  const { summary, analysisSource } = useDashboard();

  const hasData = analysisSource !== null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 24,
        paddingBottom: 30,
      }}
    >
      {/* Enterprise Hero */}
      <motion.section
        {...fadeUp}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg,#0c1729 0%,#101f38 50%,#132746 100%)",
            border: "1px solid rgba(80,150,255,.18)",
            borderRadius: 28,
            padding: 30,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 60px rgba(0,0,0,.35)",
          }}
        >
          <Hero />
        </div>

        {/* KPI + Endpoint */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,minmax(0,1fr))",
            gap: 18,
          }}
        >
          <StatCard
            title="Security Score"
            value={hasData ? `${summary.securityScore}%` : "—"}
            color="#36d399"
          />

          <StatCard
            title="Threats"
            value={hasData ? summary.totalThreats : "0"}
            color="#ff6b6b"
          />

          <StatCard
            title="Events"
            value={hasData ? summary.totalEvents ?? "—" : "—"}
            color="#60a5fa"
          />

          <StatCard
            title="Analysis Source"
            value={
              analysisSource === "scan"
                ? "System"
                : analysisSource === "upload"
                  ? "Log"
                  : "—"
            }
            color="#a78bfa"
          />

          <EndpointStatusCard />
        </div>
      </motion.section>

      {/* AI Agent Investigation */}
      <AgentInvestigationPanel />

      {/* AI + Executive Summary */}
      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <AICommandCenter />
        <ExecutiveSummary />
      </motion.div>

      {/* Threat Analytics */}
      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <ThreatTrendChart />
        <SeverityPieChart />
      </motion.div>

      {/* Threat Feed */}
      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <ThreatFeed />
        <ThreatChart />
      </motion.div>

      {/* MITRE + Timeline */}
      <motion.div
        {...fadeUp}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <MitrePanel />
        <IncidentTimeline />
      </motion.div>

      {/* Recent Activity */}
      <motion.div {...fadeUp}>
        <RecentActivity />
      </motion.div>
    </motion.div>
  );
}
