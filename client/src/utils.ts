import { MessageSquare, FileText, BarChart2, Compass, ScanText, Briefcase, FileEdit } from "lucide-react";

export const plans = [
    {
        name: "Free",
        price: "₹0",
        period: "",
        badge: null,
        desc: "Try before you commit",
        features: [
            "3 AI requests total",
            "ATS score report",
            "Basic job matches",
            "1 resume template",
            "Community support",
        ],
        cta: "Start Free",
        highlight: false,
    },
    {
        name: "Pro Monthly",
        price: "₹299",
        period: "/ month",
        badge: "Most Flexible",
        desc: "Full access, cancel anytime",
        features: [
            "Unlimited resume analyses",
            "Full ATS + strength/weakness report",
            "Unlimited job matching",
            "All resume templates + PDF export",
            "Unlimited interview prep",
            "Priority AI processing",
            "Email support",
        ],
        cta: "Get Pro Monthly",
        highlight: false,
    },
    {
        name: "Pro 6-Month",
        price: "₹1499",
        period: "/ 6 months",
        badge: "Best Value",
        desc: "Save 17% vs monthly",
        features: [
            "Everything in Pro Monthly",
            "Early access to new features",
            "Resume review by AI weekly",
            "LinkedIn profile tips",
            "Dedicated support",
        ],
        cta: "Get Best Value",
        highlight: true,
    },
];

export const Features = [
    {
        icon: ScanText,
        color: "from-indigo-500 to-violet-500",
        glow: "shadow-indigo-500/20",
        title: "AI Resume Analyser",
        desc: "Upload your resume and get an instant ATS compatibility score. Our AI pinpoints strengths, weaknesses, missing keywords, and formatting issues so you can fix them before recruiters even see it.",
        bullets: [
            "ATS score out of 100",
            "Strengths & weaknesses breakdown",
            "Keyword gap analysis",
            "Section-by-section feedback",
        ],
    },
    {
        icon: Briefcase,
        color: "from-emerald-500 to-teal-400",
        glow: "shadow-emerald-500/20",
        title: "Smart Job Matcher",
        desc: "After analysing your resume, CareerAI matches you with roles that actually fit your skills and experience — no more applying blindly and wondering why you hear nothing back.",
        bullets: [
            "Personalised job recommendations",
            "Match % per role",
            "Skill gap for each job",
            "One-click apply guidance",
        ],
    },
    {
        icon: FileEdit,
        color: "from-pink-500 to-rose-400",
        glow: "shadow-pink-500/20",
        title: "AI Resume Creator",
        desc: "Answer a few questions about your experience and goals. Our AI crafts a recruiter-ready, ATS-optimised resume tailored to the roles you're targeting.",
        bullets: [
            "Auto-generated content",
            "Industry-specific templates",
            "ATS-friendly formatting",
            "Export as PDF instantly",
        ],
    },
    {
        icon: MessageSquare,
        color: "from-amber-500 to-orange-400",
        glow: "shadow-amber-500/20",
        title: "Interview Preparation",
        desc: "Get personalised interview questions based on your skills or resume. Practice with AI feedback, sharpen your answers, and walk into every interview with confidence.",
        bullets: [
            "Resume-based question sets",
            "Skill-specific practice",
            "AI answer feedback",
            "Behavioural & technical rounds",
        ],
    },
];

export const features = [
    { icon: FileText, label: "Resume Builder" },
    { icon: BarChart2, label: "Resume Analyser" },
    { icon: Compass, label: "Career Guide" },
    { icon: MessageSquare, label: "Interview Prep" },
];

export function toBase64(file: File): Promise<string> {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = rej;
        r.readAsDataURL(file);
    });
}

export const prioBg = {
    high: "bg-red-500/10 border-red-500/20",
    medium: "bg-amber-500/10 border-amber-500/20",
    low: "bg-emerald-500/10 border-emerald-500/20",
};
export const prioColor = {
    high: "text-red-400",
    medium: "text-amber-400",
    low: "text-emerald-400",
};
export const prioEmoji = { high: "🔴", medium: "🟡", low: "🟢" };