import app from "./app.js";
  import { connectMongoDB } from "./lib/mongodb.js";
  import { logger } from "./lib/logger.js";

  const PORT = Number(process.env.PORT || 10000);

  // Start HTTP server immediately so Render's health check passes right away
  const server = app.listen(PORT, "0.0.0.0", () => {
    logger.info({ port: PORT }, "Server listening");
  });

  // Connect to MongoDB after server is up — don't block startup
  connectMongoDB()
    .then(() => {
      logger.info("MongoDB connected successfully");
    })
    .catch((err) => {
      logger.error({ err }, "MongoDB connection failed — check MONGO_URI env var");
      // Don't exit — server stays up so health check keeps passing
    });

  process.on("uncaughtException", (err) => {
    logger.error({ err }, "Uncaught exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error({ reason }, "Unhandled rejection");
  });
  