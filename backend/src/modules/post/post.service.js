import db from "../../config/pool.js";

export const getPosts = async (limit, offset, search = "") => {
  const term = search.trim();

  const query = `
    SELECT * FROM public.posts
    WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
    ORDER BY post_id
    LIMIT $2
    OFFSET $3
  `;

  const result = await db.query(query, [term, limit, offset]);
  return result.rows;
};

export const getPostById = async (postId) => {

  const query = `
      SELECT * FROM public.posts
      WHERE post_id = $1
    `;

  const result = await db.query(query, [postId]);

  return result.rows[0];
};

export const createPost = async (post_title, post_content, user_id) => {

  const query = `
    INSERT INTO public.posts (title, content, author_id)
      VALUES ($1,$2,$3)
      RETURNING *;
  `;

  const result = await db.query(query, [post_title, post_content, user_id]);
  return result.rows[0];
};

export const updatePost = async (postId, post_title, post_content, userId) => {

  const query = `
    UPDATE public.posts 
      SET title = $1, content = $2
      WHERE post_id = $3 AND author_id = $4
      RETURNING *;
  `;

  const result = await db.query(query, [post_title, post_content, postId, userId]);
  return result.rows[0];
};

export const deletePost = async (postId, userId) => {

  const query = `
    DELETE FROM public.posts
      WHERE post_id = $1 AND author_id = $2
      RETURNING *;
  `;

  const result = await db.query(query, [postId, userId]);
  return result.rows[0];
};

export const getTotal = async (search = "") => {
  const term = search.trim();

  const query = `
    SELECT COUNT(*) AS count FROM public.posts
    WHERE ($1 = '' OR title ILIKE '%' || $1 || '%')
  `;

  const result = await db.query(query, [term]);
  return Number(result.rows[0].count);
};