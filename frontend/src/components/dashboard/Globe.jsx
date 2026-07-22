import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,

      width: 700,
      height: 700,

      phi: 0,

      theta: 0.3,

      dark: 1,

      diffuse: 1.2,

      mapSamples: 20000,

      mapBrightness: 6,

      baseColor: [0.08, 0.16, 0.35],

      markerColor: [0.0, 0.75, 1],

      glowColor: [0.0, 0.45, 1],

      opacity: 1,

      markers: [
        { location: [19.076, 72.8777], size: 0.12 }, // Mumbai
        { location: [37.7749, -122.4194], size: 0.1 }, // SF
        { location: [51.5072, -0.1276], size: 0.09 }, // London
        { location: [35.6895, 139.6917], size: 0.1 }, // Tokyo
        { location: [1.3521, 103.8198], size: 0.08 }, // Singapore
      ],

      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
      }}
    />
  );
}