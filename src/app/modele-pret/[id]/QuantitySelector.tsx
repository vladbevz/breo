"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getPriceEstimate, PRICE_DISCLAIMER } from "@/lib/pricing";
import { updateDesignQuantity } from "./actions";

const QUANTITY_OPTIONS = [10, 25, 50, 100, 250];

type QuantitySelectorProps = {
  designId: string;
  initialQuantity: number | null;
};

export function QuantitySelector({ designId, initialQuantity }: QuantitySelectorProps) {
  const startQuantity = initialQuantity ?? QUANTITY_OPTIONS[0];
  const [quantity, setQuantity] = useState(startQuantity);
  const [customInput, setCustomInput] = useState(String(startQuantity));
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const estimate = getPriceEstimate(quantity);

  function selectPreset(option: number) {
    setQuantity(option);
    setCustomInput(String(option));
  }

  function handleCustomChange(value: string) {
    setCustomInput(value);
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) setQuantity(parsed);
  }

  function handleContinue() {
    startTransition(async () => {
      await updateDesignQuantity(designId, quantity);
      router.push(`/devis/${designId}`);
    });
  }

  return (
    <div>
      <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">Quantité</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {QUANTITY_OPTIONS.map((option, index) => {
          const isLast = index === QUANTITY_OPTIONS.length - 1;
          const isActive = quantity === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => selectPreset(option)}
              className={`rounded-full border px-4 py-2 font-body text-sm transition-colors duration-300 ${
                isActive ? "border-transparent text-ink rule-signature" : "border-bone/20 text-bone hover:border-bone/40"
              }`}
            >
              {isLast ? `${option}+` : option}
            </button>
          );
        })}
      </div>

      <label className="mt-4 flex items-center gap-3 font-body text-sm text-bone-dim">
        Ou une quantité précise
        <input
          type="number"
          min={1}
          step={1}
          value={customInput}
          onChange={(event) => handleCustomChange(event.target.value)}
          className="w-24 border-b border-bone/15 bg-transparent py-1 font-body text-sm text-bone focus:border-bone/40 focus:outline-none"
        />
      </label>

      <div className="mt-6 border-t border-bone/10 pt-6">
        <p className="font-display text-2xl font-semibold">
          {estimate?.total !== null && estimate?.total !== undefined
            ? `${estimate.total.toLocaleString("fr-FR")} €`
            : "Sur devis"}
        </p>
        <p className="mt-2 font-body text-xs text-bone-dim">{PRICE_DISCLAIMER}</p>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={isPending}
        className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        <span className="absolute inset-0 rule-signature" aria-hidden="true" />
        <span className="relative">{isPending ? "Un instant…" : "Obtenir mon devis"}</span>
      </button>
    </div>
  );
}
