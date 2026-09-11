import { getSupabaseServerClient } from "./supabase/server";

export type DesignStatus = "draft" | "submitted";

export type DecalTransformRecord = {
  position: [number, number, number];
  scale: number;
  rotation: number;
};

export type Design = {
  id: string;
  tshirt_color: string;
  logo_url: string | null;
  logo_position: DecalTransformRecord | null;
  preview_url: string | null;
  quantity: number | null;
  price_estimate: number | null;
  status: DesignStatus;
  contact_name: string | null;
  contact_company: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_message: string | null;
  created_at: string;
};

// Champs publics uniquement -- jamais de colonnes de contact. Utilise par la page de
// partage /design/[id] et la route API associee (voir supabase/migrations/0001_designs.sql
// pour la note RLS : la policy SELECT autorise techniquement `select *`, donc c'est ce
// select colonne-par-colonne qui protege les donnees de contact, pas la policy seule).
export type PublicDesignFields = Pick<Design, "id" | "preview_url" | "tshirt_color" | "logo_position" | "quantity">;

export async function getDesign(id: string): Promise<Design | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("designs").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return data as Design | null;
  } catch (error) {
    console.error("[designs] getDesign failed:", error);
    return null;
  }
}

export async function getPublicDesignFields(id: string): Promise<PublicDesignFields | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from("designs")
      .select("id, preview_url, tshirt_color, logo_position, quantity")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data as PublicDesignFields | null;
  } catch (error) {
    console.error("[designs] getPublicDesignFields failed:", error);
    return null;
  }
}
