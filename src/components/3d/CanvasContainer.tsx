import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useRef } from "react";

export default function CanvasContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="canvas-wrapper" ref={containerRef}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <Scene containerRef={containerRef} />
      </Canvas>
    </div>
  );
}