import express from "express";

  const app = express();
  const PORT = Number(process.env.PORT || 10000);

  if (isNaN(PORT) || PORT <= 0) {
    console.error("Invalid PORT:", process.env.PORT);
    process.exit(1);
  }

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", port: PORT, node: process.version });
  });

  app.get("/", (_req, res) => {
    res.json({ message: "Telangana Estates API", version: process.version });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server started on port", PORT);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:", reason);
  });
  