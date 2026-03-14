import type { RefObject } from 'react';
import usePlanetRotation from '../hooks/usePlanetRotation';
import PlanetGeometry from '../utils/PlanetGeometry';
import { useSettingsStore } from '@/store/useSettingsStore';
import PlanetMaterial from '../utils/PlanetMaterial';

interface IPlanetProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function Planet({ containerRef }: IPlanetProps) {
  const { meshRef } = usePlanetRotation(containerRef);
  const { seed, variant, generationTrigger } = useSettingsStore();

  return (
    <group rotation={[0, 0, 0.3]}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <PlanetGeometry seed={seed} variant={variant} generationTrigger={generationTrigger} />
        <PlanetMaterial />
      </mesh>
    </group>
  );
}