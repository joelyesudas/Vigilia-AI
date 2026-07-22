import Globe from "react-globe.gl";
import { useMemo, useRef, useEffect } from "react";

export default function HeroGlobe() {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    const controls = globeRef.current.controls();

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.enableZoom = false;
    controls.enablePan = false;
  }, []);

  const points = useMemo(
    () => [
      {
        lat: 19.076,
        lng: 72.8777,
        size: 0.45,
        color: "#22D3EE",
        name: "Mumbai SOC",
      },
      {
        lat: 28.6139,
        lng: 77.209,
        size: 0.35,
        color: "#38BDF8",
        name: "Delhi",
      },
      {
        lat: 37.7749,
        lng: -122.4194,
        size: 0.45,
        color: "#22D3EE",
        name: "San Francisco",
      },
      {
        lat: 40.7128,
        lng: -74.006,
        size: 0.40,
        color: "#38BDF8",
        name: "New York",
      },
      {
        lat: 51.5072,
        lng: -0.1276,
        size: 0.40,
        color: "#38BDF8",
        name: "London",
      },
      {
        lat: 35.6895,
        lng: 139.6917,
        size: 0.45,
        color: "#22D3EE",
        name: "Tokyo",
      },
      {
        lat: 1.3521,
        lng: 103.8198,
        size: 0.35,
        color: "#38BDF8",
        name: "Singapore",
      },
    ],
    []
  );

  const arcs = useMemo(
    () => [
      {
        startLat: 19.076,
        startLng: 72.8777,
        endLat: 37.7749,
        endLng: -122.4194,
        color: ["#00E5FF", "#2563EB"],
      },
      {
        startLat: 35.6895,
        startLng: 139.6917,
        endLat: 51.5072,
        endLng: -0.1276,
        color: ["#22D3EE", "#3B82F6"],
      },
      {
        startLat: 40.7128,
        startLng: -74.006,
        endLat: 1.3521,
        endLng: 103.8198,
        color: ["#22D3EE", "#3B82F6"],
      },
      {
        startLat: 51.5072,
        startLng: -0.1276,
        endLat: 19.076,
        endLng: 72.8777,
        color: ["#22D3EE", "#3B82F6"],
      },
    ],
    []
  );

  return (
    <div
      style={{
        width: 470,
        height: 470,
        position: "relative",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#2563EB55 0%,transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Globe
        ref={globeRef}
        width={470}
        height={470}
        backgroundColor="rgba(0,0,0,0)"
        animateIn={true}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere={true}
        atmosphereColor="#00BFFF"
        atmosphereAltitude={0.18}
        enablePointerInteraction={true}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointAltitude="size"
        pointRadius={0.7}
        pointColor="color"
        labelsData={points}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelColor={() => "#60A5FA"}
        labelSize={() => 1.2}
        labelDotRadius={() => 0.25}
        labelAltitude={() => 0.02}
        arcsData={arcs}
        arcColor="color"
        arcStroke={0.8}
        arcDashLength={0.45}
        arcDashGap={0.15}
        arcDashAnimateTime={1800}
      />

      {/* Status Badge */}
      <div
        style={{
          position: "absolute",
          bottom: 5,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15,23,42,.9)",
          border: "1px solid rgba(56,189,248,.25)",
          borderRadius: 40,
          padding: "12px 22px",
          color: "#fff",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 10,
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22C55E",
            boxShadow: "0 0 15px #22C55E",
            animation: "pulse 1.6s infinite",
          }}
        />

        Global Threat Intelligence
      </div>

      <style>{`
        @keyframes pulse{
          0%{
            transform:scale(.8);
            opacity:.5;
          }

          50%{
            transform:scale(1.3);
            opacity:1;
          }

          100%{
            transform:scale(.8);
            opacity:.5;
          }
        }
      `}</style>
    </div>
  );
}