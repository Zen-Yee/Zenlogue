import db from "../../config/pool.js";

export const getCommentsByPost = async (postId, cursor, limit = 20) => {

  const query = cursor
    ? `
      SELECT * FROM public.comments
      WHERE post_id = $1 AND created_at < $2
      ORDER BY created_at DESC
      LIMIT $3
    `
    : `
      SELECT * FROM public.comments
      WHERE post_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;

  const params = cursor ? [postId, cursor, limit] : [postId, limit];
  const result = await db.query(query, params);

  return result.rows;
};