import { useState } from "react";
import { TESTIMONIALS } from "@/constants";
import { Star, Quote, Users } from "lucide-react";

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-yellow/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-sky-blue/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-light-yellow/10 text-light-yellow border border-light-yellow/20 mb-4 inline-flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" /> Testimonials
          </span>
          <h2 className="section-title text-white">
            Loved by <span className="gradient-text-blue">500,000+</span> Users
          </h2>
          <p className="section-subtitle">
            From students to startup founders — see how ShotNotes is changing the way people think.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-10">
          <div className="max-w-3xl mx-auto glass-card p-8 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <Quote className="w-10 h-10 text-sky-blue opacity-60" />
            </div>
            <img
              src={TESTIMONIALS[active].avatar}
              alt={TESTIMONIALS[active].name}
              className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-sky-blue/30"
            />
            <p className="text-slate-200 text-lg leading-relaxed mb-6 italic">
              {TESTIMONIALS[active].text}
            </p>
            <div className="flex items-center justify-center gap-1 mb-3">
              {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-light-yellow fill-current" />
              ))}
            </div>
            <div className="font-semibold text-white">{TESTIMONIALS[active].name}</div>
            <div className="text-sm text-slate-400">{TESTIMONIALS[active].role}</div>
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="flex flex-wrap gap-4 justify-center">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                active === i
                  ? "border-sky-blue/40 bg-sky-blue/10"
                  : "glass-card hover:border-white/15"
              }`}
              style={active === i ? { border: "1px solid rgba(140,228,255,0.4)" } : {}}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className={`w-10 h-10 rounded-full transition-all duration-300 ${
                  active === i ? "ring-2 ring-sky-blue" : "grayscale opacity-60"
                }`}
              />
              <div className="text-left hidden sm:block">
                <div className={`text-sm font-medium ${active === i ? "text-white" : "text-slate-400"}`}>
                  {t.name}
                </div>
                <div className="text-xs text-slate-500 max-w-24 truncate">{t.role.split(" at ")[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
