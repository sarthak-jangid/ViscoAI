import express from "express";
import { loginUser, logoutUser, myProfile } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.middleware.js";
const router = express.Router();
// POST
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.post("/logout", logoutUser);
export default router;
