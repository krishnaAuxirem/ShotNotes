import { useEffect, useRef, useState } from "react";
import { STATS } from "@/constants";
import { TrendingUp } from "lucide-react";

function useCounter(target: number, duration: number, decimal = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    setStarted(true);
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(decimal ? parseFloat((eased * target).toFixed(1)) : Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return { count, start };
}

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const { count, start } = useCounter(stat.value, 2000, stat.decimal);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  const formattedCount = () => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(0) + "K";
    return stat.decimal ? count.toFixed(1) : count.toString();
  };

  return (
    <div ref={ref} className="text-center group">
      <div
        className="inline-flex flex-col items-center p-6 rounded-2xl transition-all duration-300 group-hover:-translate-y-1"
        style={{
          background: "rgba(140,228,255,0.04)",
          border: "1px solid rgba(140,228,255,0.1)",
        }}
      >
        <div className="text-4xl sm:text-5xl font-bold gradient-text-blue mb-2">
          {formattedCount()}{stat.suffix}
        </div>
        <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-light-yellow/30 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-sky-blue/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-light-yellow/10 text-light-yellow border border-light-yellow/20 mb-4 inline-flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" /> By the Numbers
          </span>
          <h2 className="section-title text-white">
            Trusted by a Growing{" "}
            <span className="gradient-text-blue">Global Community</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Brands / Integrations */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-6">Integrates seamlessly with your favorite tools</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Google Drive", "Slack", "Notion", "Zapier", "Microsoft Teams", "Trello"].map((tool) => (
              <div
                key={tool}
                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 glass-card hover:text-white transition-colors"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
