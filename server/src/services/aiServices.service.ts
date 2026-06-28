import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.config.js";
import { ResumeAnalyserPrompt } from "../config/prompt.js";

const ai = new GoogleGenAI({
    apiKey: env.GOOGLE_GEMINI_API_KEY!,
});

interface AnalyseResumeWithAIProps {
    pdfBase64: string;
    jobTitle?: string;
    jobDescription?: string;
    keywords?: string[];
}

export async function analyseResumeWithAI({
    pdfBase64,
    jobTitle = "",
    jobDescription = "",
    keywords = [],
}: AnalyseResumeWithAIProps) {

    const prompt = ResumeAnalyserPrompt({
        jobTitle,
        jobDescription,
        keywords,
    });

    const cleanPdf = pdfBase64.replace(
        /^data:application\/pdf;base64,/,
        ""
    );

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
            responseMimeType: "application/json",
        },
        contents: [
            {
                role: "user",
                parts: [
                    {
                        text: prompt,
                    },
                    {
                        inlineData: {
                            mimeType: "application/pdf",
                            data: cleanPdf,
                        },
                    },
                ],
            },
        ],
    });

    const rawText = response.text;

    if (!rawText) {
        throw new Error("AI returned an empty response.");
    }

    return JSON.parse(rawText);
}