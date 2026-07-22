import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 15,
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask about threats, MITRE, incidents..."
        style={{
          flex: 1,
          padding: 18,
          background: "#111827",
          color: "white",
          border: "1px solid #24324D",
          borderRadius: 15,
          outline: "none",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button
        onClick={send}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: 15,
          padding: "0 28px",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        Send
      </button>
    </div>
  );
}