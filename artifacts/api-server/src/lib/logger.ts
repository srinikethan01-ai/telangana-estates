import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const pinoOptions = {
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
};

export const logger = isProduction
  ? pino(pinoOptions, pino.destination({ sync: true }))
  : pino({
      ...pinoOptions,
      transport: {
        target: "pino-pretty",
        options: { colorize: true },
      },
    });
