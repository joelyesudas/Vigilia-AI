import AnimatedCounter from "./AnimatedCounter";

export default function StatCard({
  title,
  value,
  color = "#3B82F6",
  compact = false,
}) {
  const icons = {
    Security: "🛡",
    "Security Score": "🛡",
    Threats: "🚨",
    Events: "📡",
    Risk: "⚠",
    "Risk Level": "⚠",
    CPU: "🖥",
    RAM: "💾",
    Disk: "🗄",
    Network: "🌐",
  };

  const icon = icons[title] || "📊";

  const isNumber =
    typeof value === "number" ||
    (!isNaN(Number(String(value).replace("%", ""))) &&
      title !== "Risk" &&
      title !== "Risk Level" &&
      title !== "Network");

  return (
    <>
      <div
        className={compact ? "stat compact" : "stat"}
        style={{
          border: `1px solid ${color}25`,
        }}
      >
        <div
          className="glow"
          style={{
            background: color,
          }}
        />

        <div className="top">
          <div
            className="icon"
            style={{
              background: `${color}20`,
            }}
          >
            {icon}
          </div>

          <div
            className="live"
            style={{
              background: color,
            }}
          />
        </div>

        <div className="title">
          {title}
        </div>

        <div
          className="value"
          style={{
            color,
          }}
        >
          {isNumber ? (
            <AnimatedCounter
              value={Number(
                String(value).replace("%", "")
              )}
              suffix={
                String(value).includes("%")
                  ? "%"
                  : ""
              }
            />
          ) : (
            value
          )}
        </div>
      </div>

      <style>{`

.stat{

padding:22px;

border-radius:18px;

background:linear-gradient(180deg,#111827,#0B1220);

position:relative;

overflow:hidden;

transition:.25s;

cursor:pointer;

min-height:150px;

display:flex;

flex-direction:column;

justify-content:center;

}

.stat:hover{

transform:translateY(-5px);

box-shadow:0 12px 25px rgba(37,99,235,.22);

}

.compact{

padding:16px;

min-height:105px;

}

.glow{

position:absolute;

width:130px;

height:130px;

border-radius:50%;

top:-60px;

right:-60px;

filter:blur(50px);

opacity:.08;

}

.top{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:14px;

}

.icon{

width:42px;

height:42px;

display:flex;

justify-content:center;

align-items:center;

border-radius:12px;

font-size:20px;

}

.compact .icon{

width:34px;

height:34px;

font-size:17px;

}

.live{

width:10px;

height:10px;

border-radius:50%;

box-shadow:0 0 10px currentColor;

}

.title{

color:#94A3B8;

font-size:13px;

margin-bottom:8px;

}

.value{

font-size:34px;

font-weight:800;

line-height:1;

}

.compact .value{

font-size:24px;

}

      `}</style>
    </>
  );
}