import { OAuth2Client } from"google-auth-library";
import { env } from "./env.config.js";

export const oAuth2Client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

