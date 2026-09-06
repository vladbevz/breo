"use client";

import { useConfigurator } from "../state/configurator-context";

export function TransformControls() {
  const { state, dispatch } = useConfigurator();
  const { position, scale, rotation } = state.decalTransform;

  if (!state.logoTexture) return null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">Ajustement</p>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET_TRANSFORM" })}
          className="font-body text-xs text-bone-dim underline decoration-bone-dim underline-offset-4 hover:decoration-orange"
        >
          Centrer
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-4">
        <label className="flex flex-col gap-1 font-body text-xs text-bone-dim">
          Horizontal
          <input
            type="range"
            min={-0.13}
            max={0.1}
            step={0.005}
            value={position[0]}
            onChange={(event) =>
              dispatch({
                type: "SET_POSITION",
                position: [Number(event.target.value), position[1], position[2]],
              })
            }
          />
        </label>

        <label className="flex flex-col gap-1 font-body text-xs text-bone-dim">
          Vertical
          <input
            type="range"
            min={-0.1}
            max={0.09}
            step={0.005}
            value={position[1]}
            onChange={(event) =>
              dispatch({
                type: "SET_POSITION",
                position: [position[0], Number(event.target.value), position[2]],
              })
            }
          />
        </label>

        <label className="flex flex-col gap-1 font-body text-xs text-bone-dim">
          Taille
          <input
            type="range"
            min={0.06}
            max={0.22}
            step={0.005}
            value={scale}
            onChange={(event) => dispatch({ type: "SET_SCALE", scale: Number(event.target.value) })}
          />
        </label>

        <label className="flex flex-col gap-1 font-body text-xs text-bone-dim">
          Rotation
          <input
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={rotation}
            onChange={(event) => dispatch({ type: "SET_ROTATION", rotation: Number(event.target.value) })}
          />
        </label>
      </div>
    </div>
  );
}
