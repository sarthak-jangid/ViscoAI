import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { plans } from "../utils";
import { useState } from "react";
import { CheckCircle, Shield } from "lucide-react";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any
  }
}

function StatusBadge() {
  const { isAuth, user } = useAppData();
  if (!isAuth) return null;

  const isPro = user?.subscription && new Date() < new Date(user.subscription);

  return (
    <div
      className={`inline flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${isPro ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-white/5 border-white/10 text-white/50"} `}
    >
      <span
        className={`w-2 h-2 rounded-full ${isPro ? "bg-emerald-400 " : "bg-white/30"}`}
      />
      {isPro && user?.subscription
        ? `Pro active • expires ${new Date(
          user?.subscription,
        ).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`
        : "You're on the Free plan • 3 requests included"}
    </div>
  );
}

function PlanCTA({
  plan,
  highlight,
}: {
  plan: (typeof plans)[0];
  highlight: boolean;
}) {
  const { isAuth, user, setUser } = useAppData();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = async (price: string) => {
    if (!isAuth) {
      toast.error("Please login to purchase a plan");
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      const duration =
        price === "₹299"
          ? 1
          : price === "₹1499"
            ? 6
            : null;

      if (!duration) {
        toast.error("Invalid plan selected");
        return;
      }

      const { data: { order } } = await axios.post(`${server}/api/payment/checkout`, {
        duration
      }, {
        withCredentials: true
      })

      const options = {
        "key": "rzp_test_T7Uv8rfsRdhuOv",
        "amount": order.amount,
        "currency": "INR",
        "name": "ViscoAI",
        "description": "Find job easily",
        "order_id": order.id,
        "handler": async function (response: any) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
          try {
            const { data } = await axios.post(`${server}/api/payment/verify`, {
              razorpay_order_id, razorpay_payment_id, razorpay_signature
            }, {
              withCredentials: true
            });

            toast.success(data.message);
            setUser(data.updatedUser);
            navigate("/account");
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message);
          }
        },

        theme: {
          color: "#6366F1",
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

  };

  const isPro =
    isAuth && user?.subscription && new Date() < new Date(user.subscription);

  if (isAuth) {
    if (plan.name === "Free") {
      return (
        <p className="mt-auto text-center text-xs text-white/30 py-3">
          {isPro ? "Your previous plan" : "✔ Currently active"}
        </p>
      );
    }

    if (isPro) {
      <p className="mt-auto text-center text-xs text-white/30 py-3">
        ✔ Already subscribed
      </p>;
    }
  }

  return (
    <button
      className={`mt-auto text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 ${highlight ? "btn-primary" : "bg-white/6 hover:bg-white/10 border border-white/10 text-white"}`}
      onClick={() => {
        handleSubscribe(plan.price);
      }}
      disabled={loading}
    >
      {loading ? "Please Wait ..." : plan.cta}
    </button>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16 ">
        <span className="feature-pill inline-flex mb-4 ">
          <Shield size={11} className="text-emerald-400 " /> Simple pricing
        </span>
        <h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight"
          style={{
            fontFamily: "'Syne', sans-serif",
          }}
        >
          Start Free. Upgrade <span className="text-gradient">when ready.</span>
        </h2>
        <p className="text-white/40 mt-4 max-w-md mx-auto">
          Your first 3 request are completely free - no card needed.
        </p>
        <div className="flex justify-center mt-6 ">
          <StatusBadge />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card p-8 flex flex-col gap-6 relative transition-all duration-300 ${plan.highlight ? "border-indigo-500/10 shadow-2xl shadow-indigo-500/10 scale-[1.02]" : "hover:border-white/14"} `}
          >
            {plan.badge && (
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[11px]  font-bold tracking-widest uppercase px-3 py-1 rounded-full ${plan.highlight ? "bg-linear-to-r from-indigo-500 to-emerald-400 text-white" : "bg-white/10 text-white/60"} `}
              >
                {plan.badge}
              </span>
            )}
            <div>
              <p className="text-xs text-white/35 uppercase tracking-widest mb-1">
                {plan.name}
              </p>

              <div className="flex items-end gap-1 text-white/83 ">
                <span
                  className="text-2xl font-black text-white/83"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {plan.price}
                </span>
                {plan?.period && (
                  <span className="text-white/35 text-sm mb-1">
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="text-white/40 text-sm mt-1">{plan.desc}</p>
            </div>
            <div className="divider-subtle"></div>
            <ul className="flex flex-col gap-3 ">
              {plan.features.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white/60"
                >
                  <CheckCircle
                    size={14}
                    className="text-emerald-400 shrink-0 mt-0.5 "
                  />
                  {item}
                </li>
              ))}
            </ul>
            <PlanCTA plan={plan} highlight={plan.highlight} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
