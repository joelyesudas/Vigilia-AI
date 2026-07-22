import { useState, useEffect } from "react";
import { showSuccess } from "../../utils/toast";

export default function AISettings() {
  const [copilot, setCopilot] = useState(
    JSON.parse(localStorage.getItem("ai_copilot") ?? "true")
  );

  const [summary, setSummary] = useState(
    JSON.parse(localStorage.getItem("ai_summary") ?? "true")
  );

  const [recommend, setRecommend] = useState(
    JSON.parse(localStorage.getItem("ai_recommend") ?? "true")
  );

  useEffect(() => {
    localStorage.setItem("ai_copilot", JSON.stringify(copilot));
  }, [copilot]);

  useEffect(() => {
    localStorage.setItem("ai_summary", JSON.stringify(summary));
  }, [summary]);

  useEffect(() => {
    localStorage.setItem("ai_recommend", JSON.stringify(recommend));
  }, [recommend]);

  const toggle = (setter, value, label) => {
    setter(!value);
    showSuccess(`${label} ${value ? "disabled" : "enabled"}.`);
  };

  const Row = ({ label, value, onChange }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        color: "white",
      }}
    >
      <span>{label}</span>

      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        style={{
          width: 18,
          height: 18,
          cursor: "pointer",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        background: "#111827",
        padding: 30,
        borderRadius: 20,
        border: "1px solid #24324D",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        🤖 AI Settings
      </h2>

      <Row
        label="Enable AI Copilot"
        value={copilot}
        onChange={() =>
          toggle(setCopilot, copilot, "AI Copilot")
        }
      />

      <Row
        label="Automatic Incident Summary"
        value={summary}
        onChange={() =>
          toggle(
            setSummary,
            summary,
            "Automatic Incident Summary"
          )
        }
      />

      <Row
        label="AI Recommendations"
        value={recommend}
        onChange={() =>
          toggle(
            setRecommend,
            recommend,
            "AI Recommendations"
          )
        }
      />
    </div>
  );
}