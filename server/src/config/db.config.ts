import mongoose from "mongoose";
import { env } from "./env.config.js";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI, {
            dbName: "skill-match"
        });
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;