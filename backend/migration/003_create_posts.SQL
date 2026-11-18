-- Migration: 003_create_posts
-- Created: 2026-10-12
-- Depends on: 001_create_users, 002_create_categories

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE posts (
  post_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- RESTRICT: users are soft-deleted via users.deleted_at. A hard delete is
  -- only done by the purge script, which first reassigns posts to the
  -- Anonymous system account.
  author_id UUID NOT NULL
    REFERENCES users(user_id) ON DELETE RESTRICT,

  -- Nullable so drafts can exist without a category;
  -- required before publishing (see CHECK below).
  -- Categories are retired with is_active, never deleted.
  category_id UUID
    REFERENCES categories(category_id) ON DELETE RESTRICT,

  title VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) NOT NULL
    CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  content JSONB NOT NULL,
  content_text TEXT NOT NULL,
  cover_image_url TEXT,

  status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),

published_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ NULL,

  CONSTRAINT posts_published_requires_category
    CHECK (status <> 'published' OR category_id IS NOT NULL)
);

-- Unique slug among non-deleted posts
CREATE UNIQUE INDEX posts_slug_unique_idx
ON posts (slug)
WHERE deleted_at IS NULL;

-- "My posts" dashboard (author + status, newest first)
CREATE INDEX posts_author_status_created_idx
ON posts (author_id, status, created_at DESC)
WHERE deleted_at IS NULL;

-- Public listing, all categories
CREATE INDEX posts_published_at_idx
ON posts (published_at DESC)
WHERE status = 'published'
  AND deleted_at IS NULL;

  -- Public listing filtered by category
CREATE INDEX posts_category_published_at_idx
ON posts (category_id, published_at DESC)
WHERE status = 'published'
  AND deleted_at IS NULL;

-- Search (substring matching with ILIKE '%word%')
CREATE INDEX posts_title_trgm_idx
ON posts USING GIN (title gin_trgm_ops);

CREATE INDEX posts_content_text_trgm_idx
ON posts USING GIN (content_text gin_trgm_ops);

-- Set published_at the first time a post becomes published
CREATE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_set_published_at
BEFORE INSERT OR UPDATE OF status ON posts
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- Auto-update updated_at, except when only the author is being reassigned
-- (the purge job moves posts to the Anonymous account; that shouldn't
-- change the post's "last updated" date)
CREATE TRIGGER posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
WHEN (OLD.author_id IS NOT DISTINCT FROM NEW.author_id)
EXECUTE FUNCTION update_updated_at();