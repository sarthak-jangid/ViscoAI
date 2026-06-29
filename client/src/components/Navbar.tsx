import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAppData } from "../context/AppContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Analyze", to: "/analyse" },
  { label: "Account", to: "/account" },
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
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 lg:px-5">
          <div
            className={`
    px-3
    mt-3 
    py-1.5
    rounded-4xl
    border border-white/10  
    bg-white/10
    backdrop-blur-2xl
    shadow-[0_16px_44px_rgba(2,6,23,0.32)]
    transition-all duration-300 ease-in-out
    ${open ? " max-h-[420px]" : "max-h-16"}
  `}
          >
            <div className="flex h-13 items-center justify-between gap-2">
              <Link
                to="/"
                className="group flex shrink-0 items-center gap-2.5"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-emerald-400 text-base shadow-lg shadow-indigo-500/30 transition-transform duration-200 group-hover:scale-105">
                  ✦
                </div>
                <span
                  className="text-lg font-semibold tracking-tight text-white/90"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Visco<span className="text-gradient">AI</span>
                </span>
              </Link>

              <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
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

              <div className="hidden items-center gap-2 md:flex">
                {isAuth ? (
                  <Link to="/account" className="nav-user-pill">
                    <img
                      src="/user.png"
                      alt="user"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
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
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              <button
                type="button"
                className="rounded-xl p-2 text-white/70 transition-colors hover:bg-white/8 hover:text-white md:hidden"
                onClick={() => setOpen((prev) => !prev)}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {open && (
              <div className={`nav-mobile-panel p-4 pb-5 rounded-4xl mb-2
      transition-all duration-300 ease-in-out
      ${open ? "opacity-100 mt-4" : "opacity-0 mt-0"}
    `}>
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

                <div className="mt-4 border-t border-white/6 pt-4">
                  {isAuth ? (
                    <Link
                      to="/account"
                      onClick={() => setOpen(false)}
                      className="nav-user-pill w-fit"
                    >
                      <img
                        src="/user.png"
                        alt={user?.name ?? "User"}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <span className="text-sm font-medium text-white/80">
                        {user?.name?.split(" ")[0]}
                      </span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="nav-cta2 mr-3 inline-block text-center"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="nav-cta inline-block text-center"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div
        className="h-18"
        style={{
          backgroundColor: "rgba(6, 8, 22, 0.2)",
        }}
      />
    </>
  );
}

export default Navbar;
