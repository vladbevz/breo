import { Decal } from "@react-three/drei";
import type * as THREE from "three";
import type { DecalTransform } from "../state/configurator-types";

type LogoDecalProps = {
  transform: DecalTransform;
  texture: THREE.CanvasTexture;
};

// Remarque : la géométrie générée par <Decal> (three-stdlib DecalGeometry) ne
// répond pas de façon fiable au raycasting des événements pointeur — vérifié
// empiriquement (un clic visuellement sur le decal était systématiquement reçu
// par le t-shirt sous-jacent). Le drag est donc géré depuis ShirtModel, qui
// compare le point de clic (sur le t-shirt, fiable) à la position du decal.
export function LogoDecal({ transform, texture }: LogoDecalProps) {
  return (
    <Decal position={transform.position} rotation={transform.rotation} scale={transform.scale} map={texture} />
  );
}
