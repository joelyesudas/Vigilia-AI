export default function RawLogCard({ threat }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #23324D",
        borderRadius: 18,
        padding: 22,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 18,
        }}
      >
        📜 Raw Log Event
      </h2>

      <pre
        style={{
          color: "#CBD5E1",
          whiteSpace: "pre-wrap",
          fontSize: 15,
          lineHeight: "28px",
        }}
      >
        {threat.matchedLog}
      </pre>
    </div>
  );
}