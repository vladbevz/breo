import type * as THREE from "three";
import type { GarmentTypeId } from "@/lib/pricing";

export type DecalTransform = {
  position: [number, number, number];
  scale: number;
  /** Angle unique : Decal s'auto-oriente sur la normale de surface la plus proche, puis applique cette torsion. */
  rotation: number;
};

export type ConfiguratorState = {
  color: string;
  garmentType: GarmentTypeId;
  logoTexture: THREE.CanvasTexture | null;
  logoFile: File | null;
  decalTransform: DecalTransform;
  isDragging: boolean;
};

export type ConfiguratorAction =
  | { type: "SET_COLOR"; color: string }
  | { type: "SET_GARMENT_TYPE"; garmentType: GarmentTypeId }
  | { type: "SET_LOGO_TEXTURE"; texture: THREE.CanvasTexture | null; file: File | null }
  | { type: "DRAG_START" }
  | { type: "DRAG_MOVE"; position: [number, number, number] }
  | { type: "DRAG_END" }
  | { type: "SET_POSITION"; position: [number, number, number] }
  | { type: "SET_SCALE"; scale: number }
  | { type: "SET_ROTATION"; rotation: number }
  | { type: "RESET_TRANSFORM" };
