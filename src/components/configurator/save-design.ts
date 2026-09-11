import { nanoid } from "nanoid";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { ConfiguratorState } from "./state/configurator-types";

export type SaveDesignResult = { success: true; id: string } | { success: false; error: string };

function captureCanvasBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Capture de l'aperçu impossible."));
    }, "image/png");
  });
}

export async function saveDesign(state: ConfiguratorState, canvas: HTMLCanvasElement | null): Promise<SaveDesignResult> {
  if (!canvas) {
    return { success: false, error: "Le rendu 3D n'est pas encore prêt. Réessayez dans un instant." };
  }

  let supabase;
  try {
    supabase = getSupabaseBrowserClient();
  } catch {
    return { success: false, error: "Cette fonctionnalité n'est pas encore configurée. Contactez-nous directement." };
  }

  const id = nanoid(6);

  try {
    const previewBlob = await captureCanvasBlob(canvas);
    const { error: previewUploadError } = await supabase.storage
      .from("previews")
      .upload(`${id}.png`, previewBlob, { contentType: "image/png" });
    if (previewUploadError) throw previewUploadError;
    const previewUrl = supabase.storage.from("previews").getPublicUrl(`${id}.png`).data.publicUrl;

    let logoUrl: string | null = null;
    if (state.logoFile) {
      const extension = state.logoFile.name.split(".").pop() ?? "png";
      const logoPath = `${id}.${extension}`;
      const { error: logoUploadError } = await supabase.storage
        .from("logos")
        .upload(logoPath, state.logoFile, { contentType: state.logoFile.type });
      if (logoUploadError) throw logoUploadError;
      logoUrl = supabase.storage.from("logos").getPublicUrl(logoPath).data.publicUrl;
    }

    const { error: insertError } = await supabase.from("designs").insert({
      id,
      tshirt_color: state.color,
      logo_url: logoUrl,
      logo_position: state.decalTransform,
      preview_url: previewUrl,
      status: "draft",
    });
    if (insertError) throw insertError;

    return { success: true, id };
  } catch (error) {
    console.error("[save-design] failed:", error);
    return { success: false, error: "Une erreur est survenue lors de l'enregistrement. Réessayez." };
  }
}
