import mongoose from "mongoose";

let isConnected = false;

export async function connectMongoDB(): Promise<void> {
  if (isConnected) return;

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable must be set.");
  }

  await mongoose.connect(mongoUri.trim(), {
    serverSelectionTimeoutMS: 10000,
  });

  isConnected = true;
  console.log("[INFO] MongoDB connected");
}

export default mongoose;
