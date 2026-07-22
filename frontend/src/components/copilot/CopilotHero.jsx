import { motion } from "framer-motion";

export default function CopilotHero() {
  const stats = [
    {
      title: "AI Accuracy",
      value: "98%",
      color: "#3B82F6",
      progress: "98%",
    },
    {
      title: "Threats Explained",
      value: "2.4K",
      color: "#EF4444",
      progress: "82%",
    },
    {
      title: "Avg Response",
      value: "0.8s",
      color: "#22C55E",
      progress: "92%",
    },
    {
      title: "MITRE Knowledge",
      value: "100%",
      color: "#A855F7",
      progress: "100%",
    },
  ];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .5,
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020617,#081229,#0F172A)",
        border: "1px solid #1E3A5F",
        borderRadius: 30,
        padding: 45,
        marginBottom: 35,
      }}
    >
      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          right: -100,
          top: -100,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#2563EB",
          opacity: .08,
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
            🤖 Enterprise AI Security Copilot
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 54,
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Ask Anything About
            <br />
            Your Security
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
            Analyze threats, explain MITRE ATT&CK techniques,
            summarize incidents, investigate suspicious activity,
            and receive AI-powered recommendations in real time.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 30,
            }}
          >
            <Chip text="Threat Analysis" />
            <Chip text="MITRE ATT&CK" />
            <Chip text="Incident Summary" />
            <Chip text="AI Recommendations" />
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
                background:
                  "rgba(15,23,42,.75)",
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
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: item.progress,
                  }}
                  transition={{
                    duration: 1,
                  }}
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

function Chip({ text }) {
  return (
    <div
      style={{
        padding: "10px 18px",
        borderRadius: 999,
        border: "1px solid #24324D",
        background: "#111827",
        color: "#CBD5E1",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
}