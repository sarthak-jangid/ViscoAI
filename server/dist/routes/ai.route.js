import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.middleware.js";
import { analyseResume } from "../controllers/ai.controller.js";
const router = Router();
router.post("/analyse", isAuth, analyseResume);
export default router;
