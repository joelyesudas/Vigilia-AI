const prompts = [
  {
    icon: "📄",
    text: "Generate Executive Summary",
  },
  {
    icon: "🚨",
    text: "Explain Latest Threat",
  },
  {
    icon: "🎯",
    text: "Show MITRE ATT&CK Mapping",
  },
  {
    icon: "📊",
    text: "Perform Risk Assessment",
  },
  {
    icon: "🔍",
    text: "Investigate Latest Incident",
  },
  {
    icon: "📝",
    text: "Generate Incident Report",
  },
  {
    icon: "🛡️",
    text: "Recommend Security Improvements",
  },
  {
    icon: "⚡",
    text: "Summarize Recent Activity",
  },
];

export default function PromptSuggestions({ onPrompt }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 15,
        marginBottom: 25,
      }}
    >
      {prompts.map((prompt) => (
        <button
          key={prompt.text}
          onClick={() => onPrompt(prompt.text)}
          style={{
            background: "#111827",
            border: "1px solid #24324D",
            color: "white",
            padding: "18px",
            borderRadius: 16,
            cursor: "pointer",
            textAlign: "left",
            transition: "0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1E293B";
            e.currentTarget.style.border = "1px solid #3B82F6";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#111827";
            e.currentTarget.style.border = "1px solid #24324D";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div
            style={{
              fontSize: 28,
              marginBottom: 12,
            }}
          >
            {prompt.icon}
          </div>

          <div
            style={{
              fontWeight: "700",
              fontSize: 15,
              color: "white",
            }}
          >
            {prompt.text}
          </div>
        </button>
      ))}
    </div>
  );
}