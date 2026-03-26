import pino from "pino";

  const isProduction = process.env.NODE_ENV === "production";

  export const logger = isProduction
    ? pino(
        { level: process.env.LOG_LEVEL ?? "info" },
        // sync:true avoids thread-stream workers which break in esbuild bundles
        pino.destination({ sync: true })
      )
    : pino({
        level: process.env.LOG_LEVEL ?? "info",
        transport: {
          target: "pino-pretty",
          options: { colorize: true },
        },
      });
  