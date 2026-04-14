create table if not exists workshops (
  id uuid primary key,
  name text not null,
  phone text,
  address text,
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key,
  workshop_id uuid not null references workshops(id),
  full_name text not null,
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('admin','advisor','mechanic','cashier')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key,
  workshop_id uuid not null references workshops(id),
  full_name text not null,
  phone text not null,
  email text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key,
  workshop_id uuid not null references workshops(id),
  customer_id uuid not null references customers(id),
  plate text not null,
  vin text,
  brand text not null,
  model text not null,
  year int,
  mileage int default 0,
  created_at timestamptz not null default now(),
  unique(workshop_id, plate)
);

create table if not exists appointments (
  id uuid primary key,
  workshop_id uuid not null references workshops(id),
  customer_id uuid not null references customers(id),
  vehicle_id uuid not null references vehicles(id),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null check (status in ('pending','confirmed','in_progress','completed','delivered','cancelled','no_show')),
  reason text,
  created_at timestamptz not null default now(),
  check (end_at > start_at)
);

create index if not exists idx_appointments_workshop_start on appointments(workshop_id, start_at);
