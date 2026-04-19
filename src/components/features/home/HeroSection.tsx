import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cat1 from "@/assets/cat-notes-1.jpg";
import cat2 from "@/assets/cat-notes-2.jpg";
import cat3 from "@/assets/cat-notes-3.jpg";
import { Zap, Eye, Mic, Bot, Camera } from "lucide-react";

const SLIDES = [
  {
    image: cat1,
    label: "Text Notes",
    desc: "Capture ideas instantly",
    color: "#8CE4FF",
  },
  {
    image: cat2,
    label: "Voice Notes",
    desc: "Speak your thoughts",
    color: "#FEEE91",
  },
  {
    image: cat3,
    label: "Image & OCR",
    desc: "Scan and extract text",
    color: "#FFA239",
  },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 8,
  color: ["#8CE4FF", "#FEEE91", "#FFA239", "#FF5656"][Math.floor(Math.random() * 4)],
}));

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        setIsTransitioning(false);
      }, 400);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden animated-gradient">
      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="particle pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.4,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-blue/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-light-yellow/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 text-sm font-medium text-sky-blue border-sky-blue/20">
              <span className="w-2 h-2 rounded-full bg-sky-blue animate-pulse" />
              AI-Powered Note Taking Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-white">Capture</span>
              <br />
              <span className="gradient-text-blue">Every Idea,</span>
              <br />
              <span className="text-white">Instantly.</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
              ShotNotes is your AI-powered second brain. Capture text, voice, and image notes in seconds.
              Let AI organize, summarize, and surface insights automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/register" className="btn-primary text-base px-8 py-4 flex items-center gap-2 justify-center">
                <Zap className="w-5 h-5" />
                Get Started Free
              </Link>
              <Link to="/features" className="btn-secondary text-base px-8 py-4 flex items-center gap-2 justify-center">
                <Eye className="w-5 h-5" />
                Explore Features
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { value: "500K+", label: "Active Users" },
                { value: "97%", label: "Voice Accuracy" },
                { value: "25M+", label: "Notes Created" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text-blue">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Cat Image Slider */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* Main Slider */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-3xl blur-xl opacity-30 transition-all duration-700"
                  style={{ background: SLIDES[currentSlide].color }}
                />

                {/* Image container */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card-light">
                  <img
                    src={SLIDES[currentSlide].image}
                    alt={SLIDES[currentSlide].label}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                    loading="lazy"
                  />
                  {/* Overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div
                      className="text-sm font-bold mb-1"
                      style={{ color: SLIDES[currentSlide].color }}
                    >
                      {SLIDES[currentSlide].label}
                    </div>
                    <div className="text-xs text-slate-300">{SLIDES[currentSlide].desc}</div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -right-8 top-8 glass-card px-3 py-2 animate-float text-xs font-medium text-sky-blue border-sky-blue/20 flex items-center gap-1.5">
                  <Mic className="w-3 h-3" /> Voice → Text
                </div>
                <div className="absolute -left-8 bottom-12 glass-card px-3 py-2 animate-float-slow text-xs font-medium text-light-yellow border-light-yellow/20 flex items-center gap-1.5">
                  <Bot className="w-3 h-3" /> AI Summary
                </div>
                <div className="absolute -right-6 bottom-4 glass-card px-3 py-2 text-xs font-medium text-brand-orange border-brand-orange/20 flex items-center gap-1.5" style={{ animation: "float 7s ease-in-out infinite" }}>
                  <Camera className="w-3 h-3" /> OCR Ready
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 justify-center mt-6">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === idx ? "w-8 h-2" : "w-2 h-2"
                    }`}
                    style={{
                      background: currentSlide === idx ? slide.color : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Slide Thumbnails */}
              <div className="flex gap-3 mt-4">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                      currentSlide === idx
                        ? "ring-2 ring-offset-2 ring-offset-dark-navy scale-110"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-xs text-slate-500">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-sky-blue/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
