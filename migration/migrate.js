import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const { Client } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const migrationsDir = path.join(__dirname, "migrations");

const run = async () => {
  await client.connect();
  console.log("Connected to database");

  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!file.endsWith(".sql")) continue;
    console.log(`Running ${file}...`);
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await client.query(sql);
    console.log(`✓ ${file}`);
  }

  await client.end();
  console.log("All migrations complete.");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});