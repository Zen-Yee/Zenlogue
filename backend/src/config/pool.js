import pg from "pg";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.development",
});

const { Pool } = pg;

// Create a single connection pool instance
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

// Optional: simple connection test on startup
db.connect()
  .then(client => {
    console.log("Connected to PostgreSQL");
    client.release();
  })
  .catch(err => console.error("Database connection error:", err.stack));

// Export db pool so other modules can use it
export default db;