import express, { type Express } from "express";
  import cors from "cors";
  import session from "express-session";
  import path from "path";
  import { fileURLToPath } from "url";
  import fsSync from "fs";
  import router from "./routes/index.js";
  import { logger } from "./lib/logger.js";

  const app: Express = express();

  // CORS — allow Vercel frontend + local dev
  const allowedOrigins = [
    "https://telangana-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ];
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow server-to-server
        const allowed = allowedOrigins.some((o) => origin === o) ||
          origin.endsWith(".vercel.app");
        callback(null, allowed);
      },
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || "telangana-estates-secret-2024",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  );

  // Render health check — always responds immediately
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // API routes
  app.use("/api", router);

  // Serve built frontend static files in production
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const frontendPath = path.resolve(currentDir, "../../telangana-estates/dist/public");

  if (fsSync.existsSync(frontendPath)) {
    logger.info("Serving frontend static files");
    app.use(express.static(frontendPath));
    app.get("*", (_req, res) => {
      const indexFile = path.join(frontendPath, "index.html");
      if (fsSync.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(200).json({ status: "ok" });
      }
    });
  } else {
    app.get("/", (_req, res) => {
      res.json({ status: "ok", service: "Telangana Estates API" });
    });
  }

  export default app;
  