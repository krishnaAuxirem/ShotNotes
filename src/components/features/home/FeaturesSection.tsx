import { useEffect, useRef } from "react";
import {
  FileText, Mic, Image, Bot, Tag, Bell, RefreshCw, Users, Lock, ChevronRight, Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    Icon: FileText,
    title: "Smart Text Notes",
    desc: "Rich-text editor with auto-formatting, checklists, and markdown support. Your thoughts, perfectly structured.",
    color: "#8CE4FF",
    bg: "rgba(140,228,255,0.08)",
    border: "rgba(140,228,255,0.2)",
  },
  {
    Icon: Mic,
    title: "Voice-to-Text",
    desc: "Record voice memos and get instant, accurate transcriptions in 12+ languages. Never lose a spoken idea again.",
    color: "#FEEE91",
    bg: "rgba(254,238,145,0.08)",
    border: "rgba(254,238,145,0.2)",
  },
  {
    Icon: Image,
    title: "Image & OCR",
    desc: "Snap photos, upload images, and extract text instantly with our AI-powered OCR engine.",
    color: "#FFA239",
    bg: "rgba(255,162,57,0.08)",
    border: "rgba(255,162,57,0.2)",
  },
  {
    Icon: Bot,
    title: "AI Summaries",
    desc: "Our AI reads your notes and generates concise summaries, key points, and action items automatically.",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    Icon: Tag,
    title: "Smart Tagging",
    desc: "Auto-suggested tags based on note content. Powerful search across all notes, tags, and attachments.",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    Icon: Bell,
    title: "Reminders",
    desc: "Set time-based and location-based reminders on any note. Never miss a deadline or forget a task.",
    color: "#FF5656",
    bg: "rgba(255,86,86,0.08)",
    border: "rgba(255,86,86,0.2)",
  },
  {
    Icon: RefreshCw,
    title: "Cross-Platform Sync",
    desc: "Access your notes from any device, anytime. Real-time sync across web, iOS, and Android apps.",
    color: "#8CE4FF",
    bg: "rgba(140,228,255,0.08)",
    border: "rgba(140,228,255,0.2)",
  },
  {
    Icon: Users,
    title: "Collaboration",
    desc: "Share notes with your team, collaborate in real-time, and control view/edit permissions.",
    color: "#FEEE91",
    bg: "rgba(254,238,145,0.08)",
    border: "rgba(254,238,145,0.2)",
  },
  {
    Icon: Lock,
    title: "End-to-End Encryption",
    desc: "Your notes are encrypted with AES-256. Complete privacy and security, always.",
    color: "#FFA239",
    bg: "rgba(255,162,57,0.08)",
    border: "rgba(255,162,57,0.2)",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in-section");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-card/30 to-dark-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 fade-in-section">
          <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Everything You Need
          </span>
          <h2 className="section-title text-white">
            Features that <span className="gradient-text-blue">Supercharge</span>
            <br />Your Productivity
          </h2>
          <p className="section-subtitle">
            Everything you need to capture, organize, and retrieve information effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.Icon;
            return (
              <div
                key={feature.title}
                className="fade-in-section group p-6 rounded-2xl cursor-default transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: feature.bg,
                  border: `1px solid ${feature.border}`,
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.bg, border: `1px solid ${feature.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                <div
                  className="mt-4 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
                  style={{ color: feature.color }}
                >
                  Learn more
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
