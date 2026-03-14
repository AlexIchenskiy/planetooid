export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
}