import {
    AlertCircle,
    ArrowUpRight,
    Briefcase,
    CheckCircle2,
    FileText,
    Loader2,
    Search,
    Sparkles,
    Target,
    TrendingUp,
    UploadCloud,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppData } from "../context/AppContext";
import { server } from "../main";
import type { Analysis } from "../types";
import { toBase64 } from "../utils";

function Analyse() {
    const { user } = useAppData();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [stage, setStage] = useState<"upload" | "ready">("upload");
    const [jobTitle, setJobTitle] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [jobDescription, setJobDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [analysis, setAnalysis] = useState<Analysis | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            toast.error("Please upload a resume.");
            return;
        }

        setSelectedFile(file);
        setStage("ready");
        setAnalysis(null);
        setError("");

        toast.success(`${file.name} is ready for review`);
    };

    const keywordList = useMemo(() => {
        return keywords
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
    }, [keywords]);

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError("Upload a resume first to continue.");
            toast.error("Upload a resume first to continue");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const pdfBase64 = await toBase64(selectedFile);

            const response = await axios.post(
                `${server}/api/ai/analyse`,
                {
                    pdfBase64,
                    jobTitle: jobTitle.trim(),
                    jobDescription: jobDescription.trim(),
                    keywords: keywordList,
                },
                {
                    withCredentials: true,
                },
            );

            const payload = response.data?.analysis;
            if (!payload) {
                throw new Error("No analysis data was returned from the server.");
            }

            setAnalysis(payload);
            setStage("ready");

            toast.success("Resume analyzed successfully!");
        } catch (error: unknown) {
            console.error(error);
            const message = axios.isAxiosError(error)
                ? error.response?.data?.message || error.message || "Failed to analyze resume."
                : error instanceof Error
                    ? error.message
                    : "Failed to analyze resume.";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-page px-4 pb-16 pt-28">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <div className="glass-card overflow-hidden p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="feature-pill mb-4 w-fit">
                                <Sparkles size={12} className="text-emerald-400" />
                                V1 • Tailored Resume Review
                            </div>
                            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                                Review your resume for the exact role you want.
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
                                Upload a resume and add the job title, job description, and
                                keywords so the review is based on what recruiters are actually
                                screening for.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                            <p className="font-semibold">
                                Welcome back, {user?.name?.split(" ")[0] || "there"}
                            </p>
                            <p className="mt-1 text-emerald-100/80">
                                Focused review is ready for your target role.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="glass-card p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                                <UploadCloud size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Upload + tailor your analysis
                                </h2>
                                <p className="text-sm text-white/45">
                                    PDF or DOCX files work in this version.
                                </p>
                            </div>
                        </div>

                        <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center transition hover:border-indigo-400/50 hover:bg-white/8">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-indigo-300">
                                <FileText size={24} />
                            </div>
                            <p className="mt-4 text-base font-semibold text-white">
                                Drop your resume here
                            </p>
                            <p className="mt-2 text-sm text-white/45">
                                or click to browse from your device
                            </p>
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                        </label>

                        <div className="mt-4 rounded-2xl border border-white/8 bg-[#0f172a]/70 px-4 py-3 text-sm text-white/60">
                            {stage === "ready"
                                ? `Ready to review: ${selectedFile?.name}`
                                : "No file selected yet"}
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="flex flex-col gap-2 text-sm text-white/60">
                                <span className="flex items-center gap-2 font-medium text-white/75">
                                    <Briefcase size={15} className="text-indigo-300" /> Job title
                                </span>
                                <input
                                    value={jobTitle}
                                    onChange={(event) => setJobTitle(event.target.value)}
                                    placeholder="e.g. Product Designer"
                                    className="input-field"
                                />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-white/60">
                                <span className="flex items-center gap-2 font-medium text-white/75">
                                    <Search size={15} className="text-emerald-300" /> Keywords
                                </span>
                                <input
                                    value={keywords}
                                    onChange={(event) => setKeywords(event.target.value)}
                                    placeholder="React, Figma, UX, SQL"
                                    className="input-field"
                                />
                            </label>
                        </div>

                        <label className="mt-4 flex flex-col gap-2 text-sm text-white/60">
                            <span className="flex items-center gap-2 font-medium text-white/75">
                                <Target size={15} className="text-amber-300" /> Job description
                            </span>
                            <textarea
                                value={jobDescription}
                                onChange={(event) => setJobDescription(event.target.value)}
                                rows={8}
                                placeholder="Paste the job description here to make the analysis more accurate and role-specific."
                                className="input-field min-h-36 resize-y"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="btn-primary mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    Analyze Resume
                                    <ArrowUpRight size={16} />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="glass-card p-6 sm:p-8">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/35">
                                        Role-based review
                                    </p>
                                    <h3 className="mt-2 text-2xl font-semibold">
                                        ATS alignment preview
                                    </h3>
                                </div>
                                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-2xl font-black text-emerald-300">
                                    {analysis?.atsScore ?? 84}
                                </div>
                            </div>

                            {error ? (
                                <div className="mt-6 flex items-start gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            ) : null}

                            <div className="mt-6 rounded-2xl border border-white/8 bg-white/5 p-4 text-sm leading-7 text-white/60">
                                {loading ? (
                                    <div className="flex items-center gap-2 text-emerald-300">
                                        <Loader2 size={16} className="animate-spin" />
                                        Reviewing your resume against the role requirements...
                                    </div>
                                ) : (
                                    analysis?.summary ??
                                    "Add the role details and upload your resume to see a tailored ATS review focused on job matching, keyword coverage, and improvement areas."
                                )}
                            </div>

                            {analysis ? (
                                <>
                                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">Target role</p>
                                            <p className="mt-2 text-sm font-semibold text-white">{analysis.targetRole || analysis.detectedRole || "Role not detected"}</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">Analysis mode</p>
                                            <p className="mt-2 text-sm font-semibold text-white">{analysis.analysisMode === "targeted" ? "Targeted" : "General"}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        {Object.entries(analysis.scoreBreakdown).map(([key, block]) => (
                                            <div key={key} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-semibold capitalize text-white">{key}</p>
                                                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                                                        {block.score}/100
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-sm text-white/60">{block.feedback}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">Matched keywords</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {analysis.matchedKeywords.length ? (
                                                    analysis.matchedKeywords.map((item) => (
                                                        <span key={item} className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
                                                            {item}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-white/45">No matched keywords detected.</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                                            <p className="text-xs uppercase tracking-[0.2em] text-white/35">Missing keywords</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {analysis.missingKeywords.length ? (
                                                    analysis.missingKeywords.map((item) => (
                                                        <span key={item} className="rounded-full border border-amber-400/20 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
                                                            {item}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-white/45">No missing keywords detected.</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-white/8 bg-white/5 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">Strengths</p>
                                        <ul className="mt-3 space-y-2">
                                            {analysis.strengths.length ? (
                                                analysis.strengths.map((item) => (
                                                    <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                                                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-300" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="text-sm text-white/45">No strength notes were returned.</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-white/8 bg-white/5 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/35">Suggestions</p>
                                        <div className="mt-3 space-y-3">
                                            {analysis.suggestions.length ? (
                                                analysis.suggestions.map((item) => (
                                                    <div key={`${item.category}-${item.issue}`} className="rounded-2xl border border-white/8 bg-[#0f172a]/70 p-3">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <p className="text-sm font-semibold text-white">{item.category}</p>
                                                            <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-indigo-300">
                                                                {item.priority}
                                                            </span>
                                                        </div>
                                                        <p className="mt-2 text-sm text-white/60">{item.issue}</p>
                                                        <p className="mt-1 text-sm text-white/45">{item.recommendation}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-white/45">No extra suggestions were returned.</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>

                        <div className="glass-card p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
                                    <TrendingUp size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        What this review focuses on
                                    </h3>
                                    <p className="text-sm text-white/45">
                                        A role-specific review experience.
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-5 space-y-3 text-sm text-white/65">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" />{" "}
                                    ATS fit based on your target role and description
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" />{" "}
                                    Keyword coverage compared against the role requirements
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" />{" "}
                                    Clear suggestions to strengthen your resume for that job
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analyse;
