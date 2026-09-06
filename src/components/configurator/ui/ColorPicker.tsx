"use client";

import { useConfigurator } from "../state/configurator-context";
import { GARMENT_PALETTE } from "../state/palette";

export function ColorPicker() {
  const { state, dispatch } = useConfigurator();

  return (
    <div>
      <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">Couleur</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {GARMENT_PALETTE.map((color) => {
          const isActive = state.color === color.hex;
          return (
            <button
              key={color.id}
              type="button"
              aria-pressed={isActive}
              aria-label={color.label}
              onClick={() => dispatch({ type: "SET_COLOR", color: color.hex })}
              className="group relative h-9 w-9 rounded-full border border-bone/15 transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: color.hex }}
            >
              <span
                aria-hidden="true"
                className={`ring-signature pointer-events-none absolute -inset-1 rounded-full transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60 group-focus-visible:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
