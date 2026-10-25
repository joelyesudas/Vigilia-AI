import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is missing from .env");
    }

    // Display only the hostname, never the credentials.
    const match = uri.match(/^mongodb\+srv:\/\/[^@]+@([^/?]+)/);

    console.log("MongoDB URI scheme:", uri.split(":")[0]);
    console.log("MongoDB hostname:", match?.[1] ?? "INVALID URI FORMAT");

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;