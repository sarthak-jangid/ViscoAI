import { AuthenticatedRequest } from "../middlewares/isAuth.middleware.js";
import TryCatch from "../middlewares/trycatch.js";
import User from "../models/user.model.js";
import { analyseResumeWithAI } from "../services/aiServices.service.js";

export const analyseResume = TryCatch(
    async (req: AuthenticatedRequest, res) => {

        const {
            pdfBase64,
            jobTitle,
            jobDescription,
            keywords = [],
        } = req.body;

        if (!pdfBase64) {
            return res.status(400).json({
                message: "PDF data is required",
            });
        }

        const user = await User.findById(req.user?._id);

        if (!user || !user.canMakeRequest()) {
            return res.status(403).json({
                message: "Upgrade your plan to continue",
            });
        }

        try {
            const analysis = await analyseResumeWithAI({
                pdfBase64,
                jobTitle,
                jobDescription,
                keywords,
            });

            if (!user.hasProAccess()) {
                user.freeRequestUsed += 1;
                await user.save();
            }

            return res.status(200).json({
                success: true,
                analysis,
            });
        } catch (error: any) {

            return res.status(503).json({
                success: false,
                message: "AI service is busy. Please try again in a few moments.",
            });
        }
    });