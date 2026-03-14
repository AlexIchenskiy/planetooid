import { createNoise3D, type NoiseFunction3D } from 'simplex-noise';
import alea from 'alea';

export const NOISE_VARIANTS = ['fbm', 'ridged', 'terraced', 'domainWarp'] as const;

export type INoiseVariant = typeof NOISE_VARIANTS[number];

export type NoiseFn = (x: number, y: number, z: number) => number;

const fbm = (noise3D: NoiseFunction3D, octaves = 4): NoiseFn =>
  (x, y, z) => {
    let value = 0, amplitude = 0.5, frequency = 1;
    for (let i = 0; i < octaves; i++) {
      value += noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  };

const ridged = (noise3D: NoiseFunction3D, octaves = 4): NoiseFn =>
  (x, y, z) => {
    let value = 0, amplitude = 0.5, frequency = 1;
    for (let i = 0; i < octaves; i++) {
      const n = noise3D(x * frequency, y * frequency, z * frequency);
      value += (1 - Math.abs(n)) * amplitude;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value * 2 - 1;
  };

const terraced = (noise3D: NoiseFunction3D, steps = 5, octaves = 4): NoiseFn => {
  const base = fbm(noise3D, octaves);
  return (x, y, z) => {
    const n = base(x, y, z);
    return Math.round(n * steps) / steps;
  };
};

const domainWarp = (noise3D: NoiseFunction3D, strength = 0.8, octaves = 4): NoiseFn => {
  const base = fbm(noise3D, octaves);
  return (x, y, z) => {
    const wx = base(x + 1.7, y + 9.2, z + 3.4) * strength;
    const wy = base(x + 8.3, y + 2.8, z + 5.1) * strength;
    const wz = base(x + 4.1, y + 6.7, z + 1.9) * strength;
    return base(x + wx, y + wy, z + wz);
  };
};

export interface INoiseOptions {
  seed?: number;
  octaves?: number;
  steps?: number;
  warp?: number;
}

export const createNoiseFn = (
  variant: INoiseVariant,
  options: INoiseOptions = {}
): NoiseFn => {
  const { octaves = 4, steps = 5, warp = 0.8 } = options;
  const noise3D = createNoise3D(alea(options.seed ?? 42));

  switch (variant) {
    case 'fbm': return fbm(noise3D, octaves);
    case 'ridged': return ridged(noise3D, octaves);
    case 'terraced': return terraced(noise3D, steps, octaves);
    case 'domainWarp': return domainWarp(noise3D, warp, octaves);
  }
};