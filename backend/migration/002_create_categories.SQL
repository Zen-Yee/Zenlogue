-- Migration: 002_create_categories
-- Created: 2026-10-12
 
CREATE TABLE categories (
  category_id UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(100) UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);