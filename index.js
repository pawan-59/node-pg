import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectToPostgres, getPool } from "./db.js";
import { config } from "./config.js";

async function bootstrap() {
  await connectToPostgres(); // DB dependency at startup

  const app = express();

  app.get("/health", async (_req, res) => {
    try {
      await getPool().query("SELECT 1");
      res.json({ status: "ok", db: "up" });
    } catch {
      res.status(500).json({ status: "error", db: "down" });
    }
  });

  app.listen(config.app.port, () => {
    console.log(`🚀 Server running on port ${config.app.port}`);
  });
}

bootstrap();
