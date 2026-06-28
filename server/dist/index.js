import express from "express";
import dotenv from "dotenv";
import { env } from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Routes
import userRoutes from "./routes/user.route.js";
dotenv.config();
await connectDB();
const app = express();
const allowedOrigin = "http://localhost:5173";
app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// console.log("request came to backend...")
app.use("/api/user", userRoutes);
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
