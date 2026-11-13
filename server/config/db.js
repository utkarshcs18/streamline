import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "\n⚠️  [MongoDB Warning]: MONGODB_URI is not defined in your environment (.env).\n" +
      "👉 To connect MongoDB: Create a free cluster at https://www.mongodb.com/cloud/atlas\n" +
      "   and set MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/streamline\n"
    );
    return false;
  }

  if (isConnected) {
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error("❌ [MongoDB Connection Error]:", error.message);
    return false;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("⚠️  [MongoDB Disconnected]");
});

export default connectDB;
