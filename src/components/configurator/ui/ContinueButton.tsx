"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useConfigurator } from "../state/configurator-context";
import { saveDesign } from "../save-design";

export function ContinueButton() {
  const { state, canvasElRef } = useConfigurator();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleContinue() {
    setIsSaving(true);
    setError(null);

    const result = await saveDesign(state, canvasElRef.current);

    if (!result.success) {
      setError(result.error);
      setIsSaving(false);
      return;
    }

    router.push(`/modele-pret/${result.id}`);
  }

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleContinue}
        disabled={isSaving}
        className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full px-7 py-3 font-body text-sm font-medium text-ink transition-transform duration-300 ease-out hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        <span className="absolute inset-0 rule-signature" aria-hidden="true" />
        <span className="relative">{isSaving ? "Enregistrement…" : "Continuer"}</span>
      </button>
      {error ? <p className="mt-2 font-body text-xs text-orange">{error}</p> : null}
    </div>
  );
}
