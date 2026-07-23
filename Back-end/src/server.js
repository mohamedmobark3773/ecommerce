import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { connectDB } from "./config/database.js";

// Load environment variables
dotenv.config();

if (process.env.NODE_ENV !== "production") {
  console.log("Starting Ecommerce Backend...");
}

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

let server;

const startServer = async () => {
  try {
    console.log("🚀 Starting Ecommerce Backend...");

    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`✅ Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error(err.name, err.message);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down...`);

  if (server) {
    server.close(async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();