"use client";

import { useState } from "react";
import { resendDevisConfirmation } from "../devis-actions";

export function ResendEmailButton({ designId }: { designId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setStatus("sending");
    setError(null);
    const result = await resendDevisConfirmation(designId);
    if (result.success) {
      setStatus("sent");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status === "sending"}
        className="inline-flex items-center justify-center rounded-full border border-bone/20 px-7 py-3 font-body text-sm font-medium text-bone transition-colors duration-300 hover:border-bone/40 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Envoi…" : status === "sent" ? "Email renvoyé" : "Recevoir par email"}
      </button>
      {error ? <p className="mt-2 font-body text-xs text-orange">{error}</p> : null}
    </div>
  );
}
