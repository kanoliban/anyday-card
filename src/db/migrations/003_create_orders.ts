import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`
    create table if not exists orders (
      id uuid primary key default gen_random_uuid(),
      stripe_session_id text unique not null,
      stripe_payment_intent text,
      customer_email text,
      items jsonb not null,
      subtotal integer not null,
      status text not null default 'completed',
      created_at timestamptz not null default now()
    );
  `.execute(db);

  await sql`create index if not exists orders_created_at_idx on orders (created_at desc);`.execute(
    db,
  );
  await sql`create index if not exists orders_stripe_session_idx on orders (stripe_session_id);`.execute(
    db,
  );
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await sql`drop table if exists orders;`.execute(db);
}
