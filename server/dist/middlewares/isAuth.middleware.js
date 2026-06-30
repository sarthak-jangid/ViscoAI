import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { env } from "../config/env.config.js";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        let token = req.cookies.token;
        if (!token && authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        if (!token) {
            res.status(401).json({
                message: "Please Login - No Auth Token",
            });
            return;
        }
        const decodedToken = jwt.verify(token, env.JWT_SECRET);
        if (!decodedToken || !decodedToken._id) {
            res.status(401).json({
                message: "InValid Token ...",
            });
            return;
        }
        const user = await User.findById(decodedToken._id);
        if (!user) {
            res.status(401).json({
                message: "Token expired ...",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Please Login",
        });
        return;
    }
};
