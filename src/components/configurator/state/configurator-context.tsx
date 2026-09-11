"use client";

import { createContext, useContext, useMemo, useRef, useReducer, type Dispatch, type ReactNode, type RefObject } from "react";
import type { ConfiguratorAction, ConfiguratorState, DecalTransform } from "./configurator-types";
import { GARMENT_PALETTE } from "./palette";

export const DEFAULT_DECAL_TRANSFORM: DecalTransform = {
  position: [0, 0.02, 0.13],
  scale: 0.14,
  rotation: 0,
};

const initialState: ConfiguratorState = {
  color: GARMENT_PALETTE[0].hex,
  logoTexture: null,
  logoFile: null,
  decalTransform: DEFAULT_DECAL_TRANSFORM,
  isDragging: false,
};

function configuratorReducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, color: action.color };
    case "SET_LOGO_TEXTURE":
      return { ...state, logoTexture: action.texture, logoFile: action.file, decalTransform: DEFAULT_DECAL_TRANSFORM };
    case "DRAG_START":
      return { ...state, isDragging: true };
    case "DRAG_MOVE":
      return { ...state, decalTransform: { ...state.decalTransform, position: action.position } };
    case "DRAG_END":
      return { ...state, isDragging: false };
    case "SET_POSITION":
      return { ...state, decalTransform: { ...state.decalTransform, position: action.position } };
    case "SET_SCALE":
      return { ...state, decalTransform: { ...state.decalTransform, scale: action.scale } };
    case "SET_ROTATION":
      return { ...state, decalTransform: { ...state.decalTransform, rotation: action.rotation } };
    case "RESET_TRANSFORM":
      return { ...state, decalTransform: DEFAULT_DECAL_TRANSFORM };
    default:
      return state;
  }
}

type ConfiguratorContextValue = {
  state: ConfiguratorState;
  dispatch: Dispatch<ConfiguratorAction>;
  // Reference vers gl.domElement (Canvas3D), remplie via onCreated -- necessaire pour
  // capturer un aperçu PNG du rendu WebGL au clic sur "Continuer".
  canvasElRef: RefObject<HTMLCanvasElement | null>;
};

const ConfiguratorContext = createContext<ConfiguratorContextValue | null>(null);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configuratorReducer, initialState);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const value = useMemo(() => ({ state, dispatch, canvasElRef }), [state]);
  return <ConfiguratorContext.Provider value={value}>{children}</ConfiguratorContext.Provider>;
}

export function useConfigurator(): ConfiguratorContextValue {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error("useConfigurator must be used within a ConfiguratorProvider");
  }
  return context;
}
