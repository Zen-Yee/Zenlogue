-- Migration: 003_create_posts
-- Created: 2026-10-12
-- Depends on: 001_create_users, 002_create_categories

CREATE TABLE posts (
  post_id       UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID         NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  category_id   UUID         REFERENCES categories(category_id) ON DELETE SET NULL,
  title         VARCHAR(255) NOT NULL,
  content       JSONB        NOT NULL DEFAULT '{}',
  cover_image   TEXT,
  status        VARCHAR(20)  NOT NULL DEFAULT 'draft',
  search_vector TSVECTOR,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index for fast full-text search
CREATE INDEX posts_search_vector_idx ON posts USING GIN (search_vector);

-- Index for listing posts by user
CREATE INDEX posts_user_id_idx ON posts (user_id);

-- Index for listing posts by category
CREATE INDEX posts_category_id_idx ON posts (category_id);

-- Index for filtering by status (draft / published)
CREATE INDEX posts_status_idx ON posts (status);

-- Auto-update updated_at
CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update search_vector from title + plain-text content
-- TipTap stores JSON; we cast content to text for basic indexing.
-- Upgrade this later with a proper JSON-to-text extractor if needed.
CREATE OR REPLACE FUNCTION posts_update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector =
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.content::text, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_search_vector_update
  BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION posts_update_search_vector();