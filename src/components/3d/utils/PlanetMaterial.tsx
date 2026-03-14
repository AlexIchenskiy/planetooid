interface IPlanetMaterialProps {
  roughness?: number;
  metalness?: number;
}

export default function PlanetMaterial({
  roughness = 0.8,
  metalness = 0.1,
}: IPlanetMaterialProps) {
  return (
    <meshStandardMaterial
      vertexColors
      flatShading
      roughness={roughness}
      metalness={metalness}
    />
  );
}