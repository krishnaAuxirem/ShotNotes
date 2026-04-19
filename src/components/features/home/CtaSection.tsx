import { Link } from "react-router-dom";
import { Rocket, Check, Zap } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(140,228,255,0.1) 0%, rgba(254,238,145,0.05) 50%, rgba(255,162,57,0.1) 100%)",
            border: "1px solid rgba(140,228,255,0.2)",
          }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-sky-blue/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-brand-orange/5 blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative">
            <div className="flex justify-center mb-6 animate-bounce-gentle">
              <Rocket className="w-12 h-12 text-sky-blue" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Start Capturing Ideas
              <br />
              <span className="gradient-text-blue">Smarter, Today</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
              Join 500,000+ users who've transformed their productivity with ShotNotes.
              Free plan available. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register" className="btn-primary text-base px-10 py-4 flex items-center gap-2 justify-center">
                <Zap className="w-5 h-5" />
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-base px-10 py-4">
                Login with Demo Account
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              {["No credit card", "Cancel anytime", "14-day free trial", "256-bit encryption"].map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-sky-blue" /> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
