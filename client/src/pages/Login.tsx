import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { features } from "../utils";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setIsAuth } = useAppData();

  async function handleGoogleLogin(credentialResponse: CredentialResponse) {
    if (!credentialResponse.credential) {
      toast.error("Google login failed");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${server}/api/user/login`,
        { credential: credentialResponse.credential },
        { withCredentials: true },
      );

      setUser(result.data.user);
      setIsAuth(true);
      toast.success(result.data.message || "Login Successful");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Problem while login",
        );
      } else {
        toast.error("Problem while login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-page flex items-center justify-center -mt-2">
      <div className="orb w-96 h-96 bg-indigo-500 -top-20 -left-20 " />
      <div className="orb w-80 h-80 bg-emerald-500 bottom-10 right-0 " />
      <div className="orb w-64 h-64 bg-violet-600 top-1/2 left-1/2 -translate-x-1/2" />

      <div className="glass-card w-full max-w-md p-10 flex flex-col items-center gap-8 z-10 ">
        <div className="flex flex-col items-center gap-3 text-center ">
          <div className=" w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-2xl">
            📚
          </div>
          <h1 className="text2xl fontbold tracking-tight text-gradient">
            ViscoAI
          </h1>
          <p className="text-white/40 text-sm text-gradient leading-relaxed">
            Your AI-powered career co-pilot - build, analyse, and land your next
            role.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {features.map(({ icon: Icon, label }) => (
            <span key={label} className="feature-pill text-sm">
              <Icon size={11} className="text-indigo-400 " />
              {label}
            </span>
          ))}
        </div>

        <div className="divider-subtle"></div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-center text-xs text-white/30 uppercase tracking-widest font-medium">
            Continue with
          </p>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              toast.error("Google sign-in failed");
            }}
            useOneTap={false}
            text="signin_with"
            shape="rectangular"
            logo_alignment="left"
          />

          {loading && (
            <div className="mt-3 text-center text-sm text-white/70">
              Please wait while we sign you in...
            </div>
          )}
        </div>

        <div className="text-[12px] text-white/50 text-center leading-relaxed">
          By signing in you agree to our
          <a
            href="#"
            className="underline underline-offset-2 hover:text-white/50 transition-colors"
          >
            Terms
          </a>
          {" & "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-white/50 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
