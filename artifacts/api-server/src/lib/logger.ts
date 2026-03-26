// Simple production-safe logger — no pino workers, no thread-stream, no crashes
  const isProduction = process.env.NODE_ENV === "production";

  function formatMsg(level: string, obj: Record<string, unknown> | string, msg?: string) {
    const time = new Date().toISOString();
    if (typeof obj === "string") return `${time} [${level}] ${obj}`;
    return `${time} [${level}] ${msg ?? ""} ${JSON.stringify(obj)}`;
  }

  export const logger = {
    info: (obj: Record<string, unknown> | string, msg?: string) =>
      console.log(formatMsg("INFO", obj, msg)),
    warn: (obj: Record<string, unknown> | string, msg?: string) =>
      console.warn(formatMsg("WARN", obj, msg)),
    error: (obj: Record<string, unknown> | string, msg?: string) =>
      console.error(formatMsg("ERROR", obj, msg)),
    debug: (obj: Record<string, unknown> | string, msg?: string) =>
      isProduction ? undefined : console.debug(formatMsg("DEBUG", obj, msg)),
  };

  export default logger;
  