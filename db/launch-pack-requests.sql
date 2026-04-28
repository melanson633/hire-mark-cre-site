create table if not exists launch_pack_requests (
  id bigserial primary key,
  email text not null,
  normalized_email text not null,
  source text not null default 'teaser-launch-pack',
  email_send_status text not null default 'pending',
  resend_email_id text,
  requested_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint launch_pack_requests_normalized_email_unique unique (normalized_email),
  constraint launch_pack_requests_email_send_status_check
    check (email_send_status in ('pending', 'sent', 'failed'))
);

create index if not exists launch_pack_requests_requested_at_idx
  on launch_pack_requests (requested_at desc);
