"use client";

import { GARMENT_TYPES } from "@/lib/pricing";
import { useConfigurator } from "../state/configurator-context";

export function GarmentTypePicker() {
  const { state, dispatch } = useConfigurator();

  return (
    <div>
      <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">Qualité</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {GARMENT_TYPES.map((garmentType) => {
          const isActive = state.garmentType === garmentType.id;
          return (
            <button
              key={garmentType.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => dispatch({ type: "SET_GARMENT_TYPE", garmentType: garmentType.id })}
              className={`rounded-full border px-4 py-2 font-body text-sm transition-colors duration-300 ${
                isActive ? "border-transparent text-ink rule-signature" : "border-bone/20 text-bone hover:border-bone/40"
              }`}
            >
              {garmentType.label} — {garmentType.pricePerUnit} €
            </button>
          );
        })}
      </div>
    </div>
  );
}
