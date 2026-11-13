import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return false;
  }

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });
    isConnected = conn.connections[0].readyState === 1;
    return true;
  } catch (err) {
    console.error("MongoDB connection failed in Next.js API:", err);
    return false;
  }
}
