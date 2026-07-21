-- Esquema de Supabase para Peach Estudio.
-- Ejecutar en el SQL Editor del dashboard de Supabase.

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  room_id text,
  room_name text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  requested_date date,
  start_time time,
  end_time time,
  estimated_people integer,
  production_type text,
  message text not null,
  status text default 'new',
  source text default 'website'
);

-- Estados posibles: new | contacted | confirmed | rejected | cancelled
alter table public.booking_requests
  drop constraint if exists booking_requests_status_check;
alter table public.booking_requests
  add constraint booking_requests_status_check
  check (status in ('new', 'contacted', 'confirmed', 'rejected', 'cancelled'));

-- Índice para ordenar por fecha de recepción.
create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at desc);

-- Row Level Security: habilitado, sin políticas públicas.
-- El sitio inserta usando la SERVICE ROLE KEY (solo servidor), que ignora RLS.
-- Así ningún cliente con la anon key puede leer ni escribir la tabla.
alter table public.booking_requests enable row level security;
