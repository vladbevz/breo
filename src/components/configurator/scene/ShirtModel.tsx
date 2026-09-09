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
const ROTATE_SENSITIVITY = 0.012;

type ShirtGLTFResult = {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};

export function ShirtModel() {
  const { state, dispatch } = useConfigurator();
  const { nodes, materials } = useGLTF("/models/shirt.glb") as unknown as ShirtGLTFResult;
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const isRotatingRef = useRef(false);
  const lastPointerXRef = useRef(0);

  // Le matériau est mis en cache par useGLTF entre les montages : on le clone une
  // seule fois pour pouvoir muter sa couleur sans affecter d'autres instances.
  // roughness/metalness sont fixés à la création (le glb n'en fournit pas
  // d'explicites, ce qui sous l'environnement "studio" donne un rendu
  // plastique/brillant — le coton est mat et non métallique).
  // aoMapIntensity est adouci : l'aoMap fournie avec le modèle a une zone très
  // sombre dans le haut du dos (visible en inspectant la texture directement),
  // invisible tant qu'on ne pouvait pas faire pivoter le t-shirt pour la voir.
  const material = useMemo(() => {
    const cloned = materials.lambert1.clone();
    cloned.roughness = 0.95;
    cloned.metalness = 0;
    cloned.aoMapIntensity = 0.35;
    return cloned;
  }, [materials]);
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

  // Rotation libre du t-shirt (glisser ailleurs que sur le logo) — indépendante
  // du state React pour rester fluide, appliquée directement au groupe.
  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (!isRotatingRef.current || !groupRef.current) return;
      const deltaX = event.clientX - lastPointerXRef.current;
      lastPointerXRef.current = event.clientX;
      groupRef.current.rotation.y += deltaX * ROTATE_SENSITIVITY;
    }
    function stopRotate() {
      isRotatingRef.current = false;
    }
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopRotate);
    window.addEventListener("pointercancel", stopRotate);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopRotate);
      window.removeEventListener("pointercancel", stopRotate);
    };
  }, []);

  useFrame(({ raycaster }) => {
    if (!state.isDragging || !meshRef.current) return;
    // recursive=false : ne teste que le t-shirt lui-même, jamais le Decal.
    // worldToLocal tient compte de la rotation du groupe parent, donc ceci
    // reste correct quel que soit l'angle sous lequel le t-shirt est tourné.
    const hits = raycaster.intersectObject(meshRef.current, false);
    if (hits.length === 0) return;
    const local = meshRef.current.worldToLocal(hits[0].point.clone());
    dispatch({ type: "DRAG_MOVE", position: [local.x, local.y, local.z] });
  });

  function handlePointerDown(event: ThreeEvent<PointerEvent>) {
    if (state.logoTexture && meshRef.current) {
      const local = meshRef.current.worldToLocal(event.point.clone());
      const [dx, dy, dz] = state.decalTransform.position;
      const distance = Math.hypot(local.x - dx, local.y - dy, local.z - dz);
      if (distance <= GRAB_RADIUS) {
        event.stopPropagation();
        dispatch({ type: "DRAG_START" });
        return;
      }
    }
    // Un clic ailleurs sur le t-shirt fait pivoter le vêtement au lieu de
    // déplacer le logo — permet d'atteindre le dos pour y placer un logo.
    event.stopPropagation();
    isRotatingRef.current = true;
    lastPointerXRef.current = event.clientX;
  }

  return (
    <group ref={groupRef}>
      {/* Ni castShadow ni receiveShadow : avec une seule lumière directionnelle et
          aucun autre récepteur (ContactShadows simule sa propre ombre au sol
          indépendamment), ça ne servait qu'à de l'auto-ombrage — qui produisait
          des artefacts sombres façon tache sur les plis, visibles de dos. */}
      <mesh
        ref={meshRef}
        geometry={nodes.T_Shirt_male.geometry}
        material={material}
        onPointerDown={handlePointerDown}
      >
        {state.logoTexture ? <LogoDecal transform={state.decalTransform} texture={state.logoTexture} /> : null}
      </mesh>
    </group>
  );
}
