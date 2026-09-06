"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const MAX_DIMENSION = 1536;
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

type UseLogoTextureResult = {
  texture: THREE.CanvasTexture | null;
  error: string | null;
  isLoading: boolean;
  loadFile: (file: File) => void;
  clear: () => void;
};

export function useLogoTexture(): UseLogoTextureResult {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    return () => {
      textureRef.current?.dispose();
    };
  }, []);

  const clear = useCallback(() => {
    textureRef.current?.dispose();
    textureRef.current = null;
    setTexture(null);
    setError(null);
  }, []);

  const loadFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Format non supporté. Utilisez une image PNG, JPG ou WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Fichier trop volumineux (20 Mo maximum).");
      return;
    }

    setIsLoading(true);

    createImageBitmap(file)
      .then((bitmap) => {
        const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
        const width = Math.round(bitmap.width * scale);
        const height = Math.round(bitmap.height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("2D context unavailable");
        ctx.drawImage(bitmap, 0, 0, width, height);
        bitmap.close();

        const nextTexture = new THREE.CanvasTexture(canvas);
        nextTexture.colorSpace = THREE.SRGBColorSpace;
        nextTexture.needsUpdate = true;

        textureRef.current?.dispose();
        textureRef.current = nextTexture;
        setTexture(nextTexture);
      })
      .catch(() => {
        setError("Impossible de lire cette image.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { texture, error, isLoading, loadFile, clear };
}
