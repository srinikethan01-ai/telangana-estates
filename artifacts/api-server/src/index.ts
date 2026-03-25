import app from "./app.js";
import { logger } from "./lib/logger.js";
import { connectMongoDB } from "./lib/mongodb.js";

// ✅ Add ROOT route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ✅ Optional health route (good for testing)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const rawPort = process.env["PORT"] || "10000"; // fallback for safety
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

connectMongoDB()
  .then(() => {
    app.listen(port, () => {
      logger.info({ port }, "Server listening 🚀");
    });
  })
  .catch((err) => {
    logger.error({ err }, "Failed to connect to MongoDB");
    process.exit(1);
  });
