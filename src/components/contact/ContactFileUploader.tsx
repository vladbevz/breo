"use client";

import { useRef } from "react";
import type { ContactContent } from "./contact-content";
import type { ContactFile } from "./useContactFiles";

type ContactFileUploaderProps = {
  content: Pick<ContactContent, "filesLabel" | "filesHint">;
  files: ContactFile[];
  addFiles: (fileList: FileList | File[]) => void;
  removeFile: (id: string) => void;
};

function extensionLabel(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "FILE" : filename.slice(dot + 1).toUpperCase();
}

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ContactFileUploader({ content, files, addFiles, removeFile }: ContactFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p className="font-body text-xs tracking-[0.2em] text-bone-dim uppercase">{content.filesLabel}</p>

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
          addFiles(event.dataTransfer.files);
        }}
        className="group relative mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-bone/20 px-6 py-6 text-center transition-colors duration-300 hover:border-bone/40"
      >
        <span
          aria-hidden="true"
          className="ring-signature pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:opacity-100"
        />
        <p className="relative font-body text-sm text-bone">Glissez vos fichiers ou cliquez pour choisir</p>
        <p className="relative font-body text-xs text-bone-dim">{content.filesHint}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
          className="sr-only"
          onChange={(event) => {
            if (event.target.files) addFiles(event.target.files);
            event.target.value = "";
          }}
        />
      </div>

      {files.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {files.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-xl border border-bone/10 px-3 py-2"
            >
              {entry.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- aperçu local d'un fichier importé, jamais hébergé
                <img
                  src={entry.previewUrl}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-md border border-bone/10 bg-ink-soft object-contain"
                />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-bone/10 bg-ink-soft font-display text-[10px] font-semibold text-bone-dim">
                  {extensionLabel(entry.file.name)}
                </span>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate font-body text-xs text-bone">{entry.file.name}</p>
                {entry.status === "error" ? (
                  <p className="font-body text-xs text-orange">{entry.error}</p>
                ) : entry.status === "uploading" || entry.status === "pending" ? (
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-bone/10">
                    <div
                      className="h-full rule-signature transition-[width] duration-200"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                ) : (
                  <p className="font-body text-xs text-bone-dim">{formatSize(entry.file.size)}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeFile(entry.id)}
                aria-label={`Retirer ${entry.file.name}`}
                className="shrink-0 font-body text-xs text-bone-dim underline decoration-bone-dim underline-offset-4 hover:decoration-orange"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
