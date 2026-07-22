import { motion } from "framer-motion";
import { showInfo } from "../../utils/toast";
const stats = [
  {
    title: "Active Incidents",
    value: "12",
    color: "#EF4444",
  },
  {
    title: "Contained",
    value: "8",
    color: "#22C55E",
  },
  {
    title: "MTTR",
    value: "18m",
    color: "#38BDF8",
  },
  {
    title: "AI Response",
    value: "98%",
    color: "#A855F7",
  },
];

export default function IncidentHero() {
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
        duration: 0.5,
      }}
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
      {/* Glow */}

      <div
        style={{
          position: "absolute",
          top: -140,
          right: -140,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "#EF4444",
          opacity: .12,
          filter: "blur(120px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -120,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "#2563EB",
          opacity: .12,
          filter: "blur(100px)",
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

        <div
          style={{
            flex: 2,
            minWidth: 340,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(239,68,68,.12)",
              color: "#EF4444",
              fontWeight: 700,
              marginBottom: 22,
            }}
          >
            🚨 Live Incident Response
          </div>

          <h1
            style={{
              color: "white",
              fontSize: 48,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Security Incident Center
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
            Coordinate incident response, isolate compromised
            endpoints, assign investigations, monitor containment,
            and accelerate recovery using AI-assisted workflows.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
  }}
  whileTap={{
    scale: .97,
  }}
  onClick={() => {
    showInfo("Scrolling to active incidents...");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }}
  style={{
    background:
      "linear-gradient(135deg,#DC2626,#EF4444)",
    color: "white",
    border: "none",
    borderRadius: 14,
    padding: "14px 26px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow:
      "0 12px 28px rgba(239,68,68,.35)",
  }}
>
  View Active Incidents
</motion.button>

            <motion.button
  whileHover={{
    scale: 1.05,
    y: -2,
  }}
  whileTap={{
    scale: .97,
  }}
  onClick={() => {
    showInfo("📘 Response Playbooks module coming soon.");
  }}
  style={{
    background: "transparent",
    color: "#CBD5E1",
    border: "1px solid #334155",
    borderRadius: 14,
    padding: "14px 26px",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  Response Playbooks
</motion.button>
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            flex: 1,
            minWidth: 330,
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
                boxShadow:
                  "0 10px 30px rgba(0,0,0,.25)",
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
                  color: item.color,
                  fontSize: 34,
                  fontWeight: 800,
                  marginTop: 12,
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  marginTop: 14,
                  height: 6,
                  background: "#1E293B",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "85%",
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