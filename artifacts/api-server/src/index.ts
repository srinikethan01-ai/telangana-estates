import app from "./app.js";
import { connectMongoDB } from "./lib/mongodb.js";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`[INFO] Server listening on port ${port}`);
});

connectMongoDB()
  .then(() => {
    console.log("[INFO] MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("[ERROR] MongoDB connection failed:", err?.message || err);
  });

process.on("uncaughtException", (err) => {
  console.error("[ERROR] Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[ERROR] Unhandled rejection:", reason);
});
