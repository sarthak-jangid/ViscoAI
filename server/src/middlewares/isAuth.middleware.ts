import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model.js";
import { env } from "../config/env.config.js";

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {

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

        const decodedToken = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;

        if (!decodedToken || !decodedToken._id) {
            res.status(401).json({
                message: "InValid Token ...",
            })
            return;
        }

        const user = await User.findById(decodedToken._id);
        if (!user) {
            res.status(401).json({
                message: "Token expired ...",
            })
            return;
        }

        req.user = user;

        next();

    } catch (error: any) {
        console.log(error.message);
        res.status(500).json({
            message: "Please Login",
        });

        return;
    }
};