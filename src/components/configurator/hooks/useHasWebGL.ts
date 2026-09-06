import { useSyncExternalStore } from "react";

function subscribe() {
  // WebGL support doesn't change during a session — no external events to subscribe to.
  return () => {};
}

function getSnapshot(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

/** True when the browser can create a WebGL context (mirrors src/lib/usePointerFineHover.ts). */
export function useHasWebGL(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
