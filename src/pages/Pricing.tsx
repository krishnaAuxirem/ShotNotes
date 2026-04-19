import { Link } from "react-router-dom";
import { PRICING_PLANS, FAQS } from "@/constants";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Check, X, DollarSign, ChevronDown } from "lucide-react";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getPrice = (plan: typeof PRICING_PLANS[0]) => {
    if (plan.price === 0) return 0;
    return billing === "yearly" ? Math.round(plan.price * 0.8) : plan.price;
  };

  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-20 text-center">
        <span className="tag-chip bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-4 inline-flex items-center gap-1.5">
          <DollarSign className="w-3 h-3" /> Pricing
        </span>
        <h1 className="section-title text-white">Choose Your <span className="gradient-text-orange">Perfect Plan</span></h1>
        <p className="section-subtitle mt-4">All prices in Indian Rupees. Cancel anytime. 14-day free trial on all paid plans.</p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm ${billing === "monthly" ? "text-white" : "text-slate-500"}`}>Monthly</span>
          <button onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")} className="relative w-14 h-7 rounded-full transition-colors" style={{ background: billing === "yearly" ? "#8CE4FF" : "rgba(255,255,255,0.1)" }}>
            <div className={`absolute w-5 h-5 rounded-full bg-dark-navy top-1 transition-transform ${billing === "yearly" ? "translate-x-8" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm flex items-center gap-2 ${billing === "yearly" ? "text-white" : "text-slate-500"}`}>
            Yearly <span className="text-xs px-2 py-0.5 rounded-full bg-sky-blue/20 text-sky-blue">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PRICING_PLANS.map((plan) => (
            <div key={plan.id} className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${plan.highlighted ? "scale-105 shadow-2xl" : ""}`} style={{ background: plan.highlighted ? "linear-gradient(135deg, rgba(255,162,57,0.15), rgba(255,86,86,0.15))" : "rgba(255,255,255,0.03)", border: plan.highlighted ? "2px solid rgba(255,162,57,0.5)" : "1px solid rgba(255,255,255,0.07)" }}>
              {plan.badge && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-dark-navy" style={{ background: "linear-gradient(135deg, #FFA239, #FF5656)" }}>{plan.badge}</div>}
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">{formatCurrency(getPrice(plan))}</span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm mb-1">/{billing === "monthly" ? "mo" : "yr"}</span>}
                </div>
                {billing === "yearly" && plan.price > 0 && <div className="text-xs text-sky-blue mt-1">Save ₹{(plan.price * 12 * 0.2).toLocaleString("en-IN")}/year</div>}
              </div>
              <Link to="/register" className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm mb-8 transition-all hover:-translate-y-0.5 ${plan.highlighted ? "text-dark-navy" : "text-white border border-white/10 hover:bg-white/5"}`} style={plan.highlighted ? { background: "linear-gradient(135deg, #FFA239, #FF5656)" } : {}}>
                {plan.price === 0 ? "Get Started Free" : "Start 14-Day Trial"}
              </Link>
              <div className="space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{f}</span>
                  </div>
                ))}
                {plan.notFeatures.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm">
                    <X className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="glass-card overflow-x-auto mb-16">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-4 px-6 text-sm font-semibold text-white">Feature</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-400">Starter</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-brand-orange">Pro</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-slate-400">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Notes limit", "50/mo", "Unlimited", "Unlimited"],
                ["Voice notes", "✗", "✓", "✓"],
                ["Image OCR", "✗", "✓", "✓"],
                ["AI Summarization", "✗", "✓", "✓"],
                ["Storage", "2 GB", "15 GB", "100 GB"],
                ["Team collaboration", "✗", "✗", "✓"],
                ["Admin dashboard", "✗", "✗", "✓"],
                ["Priority support", "✗", "✓", "✓"],
                ["Custom integrations", "✗", "✗", "✓"],
                ["SLA guarantee", "✗", "✗", "✓"],
              ].map(([feature, starter, pro, enterprise]) => (
                <tr key={feature} className="border-b border-white/5 hover:bg-white/2">
                  <td className="py-3 px-6 text-sm text-slate-300">{feature}</td>
                  {[starter, pro, enterprise].map((val, i) => (
                    <td key={i} className="py-3 px-6 text-center text-sm">
                      {val === "✓" ? <Check className="w-4 h-4 text-sky-blue mx-auto" /> : val === "✗" ? <X className="w-4 h-4 text-slate-600 mx-auto" /> : <span className={i === 1 ? "text-brand-orange font-medium" : "text-slate-400"}>{val}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-3">
            {FAQS.slice(0, 5).map((faq, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-6 py-4 text-left">
                  <span className={`text-sm font-medium ${openFaq === i ? "text-sky-blue" : "text-white"}`}>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-4 text-sm text-slate-400 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
