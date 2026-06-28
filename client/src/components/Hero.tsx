import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppData } from "../context/AppContext";

function Hero() {
  const { isAuth } = useAppData();
  return (
    <section className="relative pt-28 pb-28 px-6 flex flex-col items-center overflow-hidden">
      <div
        className="orb w-150 h-150 bg-indigo-600 -top-40 left-1/2 -translate-x -1/2 "
        style={{
          opacity: 0.12,
        }}
      />

      <div
        className="orb w-80 h-80 bg-emerald-500 bottom-0 right-10"
        style={{
          opacity: 0.1,
        }}
      />

      <div
        className="inline-flex items-center gap-2
      feature-pill mb-6 animate-fade-in "
      >
        <Zap size={11} className="text-emerald-400" />
        <span> AI-Powered Career Platform </span>
      </div>

      <h1
        className="text-4xl md:text-6xl lg:text7xl font-extrabold leading-[1.08] tracking-tight max-w-4xl mb-6 animate-slide-up text-center"
        style={{ fontFamily: "'Syne',sans-serif " }}
      >
        Land Your Dream Job
        <br />
        <span className="text-gradient animate-slide-up">Faster With AI</span>
      </h1>

      <p
        className="text-white/45 text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-slide-up  "
        style={{
          animationDelay: "0.1s",
        }}
      >
        Analyse your resume, get an ATS Score, discover the right jobs
      </p>
      <div
        className="flex flex-col sm:flex-row items-center animate-slide-up gap-3 "
        style={{ animationDelay: "0.2s" }}
      >
        {" "}
        <Link
          to={isAuth ? "/analyseresume" : "/login"}
          className="btn-primary px-7 py-3.5 rounded-xl text-base font-semibold"
        >
          {isAuth ? (
            <p className="flex items-center gap-2">
              {" "}
              Analyse Your Resume <ArrowRight size={16} />
            </p>
          ) : (
            <p className="flex items-center gap-2">
              {" "}
              Start for free <ArrowRight size={16} />{" "}
            </p>
          )}
        </Link>
        <a
          href="#features"
          className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1.5;"
        >
          See how it works <ChevronRight size={14} />
        </a>{" "}
      </div>

      <p
        className="text-white/25 text-xs mt-6 animate-slide-up"
        style={{
          animationDelay: "0.3s",
        }}
      >
        First 3 Analyses Free • No credit card required{" "}
      </p>

      <div
        className="mt-16 glass-card px-8 py-5  flex items-center gap-6 animate-slide-up"
        style={{
          animationDelay: "0.35s",
        }}
      >
        <div className="flex flex-col items-center">
          <span
            className="text-4xl font-black text-gradient"
            style={{ fontFamily: "'Syne',sans-serif " }}
          >
            {" "}
            87{" "}
            <span className="text-[13px] text-white/35 uppercase tracking-widest ">
              {" "}
              ATS Score{" "}
            </span>{" "}
          </span>
        </div>

        <div className="h-10 w-px bg-white/10" />
        <div className="flex flex-col gap-1 text-left">
          <span className="text-xs text-emerald-400 font-medium">
            √ Strong Keywords detected
          </span>
          <span className="text-xs text-yellow-400 font-medium">
            ⚠ Missing: qauntified impact{" "}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
