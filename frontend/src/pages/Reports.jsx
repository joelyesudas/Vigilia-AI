import ReportsHero from "../components/reports/ReportsHero";
import ReportStats from "../components/reports/ReportStats";
import ThreatSummary from "../components/reports/ThreatSummary";
import ExportReport from "../components/reports/ExportReport";

export default function Reports() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        background:
          "radial-gradient(circle at top right, rgba(59,130,246,.08), transparent 35%), radial-gradient(circle at bottom left, rgba(168,85,247,.08), transparent 35%)",
      }}
    >
      <ReportsHero />

      <div
        style={{
          marginTop: 30,
        }}
      >
        <ReportStats />
      </div>

      <div
        style={{
          marginTop: 30,
        }}
      >
        <ThreatSummary />
      </div>

      <div
        style={{
          marginTop: 30,
          marginBottom: 40,
        }}
      >
        <ExportReport />
      </div>
    </div>
  );
}