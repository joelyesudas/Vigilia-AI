import { useEffect, useMemo, useState } from "react";

export default function BackgroundParticles() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 5,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: "#38BDF8",
              opacity: particle.opacity,
              boxShadow: "0 0 15px #38BDF8",
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Grid Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(37,99,235,.12), transparent 70%)",
          }}
        />
      </div>

      <style>{`
        @keyframes float{
          0%{
            transform:translateY(0px) scale(1);
          }

          50%{
            transform:translateY(-35px) scale(1.4);
          }

          100%{
            transform:translateY(0px) scale(1);
          }
        }
      `}</style>
    </>
  );
}