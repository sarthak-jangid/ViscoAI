import TryCatch from "../middlewares/trycatch.js";
import { oAuth2Client } from "../config/google.config.js";
import { env } from "../config/env.config.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const loginUser = TryCatch(async (req, res) => {
    // console.log("request came to backend... Login route ")
    console.log(req.body);
    const { credential } = req.body;
    if (!credential) {
        return res.status(400).json({
            message: "Authorization code is required ..."
        });
    }
    const googleRes = await oAuth2Client.verifyIdToken({
        idToken: credential,
        audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = googleRes.getPayload();
    if (!payload) {
        return res.status(401).json({
            success: false,
            message: "Invalid Google Token",
        });
    }
    const { email, name, picture, sub } = payload;
    if (!email || !name || !picture) {
        return res.status(400).json({
            success: false,
            message: "Incomplete Google profile"
        });
    }
    let user = await User.findOne({
        googleId: sub
    });
    if (!user) {
        user = await User.create({
            googleId: sub,
            email,
            name,
            image: picture
        });
    }
    const token = jwt.sign({
        _id: user._id,
    }, env.JWT_SECRET, {
        expiresIn: "7d",
    });
    const isProduction = process.env.NODE_ENV === "production";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
        success: true,
        message: "Login successfully",
        user,
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json({
        message: "user",
        user
    });
});
export const logoutUser = TryCatch(async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});
