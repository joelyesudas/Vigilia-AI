import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      style={{
        background:
          "linear-gradient(180deg,#081229,#0B1120)",
        border: "1px solid #24324D",
        borderRadius: 24,
        overflow: "hidden",
        marginBottom: 25,
        boxShadow:
          "0 20px 40px rgba(0,0,0,.25)",
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid #24324D",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            "rgba(15,23,42,.6)",
        }}
      >
        <div>
          <div
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            AI Conversation
          </div>

          <div
            style={{
              color: "#64748B",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Vigilia AI Security Copilot
          </div>
        </div>

        <div
          style={{
            background:
              "rgba(34,197,94,.12)",
            color: "#22C55E",
            padding: "8px 14px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          ● Online
        </div>
      </div>

      {/* Chat */}

      <div
        style={{
          padding: 25,
          minHeight: 430,
          maxHeight: "60vh",
          overflowY: "auto",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 360,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                marginBottom: 18,
              }}
            >
              🤖
            </div>

            <h2
              style={{
                color: "white",
                marginBottom: 12,
              }}
            >
              Welcome to Vigilia AI Copilot
            </h2>

            <p
              style={{
                color: "#94A3B8",
                maxWidth: 520,
                lineHeight: "30px",
              }}
            >
              Ask about threats, incidents,
              MITRE ATT&CK techniques,
              suspicious activity, attack timelines,
              or request AI-powered security recommendations.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginTop: 28,
              }}
            >
              <Suggestion text="Summarize today's threats" />
              <Suggestion text="Explain MITRE T1110" />
              <Suggestion text="Investigate this incident" />
              <Suggestion text="Generate executive summary" />
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                message={message}
              />
            ))}

            <div ref={bottomRef} />
          </>
        )}
      </div>
    </motion.div>
  );
}

function Suggestion({ text }) {
  return (
    <div
      style={{
        padding: "10px 16px",
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 999,
        color: "#CBD5E1",
        fontSize: 14,
      }}
    >
      {text}
    </div>
  );
}