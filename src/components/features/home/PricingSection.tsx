import { Link } from "react-router-dom";
import { PRICING_PLANS } from "@/constants";
import { formatCurrency } from "@/lib/utils";
import { Check, X, DollarSign } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-card/20 to-dark-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-4 inline-flex items-center gap-1.5">
            <DollarSign className="w-3 h-3" /> Pricing
          </span>
          <h2 className="section-title text-white">
            Simple, <span className="gradient-text-orange">Transparent</span> Pricing
          </h2>
          <p className="section-subtitle">
            Start free. Upgrade when you need more. Cancel anytime. All prices in Indian Rupees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted ? "scale-105 shadow-2xl" : ""
              }`}
              style={{
                background: plan.highlighted
                  ? "linear-gradient(135deg, rgba(255,162,57,0.15), rgba(255,86,86,0.15))"
                  : "rgba(255,255,255,0.03)",
                border: plan.highlighted
                  ? "2px solid rgba(255,162,57,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-dark-navy"
                  style={{ background: "linear-gradient(135deg, #FFA239, #FF5656)" }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    {formatCurrency(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-slate-400 text-sm mb-1">/{plan.period}</span>
                  )}
                </div>
                {plan.price > 0 && (
                  <div className="text-xs text-slate-500 mt-1">
                    ≈ ₹{(plan.price * 12).toLocaleString("en-IN")}/year
                  </div>
                )}
              </div>

              <Link
                to="/register"
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm mb-8 transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "text-dark-navy"
                    : "text-white border border-white/10 hover:border-white/20 hover:bg-white/5"
                }`}
                style={
                  plan.highlighted
                    ? { background: "linear-gradient(135deg, #FFA239, #FF5656)" }
                    : {}
                }
              >
                {plan.price === 0 ? "Get Started Free" : "Start 14-Day Trial"}
              </Link>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
                {plan.notFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <X className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12 text-sm text-slate-500">
          All plans include 14-day free trial · No credit card required · Cancel anytime
        </div>
      </div>
    </section>
  );
}
