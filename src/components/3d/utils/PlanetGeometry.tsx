import { useMemo } from 'react';
import * as THREE from 'three';
import { createNoiseFn, type INoiseVariant } from './noise';
import { DEFAULT_BIOMES, getBiomeColor, type IBiome } from './biomes';

interface IPlanetGeometryProps {
  seed: number;
  variant?: INoiseVariant;
  scale?: number;
  amplitude?: number;
  resolution?: number;
  generationTrigger?: number;
  biomes?: IBiome[];
}

export default function PlanetGeometry({
  seed,
  variant = 'terraced',
  scale = 1.8,
  amplitude = 0.18,
  resolution = 64,
  generationTrigger,
  biomes = DEFAULT_BIOMES,
}: IPlanetGeometryProps) {
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, resolution, resolution);
    const noise3D = createNoiseFn(variant, { seed });
    const position = geo.attributes.position;
    const colors = new Float32Array(position.count * 3);

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);

      const len = Math.sqrt(x * x + y * y + z * z);
      const nx = x / len;
      const ny = y / len;
      const nz = z / len;

      const n = noise3D(nx * scale, ny * scale, nz * scale);
      const shaped = n < 0 ? n * 0.3 : n;
      const elevation = shaped * amplitude;

      const displacement = 1 + n * amplitude;
      position.setXYZ(i, nx * displacement, ny * displacement, nz * displacement);

      const color = getBiomeColor(elevation, biomes);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, [seed, scale, amplitude, resolution, generationTrigger]);

  return <primitive object={geometry} attach="geometry" />;
}