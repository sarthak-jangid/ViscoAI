import { ArrowRight, ChevronRight, Sparkles, FileCheck2, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppData } from "../context/AppContext";

function Hero() {
  const { isAuth } = useAppData();

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-8 lg:px-12">
      <div className="orb h-[26rem] w-[26rem] -top-24 left-1/2 -translate-x-1/2 bg-indigo-600" style={{ opacity: 0.14 }} />
      <div className="orb bottom-8 right-4 h-56 w-56 bg-emerald-500" style={{ opacity: 0.12 }} />

      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="feature-pill mb-6 animate-fade-in">
          <Sparkles size={12} className="text-emerald-400" />
          <span>AI Resume Analysis • V1</span>
        </div>

        <h1 className="mb-6 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
          Make your resume feel
          <span className="mt-2 block text-gradient">recruiter-ready.</span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl">
          Upload your resume, get a focused ATS review, and discover the exact improvements that help you stand out faster.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link to={isAuth ? "/analyse" : "/login"} className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold">
            {isAuth ? "Analyze My Resume" : "Start for Free"}
            <ArrowRight size={16} />
          </Link>
          <a href="#features" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white">
            See the experience <ChevronRight size={14} />
          </a>
        </div>

        <div className="mt-12 grid w-full max-w-5xl gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card flex flex-col items-start gap-4 p-6 text-left sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
                <FileCheck2 size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">ATS score preview</p>
                <p className="text-sm text-white/45">Instant, focused feedback</p>
              </div>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-gradient">87</span>
              <span className="mb-1 text-sm uppercase tracking-[0.25em] text-white/35">/ 100</span>
            </div>
            <p className="text-sm leading-7 text-white/55">
              Strong keyword coverage with a few impactful sections to improve before you apply.
            </p>
          </div>

          <div className="glass-card p-6 text-left sm:p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                <BadgeCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Why this version matters</p>
                <p className="text-sm text-white/45">Less clutter, more clarity</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" /> Resume-first flow with no extra distractions</li>
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" /> Simple upload experience tailored for v1</li>
              <li className="flex gap-2"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" /> Clear AI guidance around ATS and impact</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
