-- Funnel configurateur -> devis : table `designs` + buckets de stockage.
-- A executer une fois dans l'editeur SQL du projet Supabase (Dashboard -> SQL Editor).

create table if not exists public.designs (
  id text primary key,                    -- nanoid court, ex. "8F3K2"
  tshirt_color text not null,
  logo_url text,                          -- fichier logo original uploade par le client
  logo_position jsonb,                    -- { x, y, scale, rotation, side: 'front'|'back' }
  preview_url text,                       -- snapshot PNG du canvas 3D (Supabase Storage)
  quantity integer,
  price_estimate numeric,
  status text not null default 'draft',   -- draft | submitted
  contact_name text,
  contact_company text,
  contact_email text,
  contact_phone text,
  contact_message text,
  created_at timestamptz not null default now()
);

alter table public.designs enable row level security;

-- Ecriture publique limitee a la creation d'un brouillon (le "Continuer" du configurateur
-- insere directement depuis le navigateur avec la cle anon). Toute mise a jour ulterieure
-- (quantite, contact, passage a "submitted") passe par des Server Actions avec la cle
-- service_role, qui contourne RLS -- donc aucune policy UPDATE publique n'est necessaire ici.
create policy "anyone can create a draft design"
  on public.designs for insert
  to anon
  with check (status = 'draft');

-- Lecture publique large au niveau de la table : la page de partage /design/[id] et la
-- route API associee ne selectionnent volontairement QUE les colonnes non sensibles
-- (preview_url, tshirt_color, logo_position, quantity) cote application -- voir
-- src/lib/designs.ts:getPublicDesignFields. Ne pas se fier a cette seule policy pour
-- proteger les champs de contact : elle autorise techniquement `select *` via la cle anon.
create policy "anyone can read designs"
  on public.designs for select
  to anon
  using (true);

-- Storage : buckets publics en lecture, ecriture (insert) limitee au client anonyme.
insert into storage.buckets (id, name, public)
values ('logos', 'logos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('previews', 'previews', true)
on conflict (id) do nothing;

create policy "anon can upload logos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'logos');

create policy "anon can upload previews"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'previews');

create policy "anyone can read logos and previews"
  on storage.objects for select
  to anon
  using (bucket_id in ('logos', 'previews'));
