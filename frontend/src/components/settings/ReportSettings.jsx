import { useState } from "react";
import { showSuccess } from "../../utils/toast";

export default function ReportSettings() {
  const [company, setCompany] = useState(
    localStorage.getItem("company") || "Vigilia AI"
  );

  const [analyst, setAnalyst] = useState(
    localStorage.getItem("analyst") || "Joel Yesudas"
  );

  const [format, setFormat] = useState(
    localStorage.getItem("format") || "PDF"
  );

  const save = () => {
    localStorage.setItem("company", company);
    localStorage.setItem("analyst", analyst);
    localStorage.setItem("format", format);

    showSuccess("Report settings saved successfully.");
  };

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 20,
        padding: 30,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        📄 Report Settings
      </h2>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        <input
          value={company}
          placeholder="Company Name"
          onChange={(e) => setCompany(e.target.value)}
          style={input}
        />

        <input
          value={analyst}
          placeholder="Security Analyst"
          onChange={(e) => setAnalyst(e.target.value)}
          style={input}
        />

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={input}
        >
          <option>PDF</option>
          <option>DOCX</option>
          <option>CSV</option>
        </select>

        <button
          onClick={save}
          style={button}
        >
          💾 Save Report Settings
        </button>
      </div>
    </div>
  );
}

const input = {
  background: "#0F172A",
  color: "white",
  border: "1px solid #24324D",
  borderRadius: 12,
  padding: "15px",
  outline: "none",
};

const button = {
  background: "#2563EB",
  color: "white",
  border: "none",
  padding: "15px",
  borderRadius: 12,
  fontWeight: "700",
  cursor: "pointer",
};