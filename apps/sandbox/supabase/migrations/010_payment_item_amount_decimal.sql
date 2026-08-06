-- Allow fractional amounts (e.g. £12.50)
alter table payment_items
  alter column amount type numeric(12, 2)
  using amount::numeric(12, 2);
