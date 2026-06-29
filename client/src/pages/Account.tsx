import { Crown, FileText, LogOut, Mail, Sparkles, Zap } from "lucide-react";
import { useAppData } from "../context/AppContext";
import { HashLink } from "react-router-hash-link";

function Account() {
  const { user, LogoutUser } = useAppData();

  const isPro = user?.subscription && new Date() < new Date(user.subscription);
  const freeLeft = Math.max(0, 3 - (user?.freeRequestUsed ?? 0));
  const usagePercent = Math.min(100, ((user?.freeRequestUsed ?? 0) / 3) * 100);

  return (
    <div className="min-h-screen bg-page px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="glass-card overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-2xl shadow-lg shadow-indigo-500/30">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-white/35">
                  Your workspace
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {user?.name || "Welcome back"}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-white/45">
                  <Mail size={14} /> {user?.email}
                </p>
              </div>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              onClick={LogoutUser}
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div
              className={`glass-card p-6 ${isPro ? "border-emerald-400/20" : "border-white/8"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isPro ? "bg-emerald-500/15 text-emerald-300" : "bg-white/8 text-white/60"}`}
                >
                  {isPro ? <Crown size={20} /> : <Zap size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {isPro ? "Pro Plan Active" : "Free Plan"}
                  </p>
                  <p className="text-sm text-white/45">
                    {isPro
                      ? "Your premium access is live"
                      : `${freeLeft} of 3 free analyses remaining`}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-white/5 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Weekly usage</span>
                  <span className="font-medium text-white/70">
                    {user?.freeRequestUsed ?? 0}/3
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
                {!isPro && freeLeft === 0 && (
                  <p className="mt-3 text-sm text-amber-300">
                    You’ve reached the free analysis limit. Upgrade to continue.
                  </p>
                )}
              </div>

              {!isPro && (
                <HashLink
                  to="/#pricing"
                  className="btn-primary mt-5 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold"
                >
                  Upgrade to unlock more
                </HashLink>
              )}
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    What’s next
                  </h3>
                  <p className="text-sm text-white/45">
                    A few smart things to help you stay on track
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">
                    Resume analysis
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Review your resume against specific roles and keywords.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">
                    Profile insights
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Keep your profile sharp and ready for the next opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-emerald-400/20 bg-emerald-500/5 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <FileText size={24} />
            </div>

            <div className="mt-4 inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Coming Soon • V2
            </div>

            <h4 className="mt-4 text-lg font-semibold text-white">
              Recent Activity
            </h4>

            <p className="mt-2 text-sm leading-6 text-white/55">
              In Version 2, you'll be able to view your previous resume analyses,
              compare ATS scores over time, and track improvements for different job
              applications.
            </p>

            <div className="mt-6 grid gap-3 text-left">
              <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-sm text-white/60">
                📄 Resume analysis history
              </div>

              <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-sm text-white/60">
                📈 ATS score progress tracking
              </div>

              <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-sm text-white/60">
                🎯 Job-specific analysis history
              </div>

              <div className="rounded-xl border border-white/8 bg-white/5 p-3 text-sm text-white/60">
                ⭐ Save & revisit your best resumes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
