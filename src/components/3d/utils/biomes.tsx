import * as THREE from 'three';

export interface IBiome {
  maxElevation: number;
  color: THREE.Color;
}

// Elevation is normalised: negative = below sea level, 0-1 = land
export const DEFAULT_BIOMES: IBiome[] = [
  { maxElevation: -0.08, color: new THREE.Color('#1a3a5c') }, // deep ocean
  { maxElevation: 0.0, color: new THREE.Color('#2a5298') }, // shallow water
  { maxElevation: 0.04, color: new THREE.Color('#c2a96e') }, // sand / coast
  { maxElevation: 0.2, color: new THREE.Color('#2e7d32') }, // lowland grass
  { maxElevation: 0.4, color: new THREE.Color('#388e3c') }, // highland grass
  { maxElevation: 0.6, color: new THREE.Color('#5d4037') }, // rock
  { maxElevation: 1.0, color: new THREE.Color('#eceff1') }, // snow
];

export const getBiomeColor = (elevation: number, biomes: IBiome[]): THREE.Color => {
  for (const biome of biomes) {
    if (elevation <= biome.maxElevation) return biome.color;
  }
  return biomes[biomes.length - 1].color;
};