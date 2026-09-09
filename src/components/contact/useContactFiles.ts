"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg", ".pdf", ".ai", ".eps"];
const PREVIEWABLE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".svg"];

export type ContactFileStatus = "pending" | "uploading" | "done" | "error";

export type ContactFile = {
  id: string;
  file: File;
  status: ContactFileStatus;
  progress: number;
  previewUrl?: string;
  error?: string;
  blobUrl?: string;
  blobDownloadUrl?: string;
  blobPathname?: string;
};

type UseContactFilesResult = {
  files: ContactFile[];
  addFiles: (fileList: FileList | File[]) => void;
  removeFile: (id: string) => void;
  isUploading: boolean;
};

function getExtension(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function useContactFiles(): UseContactFilesResult {
  const [files, setFiles] = useState<ContactFile[]>([]);
  const filesRef = useRef<ContactFile[]>([]);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const updateFile = useCallback((id: string, patch: Partial<ContactFile>) => {
    setFiles((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }, []);

  const uploadFile = useCallback(
    async (id: string, file: File) => {
      try {
        const result = await upload(`contact-uploads/${id}-${sanitizeFilename(file.name)}`, file, {
          access: "public",
          handleUploadUrl: "/api/contact/upload",
          onUploadProgress: (event) => {
            updateFile(id, { status: "uploading", progress: event.percentage });
          },
        });
        updateFile(id, {
          status: "done",
          progress: 100,
          blobUrl: result.url,
          blobDownloadUrl: result.downloadUrl,
          blobPathname: result.pathname,
        });
      } catch {
        updateFile(id, { status: "error", error: "Échec de l'envoi, réessayez." });
      }
    },
    [updateFile],
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);

      incoming.forEach((file) => {
        const id = crypto.randomUUID();
        const extension = getExtension(file.name);

        if (!ACCEPTED_EXTENSIONS.includes(extension)) {
          setFiles((current) => [
            ...current,
            { id, file, status: "error", progress: 0, error: "Format non supporté." },
          ]);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setFiles((current) => [
            ...current,
            { id, file, status: "error", progress: 0, error: "Fichier trop volumineux (15 Mo max)." },
          ]);
          return;
        }

        const previewUrl = PREVIEWABLE_EXTENSIONS.includes(extension) ? URL.createObjectURL(file) : undefined;
        setFiles((current) => [...current, { id, file, status: "pending", progress: 0, previewUrl }]);
        void uploadFile(id, file);
      });
    },
    [uploadFile],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((current) => {
      const target = current.find((entry) => entry.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return current.filter((entry) => entry.id !== id);
    });
  }, []);

  useEffect(() => {
    return () => {
      filesRef.current.forEach((entry) => {
        if (entry.previewUrl) URL.revokeObjectURL(entry.previewUrl);
      });
    };
  }, []);

  const isUploading = files.some((entry) => entry.status === "uploading" || entry.status === "pending");

  return { files, addFiles, removeFile, isUploading };
}
