import { ContactShadows, Environment } from "@react-three/drei";

export function StudioLighting() {
  return (
    <>
      <Environment preset="studio" background={false} />
      <directionalLight intensity={0.6} position={[3, 4, 2]} castShadow />
      <ambientLight intensity={0.3} />
      <ContactShadows
        position={[0, -0.4, 0]}
        opacity={0.4}
        blur={2.5}
        far={4}
        resolution={512}
        color="#000000"
      />
    </>
  );
}
