import { motion } from "framer-motion";

export default function ReportsHero() {
  const stats = [
    {
      title: "Security Score",
      value: "91",
      color: "#22C55E",
      progress: "91%",
    },
    {
      title: "Risk Level",
      value: "LOW",
      color: "#3B82F6",
      progress: "78%",
    },
    {
      title: "Reports Generated",
      value: "146",
      color: "#F59E0B",
      progress: "86%",
    },
    {
      title: "AI Accuracy",
      value: "98%",
      color: "#A855F7",
      progress: "98%",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020617,#081229,#0F172A)",
        border: "1px solid #1E3A5F",
        borderRadius: 30,
        padding: 45,
      }}
    >
      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#2563EB",
          opacity: 0.08,
          filter: "blur(90px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 40,
          alignItems: "center",
        }}
      >
        {/* Left */}

        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(37,99,235,.12)",
              color: "#60A5FA",
              fontWeight: 700,
              marginBottom: 24,
            }}
          >
            📄 Executive Security Reports
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 54,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Executive
            <br />
            Security Reports
          </h1>

          <p
            style={{
              color: "#94A3B8",
              fontSize: 18,
              lineHeight: "34px",
              maxWidth: 720,
              marginTop: 24,
            }}
          >
            Generate professional executive reports with AI-powered
            security insights, attack trends, MITRE ATT&CK coverage,
            incident summaries, and actionable recommendations for
            stakeholders.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginTop: 32,
            }}
          >
            <button style={primaryButton}>
              📊 Generate Report
            </button>

            <button style={secondaryButton}>
              📄 Download PDF
            </button>
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {stats.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              style={{
                background: "rgba(15,23,42,.75)",
                border: "1px solid #24324D",
                borderRadius: 18,
                padding: 18,
              }}
            >
              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 14,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  color: item.color,
                  fontSize: 34,
                  fontWeight: 800,
                  marginTop: 10,
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  height: 6,
                  borderRadius: 999,
                  background: "#1E293B",
                  marginTop: 14,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.progress }}
                  transition={{ duration: 1 }}
                  style={{
                    height: "100%",
                    background: item.color,
                    borderRadius: 999,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const primaryButton = {
  background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
  color: "white",
  border: "none",
  padding: "14px 28px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15,
  boxShadow: "0 15px 30px rgba(37,99,235,.25)",
};

const secondaryButton = {
  background: "transparent",
  color: "white",
  border: "1px solid #F59E0B",
  padding: "14px 28px",
  borderRadius: 14,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 15,
};