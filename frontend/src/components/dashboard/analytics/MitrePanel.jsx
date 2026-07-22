import { useDashboard } from "../../../context/DashboardContext";

export default function MitrePanel() {
  const { threats } = useDashboard();

const uniqueThreats = threats.filter(
  (threat) => threat?.mitre?.techniqueId
).filter(
  (threat, index, self) =>
    index ===
    self.findIndex(
      (t) => t?.mitre?.techniqueId === threat?.mitre?.techniqueId
    )
);

  const severityColor = (severity) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "#EF4444";
      case "HIGH":
        return "#F97316";
      case "MEDIUM":
        return "#FACC15";
      default:
        return "#22C55E";
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg,#111827,#0B1220)",
        border: "1px solid #23324A",
        borderRadius: 20,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            🛡 MITRE ATT&CK
          </h2>

          <div
            style={{
              marginTop: 4,
              color: "#94A3B8",
              fontSize: 13,
            }}
          >
            Detected adversary techniques
          </div>
        </div>

        <span
          style={{
            background: "#16263F",
            padding: "6px 12px",
            borderRadius: 20,
            color: "#38BDF8",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {uniqueThreats.length} Techniques
        </span>
      </div>

      {/* Content */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          overflowY: "auto",
          flex: 1,
          maxHeight: 430,
        }}
      >
        {uniqueThreats.length === 0 ? (
          <div
            style={{
              color: "#94A3B8",
              textAlign: "center",
              marginTop: 40,
            }}
          >
            No MITRE techniques mapped.
          </div>
        ) : (
          uniqueThreats.map((threat) => (
            <div
key={threat?.mitre?.techniqueId || threat.title}              style={{
                background: "#0F172A",
                border: "1px solid #23324A",
                borderRadius: 16,
                padding: 18,
              }}
            >
              {/* Top */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#38BDF8",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                   {threat?.mitre?.techniqueId || "N/A"}
                  </div>

                  <div
                    style={{
                      color: "white",
                      fontWeight: 700,
                      fontSize: 17,
                      marginTop: 4,
                    }}
                  >
                    {threat?.mitre?.technique || threat.title}
                  </div>

                  <div
                    style={{
                      color: "#22C55E",
                      marginTop: 6,
                      fontSize: 13,
                    }}
                  >
                    {threat?.mitre?.tactic || "Unknown Tactic"}
                  </div>
                </div>

                <span
                  style={{
                    background: `${severityColor(threat.severity)}20`,
                    color: severityColor(threat.severity),
                    padding: "6px 12px",
                    borderRadius: 18,
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  {threat.severity}
                </span>
              </div>

              {/* Description */}

              <div
                style={{
                  marginTop: 14,
                  color: "#94A3B8",
                  fontSize: 13,
                  lineHeight: "20px",
                }}
              >
                {threat?.mitre?.description || threat.description}
              </div>

              {/* Confidence */}

              <div
                style={{
                  marginTop: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "#94A3B8" }}>
                    AI Confidence
                  </span>

                  <span
                    style={{
                      color: "#38BDF8",
                      fontWeight: 700,
                    }}
                  >
                    {threat.confidence}%
                  </span>
                </div>

                <div
                  style={{
                    height: 8,
                    borderRadius: 8,
                    background: "#16263F",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${threat.confidence}%`,
                      height: "100%",
                      background: "#38BDF8",
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}