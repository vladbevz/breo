import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useConfigurator } from "../state/configurator-context";
import { LogoDecal } from "./LogoDecal";

useGLTF.preload("/models/shirt.glb");

// Distance (espace local du t-shirt) en-deçà de laquelle un clic est considéré
// comme visant le logo plutôt que le tissu — approximativement le rayon du decal.
const GRAB_RADIUS = 0.09;

type ShirtGLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

export function ShirtModel() {
  const { state, dispatch } = useConfigurator();
  const { nodes, materials } = useGLTF("/models/shirt.glb") as unknown as ShirtGLTFResult;
  const meshRef = useRef<THREE.Mesh>(null);

  // Le matériau est mis en cache par useGLTF entre les montages : on le clone une
  // seule fois pour pouvoir muter sa couleur sans affecter d'autres instances.
  const material = useMemo(() => materials.lambert1.clone(), [materials]);
  material.color.set(state.color);

  useEffect(() => {
    if (!state.isDragging) return;
    function stopDrag() {
      dispatch({ type: "DRAG_END" });
    }
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
    return () => {
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [state.isDragging, dispatch]);

  useFrame(({ raycaster }) => {
    if (!state.isDragging || !meshRef.current) return;
    // recursive=false : ne teste que le t-shirt lui-même, jamais le Decal —
    // et une caméra frontale ne peut par construction toucher que la face
    // avant visible du vêtement (culling FrontSide).
    const hits = raycaster.intersectObject(meshRef.current, false);
    if (hits.length === 0) return;
    const local = meshRef.current.worldToLocal(hits[0].point.clone());
    dispatch({ type: "DRAG_MOVE", position: [local.x, local.y, local.z] });
  });

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    if (!state.logoTexture || !meshRef.current) return;
    const local = meshRef.current.worldToLocal(event.point.clone());
    const [dx, dy, dz] = state.decalTransform.position;
    const distance = Math.hypot(local.x - dx, local.y - dy, local.z - dz);
    if (distance <= GRAB_RADIUS) {
      event.stopPropagation();
      dispatch({ type: "DRAG_START" });
    }
  }

  return (
    <mesh
      ref={meshRef}
      geometry={nodes.T_Shirt_male.geometry}
      material={material}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
    >
      {state.logoTexture ? <LogoDecal transform={state.decalTransform} texture={state.logoTexture} /> : null}
    </mesh>
  );
}
