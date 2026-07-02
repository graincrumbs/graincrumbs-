-- Extend products table so brownies, cookie tins, lite, and pro can be managed separately.

CREATE TYPE public.product_collection AS ENUM ('brownies', 'cookie_tins', 'lite', 'pro');
CREATE TYPE public.cookie_tin_variant AS ENUM ('classic', 'millet');

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS collection public.product_collection NOT NULL DEFAULT 'brownies',
  ADD COLUMN IF NOT EXISTS variant public.cookie_tin_variant;

CREATE INDEX IF NOT EXISTS products_collection_idx ON public.products (collection);
CREATE INDEX IF NOT EXISTS products_collection_variant_idx ON public.products (collection, variant);
