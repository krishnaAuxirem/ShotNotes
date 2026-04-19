import { useState } from "react";
import { FAQS } from "@/constants";
import { HelpCircle, Plus, ArrowRight } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-card/20 to-dark-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-red/30 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-coral-red/10 text-coral-red border border-coral-red/20 mb-4 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3 h-3" /> FAQ
          </span>
          <h2 className="section-title text-white">
            Frequently Asked <span className="gradient-text-orange">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about ShotNotes.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden transition-all duration-300"
              style={{
                border: openIndex === index
                  ? "1px solid rgba(140,228,255,0.25)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className={`font-medium text-sm sm:text-base pr-4 ${openIndex === index ? "text-sky-blue" : "text-white"}`}>
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index ? "bg-sky-blue/20 rotate-45" : "bg-white/5"
                  }`}
                >
                  <Plus className="w-4 h-4 text-sky-blue" />
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="w-full h-px bg-sky-blue/10 mb-4" />
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10 glass-card p-6">
          <p className="text-slate-300 mb-3">Still have questions?</p>
          <a href="/contact" className="btn-primary text-sm py-2 inline-flex items-center gap-1">
            Contact Support <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
