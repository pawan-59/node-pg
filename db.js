import pkg from "pg";
const { Pool } = pkg;
import { config } from "./config.js";

let pool;

export async function connectToPostgres() {
  pool = new Pool({
    ...config.postgres,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed");
    console.error(err.message);
    process.exit(1); // important for containers
  }
}

export function getPool() {
  if (!pool) {
    throw new Error("Postgres not initialized");
  }
  return pool;
}
