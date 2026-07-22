import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { showSuccess } from "../utils/toast";

import CopilotHero from "../components/copilot/CopilotHero";
import PromptSuggestions from "../components/copilot/PromptSuggestions";
import ChatWindow from "../components/copilot/ChatWindow";
import MessageInput from "../components/copilot/MessageInput";

import { askCopilot } from "../services/copilotService";

export default function Copilot() {
  const location = useLocation();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clear Conversation
  const clearChat = () => {
    setMessages([]);
    showSuccess("Conversation cleared.");
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Add user message
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

      // Add empty assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "",
        },
      ]);

      const response = data.response;

      let current = "";

      for (let i = 0; i < response.length; i++) {
        current += response[i];

        await new Promise((resolve) =>
          setTimeout(resolve, 8)
        );

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
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Unable to connect to the AI Copilot.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-send prompt when arriving from AI Command Center
  useEffect(() => {
    if (location.state?.prompt) {
      handleSend(location.state.prompt);

      // Clear state so it doesn't trigger again
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

      <div
        style={{
          marginTop: 30,
        }}
      >
        <PromptSuggestions onPrompt={handleSend} />
      </div>

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
          🗑 Clear Conversation
        </button>
      </div>

      <div
        style={{
          marginTop: 10,
        }}
      >
        <ChatWindow messages={messages} />
      </div>

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
              background:
                "linear-gradient(135deg,#111827,#0F172A)",
              border: "1px solid #24324D",
              borderRadius: 18,
              padding: "18px 24px",
              color: "#38BDF8",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow:
                "0 15px 35px rgba(56,189,248,.12)",
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
              <div
                style={{
                  fontWeight: 700,
                }}
              >
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
              @keyframes pulse{
                0%{opacity:.2;transform:scale(.8);}
                50%{opacity:1;transform:scale(1);}
                100%{opacity:.2;transform:scale(.8);}
              }
            `}
          </style>
        </div>
      )}

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