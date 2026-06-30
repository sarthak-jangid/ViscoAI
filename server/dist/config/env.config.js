import dotenv from "dotenv";
dotenv.config();
const requiredEnvVars = ["MONGO_URI", "PORT", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET", "JWT_SECRET", "GOOGLE_GEMINI_API_KEY", "RAZORPAY_KEY", "RAZORPAY_KEY_SECRET", "FRONTEND_URL"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
}
export const env = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT) || 3000,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY,
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
};
