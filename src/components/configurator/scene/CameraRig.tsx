import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type CameraRigProps = {
  shouldReduceMotion: boolean;
};

const DEFAULT_Z = 0.9;

export function CameraRig({ shouldReduceMotion }: CameraRigProps) {
  useFrame(({ camera, pointer }, delta) => {
    if (shouldReduceMotion) {
      camera.position.set(0, 0, DEFAULT_Z);
      camera.lookAt(0, 0, 0);
      return;
    }
    const targetX = pointer.x * 0.12;
    const targetY = pointer.y * 0.08 + 0.02;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
    camera.position.z = DEFAULT_Z;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
