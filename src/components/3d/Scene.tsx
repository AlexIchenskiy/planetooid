import type { RefObject } from 'react';
import Planet from './entities/Planet';
import Lights from './environment/Lights';
import CameraRig from './CameraRig';
import Stars from './environment/Starts';

export interface ISceneProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function Scene({ containerRef }: ISceneProps) {
  return (
    <>
      <Lights />
      <CameraRig />
      <Stars />
      <Planet containerRef={containerRef} />
    </>
  );
}