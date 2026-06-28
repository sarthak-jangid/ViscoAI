import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CtaBanner() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-br from-indigo-500/15 to-emerald-500/15 p-10 text-center shadow-2xl shadow-black/20 sm:p-12">
        <h2 className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "'Syne', sans-serif" }}>
          Ready to see how your resume performs?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/50">
          Start with the v1 experience and review your resume with a cleaner, more focused AI workflow.
        </p>
        <Link to="/analyse" className="btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold">
          Analyze My Resume <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default CtaBanner;
