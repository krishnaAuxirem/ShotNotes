import { Download, Bot, Search, Rocket, Check, Zap } from "lucide-react";

const STEPS = [
  {
    Icon: Download,
    step: "01",
    title: "Capture Instantly",
    desc: "Type, speak, or snap a photo. ShotNotes accepts any input method you prefer.",
    color: "#8CE4FF",
    details: ["One-tap note creation", "Voice recording", "Camera & gallery upload"],
  },
  {
    Icon: Bot,
    step: "02",
    title: "AI Organizes",
    desc: "Our AI automatically tags, summarizes, and categorizes your notes without any manual effort.",
    color: "#FEEE91",
    details: ["Auto-tagging & categories", "Smart summaries", "Keyword extraction"],
  },
  {
    Icon: Search,
    step: "03",
    title: "Find Anything",
    desc: "Search across all notes, tags, OCR text, and voice transcriptions in milliseconds.",
    color: "#FFA239",
    details: ["Full-text search", "Tag filtering", "Date & type filters"],
  },
  {
    Icon: Rocket,
    step: "04",
    title: "Take Action",
    desc: "Set reminders, share with collaborators, and export notes in any format you need.",
    color: "#FF5656",
    details: ["Smart reminders", "Team sharing", "Export to PDF/MD"],
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-brand-orange/10 text-brand-orange border border-brand-orange/20 mb-4 inline-flex items-center gap-1.5">
            <Zap className="w-3 h-3" /> Simple Workflow
          </span>
          <h2 className="section-title text-white">
            How <span className="gradient-text-orange">ShotNotes</span> Works
          </h2>
          <p className="section-subtitle">
            From capture to insight in four simple steps. No learning curve required.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-gradient-to-r from-sky-blue via-light-yellow via-brand-orange to-coral-red opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => {
              const Icon = step.Icon;
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  {/* Step Number */}
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                    style={{
                      background: `${step.color}15`,
                      border: `2px solid ${step.color}40`,
                      boxShadow: `0 0 30px ${step.color}20`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-dark-navy"
                      style={{ background: step.color }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>

                  {/* Details */}
                  <ul className="space-y-1">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-slate-500">
                        <Check className="w-3 h-3" style={{ color: step.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="glass-card inline-flex items-center gap-4 px-8 py-4">
            <div className="text-sm text-slate-400">Ready to get started?</div>
            <a href="/register" className="btn-primary text-sm py-2">
              Try Free for 14 Days →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
