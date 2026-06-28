import express from "express";
import dotenv from "dotenv";
import { env } from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Routes
import userRoutes from "./routes/user.route.js";
import aiRoutes from "./routes/ai.route.js";
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
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "20mb",
}));
// console.log("request came to backend...")
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
