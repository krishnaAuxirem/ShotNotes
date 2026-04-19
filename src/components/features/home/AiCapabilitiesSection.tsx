import aiImg from "@/assets/ai-capabilities.jpg";
import {
  ClipboardList, Tag, Key, Lightbulb, CheckSquare, Globe, Bot, Sparkles,
} from "lucide-react";

const AI_FEATURES = [
  {
    Icon: ClipboardList,
    title: "Smart Summarization",
    desc: "Condenses long notes into crisp, actionable summaries with key points highlighted.",
    color: "#8CE4FF",
  },
  {
    Icon: Tag,
    title: "Auto-Tagging",
    desc: "Analyzes note content and suggests the most relevant tags automatically.",
    color: "#FEEE91",
  },
  {
    Icon: Key,
    title: "Keyword Extraction",
    desc: "Identifies and highlights the most important terms and concepts in your notes.",
    color: "#FFA239",
  },
  {
    Icon: Lightbulb,
    title: "Insight Generation",
    desc: "Connects related notes and surfaces patterns and insights you might have missed.",
    color: "#A78BFA",
  },
  {
    Icon: CheckSquare,
    title: "Action Item Detection",
    desc: "Automatically finds to-dos, tasks, and follow-ups buried in your notes.",
    color: "#34D399",
  },
  {
    Icon: Globe,
    title: "Multi-Language Support",
    desc: "Processes and summarizes notes in 12+ languages including Hindi, Tamil, and Telugu.",
    color: "#FF5656",
  },
];

export default function AiCapabilitiesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-dark-card/20 to-dark-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-yellow/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-sky-blue/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-light-yellow/10 text-light-yellow border border-light-yellow/20 mb-4 inline-flex items-center gap-1.5">
            <Bot className="w-3 h-3" /> Powered by AI
          </span>
          <h2 className="section-title text-white">
            Your <span className="gradient-text-blue">AI Assistant</span>
            <br />That Never Sleeps
          </h2>
          <p className="section-subtitle">
            Advanced language models work behind the scenes to make your notes smarter,
            more organized, and more useful.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={aiImg}
                alt="AI Capabilities"
                className="w-full h-80 object-cover rounded-3xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 to-transparent rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/40 to-transparent rounded-3xl" />

              {/* Floating stats */}
              <div className="absolute top-6 left-6 glass-card px-4 py-3 border-sky-blue/30">
                <div className="text-2xl font-bold text-sky-blue">97%</div>
                <div className="text-xs text-slate-400">AI Accuracy</div>
              </div>
              <div className="absolute bottom-6 right-6 glass-card px-4 py-3 border-brand-orange/30">
                <div className="text-2xl font-bold text-brand-orange">2.3s</div>
                <div className="text-xs text-slate-400">Avg. Summary Time</div>
              </div>
            </div>

            {/* AI Badge */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-center animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, rgba(140,228,255,0.2), rgba(254,238,145,0.2))",
                border: "1px solid rgba(140,228,255,0.3)",
              }}
            >
              <Bot className="w-7 h-7 text-sky-blue mb-1" />
              <span className="text-xs text-sky-blue font-medium">AI</span>
            </div>
          </div>

          {/* Right - Features List */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {AI_FEATURES.map((feature) => {
                const Icon = feature.Icon;
                return (
                  <div
                    key={feature.title}
                    className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-default"
                    style={{
                      background: `${feature.color}08`,
                      border: `1px solid ${feature.color}25`,
                    }}
                  >
                    <Icon className="w-5 h-5 mb-2" style={{ color: feature.color }} />
                    <h4 className="font-semibold text-white text-sm mb-1">{feature.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Demo Banner */}
            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(140,228,255,0.1), rgba(254,238,145,0.1))",
                border: "1px solid rgba(140,228,255,0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-sky-blue flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-white">Try AI Demo</div>
                  <div className="text-xs text-slate-400">
                    Login with demo@shotnotes.com to see AI features in action.
                  </div>
                </div>
                <a href="/login" className="ml-auto btn-primary text-xs py-2 px-4">
                  Try Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
