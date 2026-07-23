import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      retryWrites: true,
      authSource: "admin",
      tls: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};