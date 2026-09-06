"use client";

import { useEffect, useRef } from "react";
import { useConfigurator } from "../state/configurator-context";
import { useLogoTexture } from "../hooks/useLogoTexture";

export function LogoUploader() {
  const { dispatch } = useConfigurator();
  const { texture, error, isLoading, loadFile, clear } = useLogoTexture();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({ type: "SET_LOGO_TEXTURE", texture });
  }, [texture, dispatch]);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) loadFile(file);
  }

  return (
    <div>
      <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">Votre logo</p>

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        className="group relative mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-bone/20 px-6 py-8 text-center transition-colors duration-300 hover:border-bone/40"
      >
        <span
          aria-hidden="true"
          className="ring-signature pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:opacity-100"
        />
        <p className="relative font-body text-sm text-bone">
          {isLoading ? "Import en cours…" : "Glissez une image ou cliquez pour choisir un fichier"}
        </p>
        <p className="relative font-body text-xs text-bone-dim">PNG, JPG ou WebP</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>

      {error ? <p className="mt-2 font-body text-xs text-orange">{error}</p> : null}

      {texture ? (
        <button
          type="button"
          onClick={clear}
          className="mt-2 font-body text-xs text-bone-dim underline decoration-bone-dim underline-offset-4 hover:decoration-orange"
        >
          Retirer le logo
        </button>
      ) : null}
    </div>
  );
}
