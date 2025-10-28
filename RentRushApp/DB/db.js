// db.js
import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    console.log("Loading ENV variables...");
    console.log("MONGO_URI:", process.env.MONGO_URI);

    await mongoose.connect("mongodb://127.0.0.1:27017/rentrush", {
      serverSelectionTimeoutMS: 60000,
    });

    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default dbconnect;
