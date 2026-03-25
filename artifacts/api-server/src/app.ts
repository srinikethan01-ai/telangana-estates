import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
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

// API routes
app.use("/api", router);

// Serve built frontend static files in production
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.resolve(
  currentDir,
  "../../telangana-estates/dist/public"
);

if (fs.existsSync(frontendPath)) {
  logger.info({ frontendPath }, "Serving frontend static files");
  app.use(express.static(frontendPath));

  // SPA fallback — serve index.html for any non-API route
  app.get("*", (_req, res) => {
    const indexFile = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      res.status(200).json({ status: "ok", service: "Telangana Estates API" });
    }
  });
} else {
  logger.warn({ frontendPath }, "Frontend build not found — serving API only");
  app.get("/", (_req, res) => {
    res.json({ status: "ok", service: "Telangana Estates API" });
  });
}

export default app;
