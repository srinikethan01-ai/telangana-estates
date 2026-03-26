import app from "./app.js";
  import { connectMongoDB } from "./lib/mongodb.js";
  import { logger } from "./lib/logger.js";

  const PORT = Number(process.env.PORT || 10000);

  connectMongoDB()
    .then(() => {
      app.listen(PORT, "0.0.0.0", () => {
        logger.info({ port: PORT }, "Server listening");
      });
    })
    .catch((err) => {
      logger.error({ err }, "Failed to connect to MongoDB — check MONGO_URI env var");
      process.exit(1);
    });

  process.on("uncaughtException", (err) => {
    logger.error({ err }, "Uncaught exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.error({ reason }, "Unhandled rejection");
    process.exit(1);
  });
  