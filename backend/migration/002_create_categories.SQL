-- Migration: 002_create_categories
-- Created: 2026-10-12

CREATE TABLE categories (
  category_id UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) NOT NULL
    CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX categories_name_lower_idx ON categories (LOWER(name));
CREATE UNIQUE INDEX categories_slug_idx       ON categories (slug);