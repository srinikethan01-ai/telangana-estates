import mongoose from "mongoose";
import { logger } from "./logger.js";

export async function connectMongoDB(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable must be set.");
  }
  await mongoose.connect(mongoUri.trim());
  logger.info("MongoDB Connected");
}

export default mongoose;
