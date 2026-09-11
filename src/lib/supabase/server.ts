import { createClient } from "@supabase/supabase-js";

// Client serveur (cle service_role -- contourne RLS). Ne jamais importer ce module
// depuis un composant/hook "use client" : la cle service_role ne doit jamais atteindre
// le navigateur. Utilise par les Server Actions et les server components de pages
// (src/lib/designs.ts, src/app/devis/**, src/app/modele-pret/**, src/app/api/design/**).
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase n'est pas encore configure (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY manquants).");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
