-- ================================================================
-- Content OS — Esquema para Competencia (Supabase)
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- ================================================================

-- Perfiles de Competidores
create table if not exists competitor_profiles (
  username            text primary key,
  followers_count     integer default 0,
  media_count         integer default 0,
  profile_picture_url text,
  biography           text,
  updated_at          timestamptz default now()
);

-- Posts de Competidores
create table if not exists competitor_posts (
  id              text primary key,
  username        text references competitor_profiles(username) on delete cascade,
  caption         text,
  media_type      text,
  media_url       text,
  permalink       text,
  timestamp       timestamptz,
  like_count      integer default 0,
  comments_count  integer default 0,
  last_scanned_at  timestamptz default now(),
  created_at      timestamptz default now()
);

-- Habilitar RLS si es necesario (por defecto en local service_role no se ve afectado)
alter table competitor_profiles enable row level security;
alter table competitor_posts enable row level security;

-- Crear políticas básicas para permitir lectura anónima y escritura service_role
create policy "Permitir lectura publica de perfiles" on competitor_profiles
  for select using (true);

create policy "Permitir lectura publica de posts" on competitor_posts
  for select using (true);

create policy "Permitir todo a service_role en perfiles" on competitor_profiles
  for all using (true) with check (true);

create policy "Permitir todo a service_role en posts" on competitor_posts
  for all using (true) with check (true);
