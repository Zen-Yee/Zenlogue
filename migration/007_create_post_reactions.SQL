-- Migration: 007_create_post_reactions
-- Created: 2026-10-12
-- Depends on: 001_create_users, 003_create_posts
 
CREATE TABLE post_reactions (
  user_id       UUID        NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  post_id       UUID        NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  reaction_type VARCHAR(10) NOT NULL,           -- e.g. 'like', 'heart', 'fire'
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)                -- one reaction per user per post
);
 
-- Index for counting/listing reactions on a post
CREATE INDEX post_reactions_post_id_idx ON post_reactions (post_id);
 