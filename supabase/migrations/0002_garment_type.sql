-- Le T-shirt existe en deux qualites (standard / premium), chacune a son propre prix
-- (voir src/lib/pricing.ts). A executer une fois dans l'editeur SQL du projet Supabase.

alter table public.designs
  add column if not exists garment_type text not null default 'standard';
