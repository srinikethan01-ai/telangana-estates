import mongoose from "mongoose";
import { logger } from "./logger";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI must be set.");
}

const MONGO_URI = process.env.MONGO_URI.trim();

export async function connectMongoDB(): Promise<void> {
  await mongoose.connect(MONGO_URI);
  logger.info("MongoDB Connected");
}

export default mongoose;
