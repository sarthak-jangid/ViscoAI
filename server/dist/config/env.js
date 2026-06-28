import dotenv from "dotenv";
dotenv.config();
const requiredEnvVars = ["MONGO_URI", "PORT"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
    }
}
export const env = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: Number(process.env.PORT) || 3000,
};
