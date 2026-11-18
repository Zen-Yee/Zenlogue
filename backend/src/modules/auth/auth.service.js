import db from "../../config/pool.js";
import bcrypt from "bcrypt";

export const createUser = async (username, email, password) => {

  const passwordHash = await bcrypt.hash(password, 10);

  const query = `
  INSERT INTO users ( email, username, password_hash, display_name ) 
  VALUES ($1, $2, $3, $1) 
  RETURNING user_id, email, username, display_name, avatar_url, role, status
  `;

  try {
    const result = await db.query(query, [
      email,
      username,
      passwordHash,
    ]);

    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      const error = new Error("Email or username already exists");
      error.status = 409;
      throw error;
    }

    throw err;
  }
};

export const loginUser = async (email, password) => {

  const query = `
  SELECT user_id, email, username, password_hash, display_name, avatar_url, role, status FROM users 
  WHERE email = $1
  `;

  const result = await db.query(query, [email]);

  const invalidErr = () => {
    const err = new Error("Invalid credentials");
    err.status = 401;
    return err;
  };

  if (result.rows.length === 0) throw invalidErr();

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) throw invalidErr();

  const { password_hash, ...safeUser } = user;

  return safeUser;

};

export const getUserForAuth = async (userId) => {
  const query = `
    SELECT user_id, role, status
    FROM users
    WHERE user_id = $1
    AND deleted_at IS NULL
  `;

  const result = await db.query(query, [userId]);

  return result.rows[0] ?? null;
};