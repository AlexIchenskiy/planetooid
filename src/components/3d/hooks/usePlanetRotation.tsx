import { useRef, useEffect, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const IDLE_AFTER_MS = 3000;
const AUTO_SPEED = 0.0015;

export default function usePlanetRotation(containerRef: RefObject<HTMLElement | null>) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const inertia = useRef(0);
  const lastInteraction = useRef(Date.now());

  useFrame(() => {
    if (!meshRef.current || isDragging.current) {
      return;
    }

    const idle = Date.now() - lastInteraction.current > IDLE_AFTER_MS;
    if (idle) {
      inertia.current *= 0.92;
      meshRef.current.rotation.y += AUTO_SPEED + inertia.current;
    } else {
      meshRef.current.rotation.y += inertia.current;
      inertia.current *= 0.92;
    }
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      try {
        el.setPointerCapture(e.pointerId);
      } catch { }
      isDragging.current = true;
      lastX.current = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !meshRef.current) return;
      e.preventDefault();
      const delta = (e.clientX - lastX.current) * 0.008;
      meshRef.current.rotation.y += delta;
      inertia.current = delta;
      lastX.current = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      try { el.releasePointerCapture(e.pointerId); } catch (_) { }
      isDragging.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!meshRef.current) return;
      const delta = e.deltaY * 0.002;
      meshRef.current.rotation.y += delta;
      inertia.current = delta;
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [containerRef]);

  return { meshRef };
}