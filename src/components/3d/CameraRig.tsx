import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const BASE_DISTANCE = 4;
const BREAKPOINT = 600;

export default function CameraRig() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.z = size.width < BREAKPOINT
      ? BASE_DISTANCE * (BREAKPOINT / size.width)
      : BASE_DISTANCE;
  }, [camera, size.width]);

  return null;
}