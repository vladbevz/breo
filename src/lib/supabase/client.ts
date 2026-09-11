import { createClient } from "@supabase/supabase-js";

// Client navigateur (cle anon) -- utilise uniquement par l'etape "Continuer" du
// configurateur, qui insere le brouillon de design directement depuis le navigateur
// (voir supabase/migrations/0001_designs.sql pour les policies RLS correspondantes).
// Tout le reste (mises a jour, lectures serveur) passe par src/lib/supabase/server.ts.
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase n'est pas encore configure (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquants).");
  }

  return createClient(url, key);
}
