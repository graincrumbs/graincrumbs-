-- Add order_number column starting at 101
-- We use a sequence starting at 101 so the very first order gets #101

CREATE SEQUENCE IF NOT EXISTS public.orders_order_number_seq START WITH 101;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS order_number INTEGER NOT NULL DEFAULT nextval('public.orders_order_number_seq');

-- Make the sequence owned by the column so it drops together
ALTER SEQUENCE public.orders_order_number_seq OWNED BY public.orders.order_number;

-- Unique index for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS orders_order_number_idx ON public.orders (order_number);
