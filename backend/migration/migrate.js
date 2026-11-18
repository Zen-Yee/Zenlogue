
import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const { Client } = pg;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, "..", ".env.development"),
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const migrationsDir = __dirname;

const run = async () => {
  await client.connect();
  console.log("Connected to database");

  const result = await client.query(`
    SELECT current_database(), current_user;
  `);

  console.log("Connected database:", result.rows[0]);

  const files = fs.readdirSync(migrationsDir).sort();

  console.log("Migration directory:", migrationsDir);
  console.log("Files found:", files);

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;

    console.log(`Running ${file}...`);

    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      "utf8"
    );

    await client.query(sql);

    console.log(`✓ ${file}`);
  }

  await client.end();
  console.log("All migrations complete.");
};

run().catch(async (err) => {
  console.error("Migration failed:", err);

  await client.end().catch(() => {});
  process.exitCode = 1;
});