-- Migration: 004_create_tags
-- Created: 2026-10-12

CREATE TABLE tags (
  tag_id     UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(50) NOT NULL UNIQUE
    CHECK (name = LOWER(BTRIM(name)) AND name <> ''),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);