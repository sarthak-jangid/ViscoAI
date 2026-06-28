import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppData } from "../context/AppContext";

const NAV_LINKS = [
  { label: "Analyse", to: "/analyse" },
  { label: "Job Matcher", to: "/jobmatcher" },
  { label: "Resume Builder", to: "/resumebuilder" },
  { label: "Interview Prep", to: "/interviewpre" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuth, user } = useAppData();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <nav className="navbar">
        <div className="max-w-[90%] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0 group"
              onClick={() => setOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                📚
              </div>
              <span
                className="font-bold text-lg tracking-tight text-white/90"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Visco<span className="text-gradient">AI</span>
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-link ${isActive(to) ? "nav-link-active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAuth ? (
                <Link to="/account" className="nav-user-pill">
                  <img
                    src={"/user.png"}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <span className="text-sm font-medium text-white/80">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="nav-cta2">
                    Sign In
                  </Link>
                  <Link to="/login" className="nav-cta">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile menu */}
          {open && (
            <div className="nav-mobile-panel pb-5">
              <div className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`nav-link ${isActive(to) ? "nav-link-active" : ""}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/6">
                {isAuth ? (
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="nav-user-pill w-fit"
                  >
                    <img
                      src={user?.image || "/user.png"}
                      alt={user?.name ?? "User"}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                    />
                    <span className="text-sm font-medium text-white/80">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </Link>
                ) : (
                  <>
                    {" "}
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="nav-cta2 inline-block text-center mr-4 my-3 mt-0 "
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="nav-cta inline-block text-center"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer so content doesn't sit under fixed navbar */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}

export default Navbar;
