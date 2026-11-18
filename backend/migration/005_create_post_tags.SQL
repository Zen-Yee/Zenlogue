-- Migration: 005_create_post_tags
-- Created: 2026-10-12
-- Depends on: 003_create_posts, 004_create_tags
 
CREATE TABLE post_tags (
  post_id UUID NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  tag_id  UUID NOT NULL REFERENCES tags(tag_id)   ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
 
-- Index for looking up all posts with a given tag
CREATE INDEX post_tags_tag_id_idx ON post_tags (tag_id);
 
 -- Max 5 tags per post
CREATE FUNCTION enforce_max_post_tags()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM post_tags WHERE post_id = NEW.post_id) >= 5 THEN
    RAISE EXCEPTION 'A post can have at most 5 tags';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER post_tags_max_check
BEFORE INSERT ON post_tags
FOR EACH ROW
EXECUTE FUNCTION enforce_max_post_tags();