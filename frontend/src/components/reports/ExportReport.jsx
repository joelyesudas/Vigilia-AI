import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { showInfo, showSuccess } from "../../utils/toast";
import { useMonitoring } from "../../context/MonitoringContext";
export default function ExportReport() {
  const { summary, threats } = useMonitoring();
  showInfo("Generating enterprise security report...");
  const generatePDF = () => {
    const doc = new jsPDF();

    // ===== Header =====
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 28, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Vigilia AI", 14, 16);

    doc.setFontSize(11);
    doc.text("Enterprise Cyber Threat Investigation Report", 14, 23);

    // ===== Title =====
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("Executive Security Summary", 14, 42);

    doc.setFontSize(11);
    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      50
    );

    // ===== Summary Table =====
    autoTable(doc, {
      startY: 58,
      head: [["Metric", "Value"]],
      body: [
  [
    "Security Score",
    `${summary?.securityScore ?? 100}%`,
  ],
  [
    "Threat Level",
    summary?.riskLevel ?? "Safe",
  ],
  [
    "Threats Detected",
    `${summary?.totalThreats ?? 0}`,
  ],
  [
    "Critical Threats",
    `${summary?.criticalThreats ?? 0}`,
  ],
  [
    "AI Confidence",
    `${summary?.aiConfidence ?? 100}%`,
  ],
],
      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    // ===== Threats =====
    doc.setFontSize(16);
    doc.text("Detected Threats", 14, doc.lastAutoTable.finalY + 15);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Threat", "Severity", "Status"]],
      body:
  threats?.length > 0
    ? threats.map((t) => [
        t.title,
        t.severity,
        "Detected",
      ])
    : [["No Threats", "-", "-"]],
      headStyles: {
        fillColor: [220, 38, 38],
      },
    });

    // ===== MITRE =====
    doc.setFontSize(16);
    doc.text(
      "MITRE ATT&CK Mapping",
      14,
      doc.lastAutoTable.finalY + 15
    );

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Technique", "Tactic"]],
      body:
  threats?.length > 0
    ? threats.map((t) => [
        t.mitreTechnique || "-",
        t.title,
      ])
    : [["-", "-"]],
      headStyles: {
        fillColor: [16, 185, 129],
      },
    });

    // ===== AI =====
    doc.setFontSize(16);
    doc.text(
      "AI Recommendations",
      14,
      doc.lastAutoTable.finalY + 15
    );

    doc.setFontSize(11);

    const recommendations = [];

if (summary?.criticalThreats > 0)
  recommendations.push(
    "• Immediately investigate all critical threats."
  );

if (summary?.totalThreats > 0)
  recommendations.push(
    "• Review detected threats and affected assets."
  );

if (summary?.securityScore < 70)
  recommendations.push(
    "• Improve security posture and reduce attack surface."
  );

if (
  recommendations.length === 0
)
  recommendations.push(
    "• No immediate threats detected. Continue continuous monitoring."
  );

    let y = doc.lastAutoTable.finalY + 25;

    recommendations.forEach((item) => {
      doc.text(item, 18, y);
      y += 8;
    });

    // ===== Footer =====
    doc.setDrawColor(220);
    doc.line(14, 280, 196, 280);

    doc.setFontSize(10);
    doc.setTextColor(120);

    doc.text(
      "Generated automatically by Vigilia AI Enterprise Cyber Defense Platform",
      14,
      287
    );
showSuccess("PDF report generated successfully.");
    doc.save("Vigilia_AI_Report.pdf");
  };

  return (
  <div
    style={{
      background: "linear-gradient(180deg,#111827,#0F172A)",
      border: "1px solid #24324D",
      borderRadius: 24,
      padding: 30,
      boxShadow: "0 20px 40px rgba(0,0,0,.20)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 25,
      }}
    >
      {/* Left */}

      <div
        style={{
          flex: 1,
          minWidth: 260,
        }}
      >
        <div
          style={{
            color: "#60A5FA",
            fontWeight: 700,
            marginBottom: 12,
            fontSize: 16,
          }}
        >
          📄 Export Executive Report
        </div>

        <h2
          style={{
            color: "white",
            margin: 0,
            fontSize: 30,
          }}
        >
          Generate Professional SOC Report
        </h2>

        <p
          style={{
            color: "#94A3B8",
            lineHeight: "30px",
            marginTop: 16,
            maxWidth: 700,
          }}
        >
          Export a professionally formatted PDF containing
          executive summaries, detected threats, MITRE ATT&CK
          mappings, AI recommendations, and security metrics
          suitable for management and SOC reporting.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginTop: 22,
          }}
        >
          <Chip text="Executive Summary" />
          <Chip text="MITRE ATT&CK" />
          <Chip text="Threat Report" />
          <Chip text="AI Recommendations" />
        </div>
      </div>

      {/* Right */}

      <div
        style={{
          minWidth: 250,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={generatePDF}
          style={{
            background:
              "linear-gradient(135deg,#2563EB,#1D4ED8)",
            color: "white",
            border: "none",
            padding: "18px 34px",
            borderRadius: 18,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 16,
            boxShadow:
              "0 15px 35px rgba(37,99,235,.25)",
            transition: ".25s",
          }}
        >
          📥 Download PDF Report
        </button>
      </div>
    </div>
  </div>
);

function Chip({ text }) {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: 999,
        border: "1px solid #24324D",
        background: "#0B1120",
        color: "#CBD5E1",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
} }