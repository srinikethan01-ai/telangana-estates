import app from "./app.js";
import { logger } from "./lib/logger.js";
import { connectMongoDB } from "./lib/mongodb.js";

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(process.env.PORT || 10000);

if (isNaN(PORT) || PORT <= 0) {
  console.error("Invalid PORT:", process.env.PORT);
  process.exit(1);
}

app.listen(PORT, "0.0.0.0", () => {
  logger.info({ port: PORT }, "Server listening");
  connectMongoDB()
    .then(() => logger.info("MongoDB connected"))
    .catch((err) => logger.error({ err }, "MongoDB connection failed"));
});

process.on("uncaughtException", (err) => {
  logger.error({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.warn({ reason }, "Unhandled rejection");
});
