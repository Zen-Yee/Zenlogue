-- Migration: 006_create_comments
-- Created: 2026-10-12
-- Depends on: 001_create_users, 003_create_posts
 
CREATE TABLE comments (
  comment_id UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID        NOT NULL REFERENCES posts(post_id)  ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES users(user_id)  ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
-- Index for loading all comments for a post (most common query)
CREATE INDEX comments_post_id_idx ON comments (post_id);
 
-- Index for loading all comments by a user
CREATE INDEX comments_user_id_idx ON comments (user_id);
 
CREATE TRIGGER comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
 