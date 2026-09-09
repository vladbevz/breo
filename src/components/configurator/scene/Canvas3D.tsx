"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, useProgress } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { ShirtModel } from "./ShirtModel";
import { StudioLighting } from "./StudioLighting";

function LoadingOverlay() {
  const { progress, active } = useProgress();
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="text-signature font-display text-sm font-semibold tracking-[0.2em] uppercase">
        Chargement {Math.round(progress)}%
      </span>
    </div>
  );
}

export function Canvas3D() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <div className="relative h-full w-full" style={{ touchAction: "none" }}>
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 0.9], fov: 35 }}>
        <Suspense fallback={null}>
          <StudioLighting />
          <ShirtModel />
          <CameraRig shouldReduceMotion={shouldReduceMotion} />
          <Preload all />
        </Suspense>
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}
