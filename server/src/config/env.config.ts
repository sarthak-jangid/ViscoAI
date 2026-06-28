import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "PORT", "GOOGLE_CLIENT_ID", "GOOGLE_SECRET", "JWT_SECRET"] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable: ${envVar}`);
  }
}

export const env = {
  MONGO_URI: process.env.MONGO_URI!,
  PORT: Number(process.env.PORT) || 3000,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  JWT_SECRET: process.env.JWT_SECRET
};