import { CheckCircle2, Sparkles, FileSearch, Goal, ScanLine } from "lucide-react";

const focusedFeatures = [
  {
    icon: ScanLine,
    title: "ATS-focused review",
    desc: "Understand how your resume is likely to perform in applicant tracking systems and where it needs strengthening.",
  },
  {
    icon: FileSearch,
    title: "Keyword gap insights",
    desc: "Spot the missing terms and skill phrasing that could make your profile more relevant to the roles you want.",
  },
  {
    icon: Goal,
    title: "Actionable next steps",
    desc: "Receive a simple breakdown of what to improve first so your next revision feels sharper and more targeted.",
  },
  {
    icon: Sparkles,
    title: "Modern review experience",
    desc: "A clean, minimal workspace designed to keep the focus on your resume rather than extra noise.",
  },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <span className="feature-pill mb-4 inline-flex">
          <Sparkles size={11} className="text-indigo-400" /> Focused for v1
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ fontFamily: "'Syne',sans-serif" }}>
          A sharper experience for <span className="text-gradient">resume analysis.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/45 sm:text-lg">
          The product is intentionally streamlined so the resume review flow feels calm, modern, and easy to use.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {focusedFeatures.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass-card flex flex-col gap-4 p-7 transition-all duration-300 hover:border-white/15">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-white shadow-lg shadow-indigo-500/20">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm leading-7 text-white/55">{desc}</p>
            <div className="flex items-center gap-2 text-sm text-emerald-300">
              <CheckCircle2 size={14} />
              Included in this build
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
