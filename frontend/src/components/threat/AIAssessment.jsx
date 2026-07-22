export default function AIAssessment({ threat }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #24324D",
        borderRadius: 18,
        padding: 25,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 25,
        }}
      >
        🧠 AI Security Analyst
      </h2>

      <div
        style={{
          marginBottom: 22,
        }}
      >
        <h3
          style={{
            color: "#60A5FA",
            marginBottom: 10,
          }}
        >
          Summary
        </h3>

        <p
          style={{
            color: "#CBD5E1",
            lineHeight: "30px",
          }}
        >
          A <b>{threat?.severity || "Unknown"}</b> severity incident has been detected with a
          confidence score of <b>{threat?.confidence ?? 0}%</b>.
          The activity matches the MITRE ATT&CK technique{" "}
          <b>{threat?.mitre?.techniqueId || "N/A"}</b> (
          {threat?.mitre?.technique || "Unknown Technique"}).
        </p>
      </div>

      <hr
        style={{
          borderColor: "#24324D",
          margin: "22px 0",
        }}
      />

      <div
        style={{
          marginBottom: 22,
        }}
      >
        <h3
          style={{
            color: "#FBBF24",
            marginBottom: 10,
          }}
        >
          Potential Impact
        </h3>

        <ul
          style={{
            color: "#CBD5E1",
            lineHeight: "32px",
            paddingLeft: 20,
          }}
        >
          <li>Credential Theft</li>
          <li>Unauthorized Access</li>
          <li>Lateral Movement</li>
        </ul>
      </div>

      <hr
        style={{
          borderColor: "#24324D",
          margin: "22px 0",
        }}
      />

      <div>
        <h3
          style={{
            color: "#22C55E",
            marginBottom: 10,
          }}
        >
          Recommended Response
        </h3>

        <ul
          style={{
            color: "#CBD5E1",
            lineHeight: "32px",
            paddingLeft: 20,
          }}
        >
          <li>Lock the affected account</li>
          <li>Enable Multi-Factor Authentication</li>
          <li>Review authentication logs</li>
          <li>Monitor endpoint activity</li>
        </ul>
      </div>
    </div>
  );
}