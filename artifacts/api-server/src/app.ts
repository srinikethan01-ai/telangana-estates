import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import router from "./routes/index.js";

const app: Express = express();

const allowedOrigins = [
  "https://telangana-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed =
        allowedOrigins.some((o) => origin === o) ||
        origin.endsWith(".vercel.app") ||
        origin.endsWith(".replit.app") ||
        origin.endsWith(".replit.dev");
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

app.use("/api", router);

export default app;
