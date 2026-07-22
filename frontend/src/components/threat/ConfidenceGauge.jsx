export default function ConfidenceGauge({ value }) {
  const radius = 55;
  const stroke = 10;

  const normalizedRadius = radius - stroke * 2;

  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 90) return "#22C55E";
    if (value >= 70) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 30,
      }}
    >
      <svg
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="#23324D"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset .5s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="700"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}