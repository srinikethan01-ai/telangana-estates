import app from "./app.js";
import { logger } from "./lib/logger.js";
import { connectMongoDB } from "./lib/mongodb.js";

// ✅ Root route
app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ Health check (must respond before MongoDB is ready)
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const rawPort = process.env["PORT"] || "10000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Start listening immediately so Render's health check passes
app.listen(port, () => {
  logger.info({ port }, "Server listening 🚀");

  // Connect to MongoDB after server is already accepting requests
  connectMongoDB()
    .then(() => {
      logger.info("MongoDB connected successfully");
    })
    .catch((err) => {
      logger.error({ err }, "Failed to connect to MongoDB — API routes requiring DB will fail");
    });
});
