import ReactMarkdown from "react-markdown";
import { showSuccess } from "../../utils/toast";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const copyMessage = async () => {
  try {
    await navigator.clipboard.writeText(message.text);
    showSuccess("Response copied to clipboard.");
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = message.text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    showSuccess("Response copied to clipboard.");
  }
};

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          alignItems: "flex-start",
          marginBottom: 20,
          animation: "fadeIn .35s ease",
        }}
      >
        {/* AI Avatar */}
        {!isUser && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#2563EB",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
              flexShrink: 0,
              fontSize: 20,
              boxShadow: "0 0 12px rgba(37,99,235,.4)",
            }}
          >
            {!isUser && (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 14,
    }}
  >
    <button
      onClick={copyMessage}
      style={{
        background: "#2563EB",
        color: "white",
        border: "none",
        borderRadius: 10,
        padding: "8px 14px",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      📋 Copy
    </button>
  </div>
)}
            🤖
          </div>
        )}

        {/* Message Bubble */}
        <div
          style={{
            background: isUser ? "#2563EB" : "#111827",
            color: "white",
            padding: "18px 22px",
            borderRadius: 18,
            maxWidth: "75%",
            lineHeight: "1.8",
            border: isUser ? "none" : "1px solid #24324D",
            overflowWrap: "break-word",
            boxShadow: "0 8px 20px rgba(0,0,0,.18)",
          }}
        >
          {isUser ? (
            message.text
          ) : (
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1
                    style={{
                      color: "#38BDF8",
                      marginBottom: 15,
                      fontSize: 28,
                    }}
                  >
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2
                    style={{
                      color: "#38BDF8",
                      marginBottom: 12,
                      fontSize: 22,
                    }}
                  >
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3
                    style={{
                      color: "#38BDF8",
                      marginBottom: 10,
                      fontSize: 18,
                    }}
                  >
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p
                    style={{
                      marginBottom: 12,
                      lineHeight: "1.9",
                    }}
                  >
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul
                    style={{
                      paddingLeft: 25,
                      marginBottom: 15,
                    }}
                  >
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol
                    style={{
                      paddingLeft: 25,
                      marginBottom: 15,
                    }}
                  >
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li
                    style={{
                      marginBottom: 8,
                    }}
                  >
                    {children}
                  </li>
                ),

                strong: ({ children }) => (
                  <strong
                    style={{
                      color: "#38BDF8",
                    }}
                  >
                    {children}
                  </strong>
                ),

                code: ({ children }) => (
                  <code
                    style={{
                      background: "#1E293B",
                      color: "#22C55E",
                      padding: "3px 6px",
                      borderRadius: 5,
                      fontFamily: "monospace",
                    }}
                  >
                    {children}
                  </code>
                ),
              }}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>

        {/* User Avatar */}
        {isUser && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "#1E293B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 12,
              flexShrink: 0,
              fontSize: 20,
              border: "1px solid #24324D",
            }}
          >
            👤
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn{
            from{
              opacity:0;
              transform:translateY(10px);
            }
            to{
              opacity:1;
              transform:translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}