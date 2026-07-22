import { motion } from "framer-motion";

const stats = [
  {
    title: "Security Score",
    value: "92",
    color: "#22C55E",
    suffix: "/100",
  },
  {
    title: "Open Threats",
    value: "18",
    color: "#EF4444",
  },
  {
    title: "Critical",
    value: "4",
    color: "#F97316",
  },
  {
    title: "AI Confidence",
    value: "97%",
    color: "#38BDF8",
  },
];

export default function ThreatHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#020617 0%,#081229 45%,#0F172A 100%)",
        border: "1px solid #22324A",
        borderRadius: 28,
        padding: 42,
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
          filter: "blur(110px)",
          opacity: 0.15,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -80,
          bottom: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "#06B6D4",
          filter: "blur(90px)",
          opacity: 0.08,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Left */}

        <div style={{ flex: 2, minWidth: 320 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(56,189,248,.12)",
              color: "#38BDF8",
              fontWeight: 700,
              fontSize: 14,
              marginBottom: 22,
            }}
          >
            🤖 AI Investigation Engine Active
            <div
  style={{
    display: "flex",
    gap: 12,
    marginTop: 16,
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      background: "rgba(34,197,94,.15)",
      color: "#22C55E",
      padding: "8px 16px",
      borderRadius: 999,
      fontWeight: 700,
      fontSize: 13,
      border: "1px solid rgba(34,197,94,.25)",
    }}
  >
    ● Live Analysis
  </div>

  <div
    style={{
      background: "rgba(59,130,246,.15)",
      color: "#60A5FA",
      padding: "8px 16px",
      borderRadius: 999,
      fontWeight: 700,
      fontSize: 13,
      border: "1px solid rgba(59,130,246,.25)",
    }}
  >
    MITRE Synced
  </div>

  <div
    style={{
      background: "rgba(249,115,22,.15)",
      color: "#FB923C",
      padding: "8px 16px",
      borderRadius: 999,
      fontWeight: 700,
      fontSize: 13,
      border: "1px solid rgba(249,115,22,.25)",
    }}
  >
    SOC Active
  </div>
</div>
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 48,
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 760,
            }}
          >
            AI Threat Investigation Center
          </h1>

          <p
            style={{
              color: "#94A3B8",
              fontSize: 18,
              lineHeight: "32px",
              marginTop: 22,
              maxWidth: 760,
            }}
          >
            Investigate AI-detected threats, analyze MITRE ATT&CK
            mappings, inspect suspicious events, understand attack
            behavior, and receive intelligent remediation guidance
            from Vigilia AI.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "#2563EB",
                color: "white",
                border: "none",
                padding: "14px 24px",
                borderRadius: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Start Investigation
            </button>

            <button
              style={{
                background: "transparent",
                color: "#CBD5E1",
                border: "1px solid #2E3F5B",
                padding: "14px 24px",
                borderRadius: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              View MITRE ATT&CK
            </button>
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            flex: 1,
            minWidth: 320,
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 18,
          }}
        >
          {stats.map((item) => (
            <motion.div
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              key={item.title}
              style={{
                background: "rgba(15,23,42,.72)",
                border: "1px solid #22324A",
                borderRadius: 18,
                padding: 20,
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  color: "#94A3B8",
                  fontSize: 13,
                }}
              >
                {item.title}
              </div>

              <div
                style={{
                  marginTop: 12,
                  color: item.color,
                  fontSize: 34,
                  fontWeight: 800,
                }}
              >
                {item.value}

                {item.suffix && (
                  <span
                    style={{
                      color: "#94A3B8",
                      fontSize: 18,
                      marginLeft: 4,
                    }}
                  >
                    {item.suffix}
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 14,
                  height: 6,
                  borderRadius: 999,
                  background: "#1E293B",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "82%",
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