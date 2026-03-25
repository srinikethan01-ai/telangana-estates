import express from "express";
import { logger } from "./lib/logger.js";

const app = express();
const PORT = Number(process.env.PORT || 10000);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", test: "logger-only" });
});

app.listen(PORT, "0.0.0.0", () => {
  logger.info({ port: PORT }, "Server listening - logger test");
});

process.on("uncaughtException", (err) => {
  console.error("CRASH:", err.message, err.stack);
  process.exit(1);
});
