import express from "express";
import dotenv from "dotenv";
import { env } from "./config/env.config.js"
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Razorpay from "razorpay";

// Routes
import userRoutes from "./routes/user.route.js";
import aiRoutes from "./routes/ai.route.js";
import paymentRoutes from "./routes/payment.route.js"

dotenv.config();
export const instance = new Razorpay({
  key_id: env.RAZORPAY_KEY!,
  key_secret: env.RAZORPAY_KEY_SECRET!,
})
await connectDB();

const app = express();

const allowedOrigin = env.FRONTEND_URL;
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "20mb",
}));


// Routes ...
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes)
app.use("/api/payment", paymentRoutes)


// Listen
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})