"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function updateDesignQuantity(id: string, quantity: number): Promise<{ success: boolean }> {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("designs").update({ quantity }).eq("id", id);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("[modele-pret] updateDesignQuantity failed:", error);
    return { success: false };
  }
}
