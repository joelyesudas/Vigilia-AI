import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { showSuccess } from "../utils/toast";

import CopilotHero from "../components/copilot/CopilotHero";
import PromptSuggestions from "../components/copilot/PromptSuggestions";
import ChatWindow from "../components/copilot/ChatWindow";
import MessageInput from "../components/copilot/MessageInput";

import {
  askCopilot,
  investigateIncident,
} from "../services/copilotService";

export default function Copilot() {
  const location = useLocation();

  // Existing Copilot chat state
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // AI Agent investigation state
  const [investigating, setInvestigating] = useState(false);
  const [investigation, setInvestigation] = useState(null);
  const [investigationError, setInvestigationError] = useState("");

  // Clear conversation
  const clearChat = () => {
    setMessages([]);
    showSuccess("Conversation cleared.");
  };

  // Existing Gemini Copilot chat
  const handleSend = async (text) => {
    if (!text?.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    try {
      setLoading(true);

      const data = await askCopilot(text);
      const response = data.response || "";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "",
        },
      ]);

      let current = "";

      for (let i = 0; i < response.length; i++) {
        current += response[i];

        await new Promise((resolve) => setTimeout(resolve, 8));

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            text: current,
          };

          return updated;
        });
      }
    } catch (err) {
      console.error("Copilot error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to connect to the AI Copilot. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // AI Agent investigation
  const handleInvestigate = async () => {
    if (investigating) return;

    try {
      setInvestigating(true);
      setInvestigationError("");
      setInvestigation(null);

      const result = await investigateIncident();

      setInvestigation(result);

      showSuccess("AI incident investigation completed.");
    } catch (err) {
      console.error("AI Agent investigation error:", err);

      setInvestigationError(
        err.message || "Unable to investigate the incident."
      );
    } finally {
      setInvestigating(false);
    }
  };

  // Auto-send prompt from AI Command Center
  useEffect(() => {
    if (location.state?.prompt) {
      handleSend(location.state.prompt);

      window.history.replaceState({}, document.title);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "radial-gradient(circle at top right, rgba(59,130,246,.08), transparent 35%), radial-gradient(circle at bottom left, rgba(168,85,247,.08), transparent 35%)",
      }}
    >
      <CopilotHero />

      {/* ================================================== */}
      {/* AI AGENT INVESTIGATION PANEL                       */}
      {/* ================================================== */}

      <section
        style={{
          marginTop: 30,
          padding: 24,
          background: "linear-gradient(135deg, #111827, #0F172A)",
          border: "1px solid #334155",
          borderRadius: 18,
          color: "#E2E8F0",
          boxShadow: "0 12px 35px rgba(0,0,0,.15)",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 23,
                  color: "#38BDF8",
                }}
              >
                AI Agent Investigation
              </h2>

              <span
                style={{
                  padding: "5px 9px",
                  borderRadius: 7,
                  background: "#082F49",
                  color: "#7DD3FC",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                TOOL-ENABLED AI
              </span>
            </div>

            <p
              style={{
                color: "#94A3B8",
                marginBottom: 0,
                lineHeight: 1.6,
              }}
            >
              Investigate the latest analyzed security logs using
              Gemini-powered investigation tools.
            </p>
          </div>

          <button
            onClick={handleInvestigate}
            disabled={investigating}
            style={{
              background: investigating ? "#334155" : "#0284C7",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 10,
              padding: "13px 19px",
              fontWeight: 700,
              cursor: investigating ? "not-allowed" : "pointer",
              opacity: investigating ? 0.8 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {investigating
              ? "Investigating..."
              : "Investigate Incident"}
          </button>
        </div>

        {/* Investigation loading state */}
        {investigating && (
          <div
            style={{
              marginTop: 24,
              padding: 18,
              borderRadius: 12,
              background: "#0C1D32",
              border: "1px solid #164E63",
            }}
          >
            <div
              style={{
                color: "#38BDF8",
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Investigation in progress
            </div>

            <div
              style={{
                color: "#94A3B8",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              Retrieving analyzed logs, executing available
              investigation tools, and generating the incident report.
            </div>
          </div>
        )}

        {/* Investigation error */}
        {investigationError && (
          <div
            role="alert"
            style={{
              marginTop: 20,
              padding: 15,
              borderRadius: 10,
              background: "#450A0A",
              border: "1px solid #991B1B",
              color: "#FCA5A5",
              lineHeight: 1.6,
            }}
          >
            <strong>Investigation failed</strong>
            <div>{investigationError}</div>
          </div>
        )}

        {/* Investigation results */}
        {investigation && (
          <div style={{ marginTop: 28 }}>
            {/* Result status cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(170px, 1fr))",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div style={statusCardStyle}>
                <div style={labelStyle}>INVESTIGATION STATUS</div>

                <div
                  style={{
                    color: investigation.success
                      ? "#86EFAC"
                      : "#FCA5A5",
                    fontSize: 17,
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  {investigation.success ? "Completed" : "Failed"}
                </div>
              </div>

              <div style={statusCardStyle}>
                <div style={labelStyle}>INCIDENT ID</div>

                <div
                  style={{
                    color: "#E2E8F0",
                    fontSize: 13,
                    overflowWrap: "anywhere",
                    marginTop: 8,
                  }}
                >
                  {investigation.incidentId || "Not provided"}
                </div>
              </div>

              <div style={statusCardStyle}>
                <div style={labelStyle}>AGENT STEPS</div>

                <div
                  style={{
                    color: "#38BDF8",
                    fontSize: 22,
                    fontWeight: 700,
                    marginTop: 5,
                  }}
                >
                  {investigation.stepsCompleted ?? "N/A"}
                </div>
              </div>

              <div style={statusCardStyle}>
                <div style={labelStyle}>HUMAN REVIEW</div>

                <div
                  style={{
                    color: investigation.needsReview
                      ? "#FCD34D"
                      : "#86EFAC",
                    fontSize: 15,
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  {investigation.needsReview
                    ? "Required"
                    : "Not flagged"}
                </div>
              </div>
            </div>

            {/* AI report */}
            <div style={{ marginBottom: 28 }}>
              <h3 style={sectionHeadingStyle}>
                Investigation Report
              </h3>

              <div
                style={{
                  background: "#020617",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  padding: 20,
                  color: "#CBD5E1",
                  lineHeight: 1.8,
                  overflowWrap: "anywhere",
                }}
              >
                {investigation.report ? (
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                      fontFamily: "inherit",
                      fontSize: 14,
                      margin: 0,
                    }}
                  >
                    {investigation.report}
                  </pre>
                ) : (
                  "The agent did not return an investigation report."
                )}
              </div>
            </div>

            {/* Tool execution trace */}
            <div>
              <h3 style={sectionHeadingStyle}>
                Investigation Tool Trace
              </h3>

              <p
                style={{
                  color: "#94A3B8",
                  fontSize: 13,
                  lineHeight: 1.6,
                  marginTop: -5,
                }}
              >
                Review which investigation tools executed and inspect
                the results returned by each tool.
              </p>

              {Array.isArray(investigation.trace) &&
              investigation.trace.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gap: 12,
                  }}
                >
                  {investigation.trace.map((item, index) => (
                    <div
                      key={`${item.tool || "tool"}-${index}`}
                      style={{
                        padding: 16,
                        borderRadius: 11,
                        background: "#0F172A",
                        border: "1px solid #334155",
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
                            padding: "5px 9px",
                            borderRadius: 7,
                            background:
                              item.status === "completed"
                                ? "#052E16"
                                : "#450A0A",
                            color:
                              item.status === "completed"
                                ? "#86EFAC"
                                : "#FCA5A5",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          {item.status || "Unknown"}
                        </span>
                      </div>

                      {item.message && (
                        <p
                          style={{
                            color: "#CBD5E1",
                            fontSize: 13,
                            lineHeight: 1.6,
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
                              fontWeight: 600,
                            }}
                          >
                            View tool results
                          </summary>

                          <pre
                            style={{
                              marginTop: 12,
                              padding: 12,
                              background: "#020617",
                              borderRadius: 8,
                              color: "#CBD5E1",
                              whiteSpace: "pre-wrap",
                              overflowWrap: "anywhere",
                              fontSize: 12,
                              lineHeight: 1.6,
                              overflowX: "auto",
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
                <div
                  style={{
                    background: "#0F172A",
                    border: "1px solid #334155",
                    padding: 16,
                    borderRadius: 10,
                    color: "#94A3B8",
                  }}
                >
                  No tool execution details were returned.
                </div>
              )}
            </div>

            {/* Run again */}
            <button
              onClick={handleInvestigate}
              disabled={investigating}
              style={{
                marginTop: 24,
                background: "#1E293B",
                color: "#7DD3FC",
                border: "1px solid #0369A1",
                borderRadius: 9,
                padding: "10px 16px",
                fontWeight: 600,
                cursor: investigating ? "not-allowed" : "pointer",
              }}
            >
              Run Investigation Again
            </button>
          </div>
        )}
      </section>

      {/* ================================================== */}
      {/* EXISTING GEMINI COPILOT CHAT                       */}
      {/* ================================================== */}

      <div style={{ marginTop: 30 }}>
        <PromptSuggestions onPrompt={handleSend} />
      </div>

      {/* Clear conversation */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 25,
          marginBottom: 15,
        }}
      >
        <button
          onClick={clearChat}
          style={{
            background: "#DC2626",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Clear Conversation
        </button>
      </div>

      {/* Chat messages */}
      <div style={{ marginTop: 10 }}>
        <ChatWindow messages={messages} />
      </div>

      {/* Chat loading indicator */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg,#111827,#0F172A)",
              border: "1px solid #24324D",
              borderRadius: 18,
              padding: "18px 24px",
              color: "#38BDF8",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 15px 35px rgba(56,189,248,.12)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                background: "#38BDF8",
                borderRadius: "50%",
                animation: "pulse 1s infinite",
              }}
            />

            <div>
              <div style={{ fontWeight: 700 }}>
                Vigilia AI Copilot
              </div>

              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                }}
              >
                Analyzing telemetry...
              </div>
            </div>
          </div>

          <style>
            {`
              @keyframes pulse {
                0% { opacity: .2; transform: scale(.8); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: .2; transform: scale(.8); }
              }
            `}
          </style>
        </div>
      )}

      {/* Chat input */}
      <div
        style={{
          position: "sticky",
          bottom: 20,
          marginTop: 25,
        }}
      >
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

const statusCardStyle = {
  background: "#0F172A",
  border: "1px solid #334155",
  borderRadius: 11,
  padding: 15,
  minWidth: 0,
};

const labelStyle = {
  color: "#94A3B8",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 0.8,
};

const sectionHeadingStyle = {
  color: "#E2E8F0",
  fontSize: 18,
  marginBottom: 14,
};
