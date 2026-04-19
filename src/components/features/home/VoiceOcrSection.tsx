import { useState } from "react";
import { Mic, Camera, Briefcase, PenLine, FileText, CheckCircle, Square, Mic2 } from "lucide-react";

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada"];

const OCR_EXAMPLES = [
  {
    type: "Business Card",
    Icon: Briefcase,
    input: "Scanned business card image",
    output: "Name: Rajesh Kumar\nCTO - TechVentures\nEmail: raj@tech.com\nPhone: +91 98765 43210",
  },
  {
    type: "Handwritten Note",
    Icon: PenLine,
    input: "Photo of handwritten text",
    output: "Meeting agenda:\n1. Budget review Q1\n2. New product launch\n3. Team expansion plan",
  },
  {
    type: "Printed Document",
    Icon: FileText,
    input: "Photo of printed PDF page",
    output: "Section 3.2: Key performance indicators include customer satisfaction scores, retention rates, and monthly active users.",
  },
];

export default function VoiceOcrSection() {
  const [activeOcr, setActiveOcr] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const DEMO_TRANSCRIPT = "Just had a great idea for the product. We should add a feature that lets users share notes publicly and get community feedback. This could drive viral growth.";

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      setVoiceText(DEMO_TRANSCRIPT);
    } else {
      setIsRecording(true);
      setVoiceText("");
      setTimeout(() => {
        setVoiceText("Just had a great idea...");
        setTimeout(() => {
          setVoiceText("Just had a great idea for the product...");
          setTimeout(() => {
            setVoiceText(DEMO_TRANSCRIPT);
            setIsRecording(false);
          }, 1500);
        }, 800);
      }, 1000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral-red/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-coral-red/10 text-coral-red border border-coral-red/20 mb-4 inline-flex items-center gap-1.5">
            <Mic className="w-3 h-3" /> Voice & Vision
          </span>
          <h2 className="section-title text-white">
            Speak It. Snap It.
            <br />
            <span className="gradient-text-orange">Notes Take Care of Themselves.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Voice Section */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-blue/15 flex items-center justify-center border border-sky-blue/25">
                <Mic className="w-5 h-5 text-sky-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Voice-to-Text Engine</h3>
                <p className="text-xs text-slate-400">97% accuracy · 12+ languages</p>
              </div>
            </div>

            {/* Language Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* Waveform Display */}
            <div className="glass-card-light p-4 mb-4 h-16 flex items-center justify-center gap-1">
              {isRecording ? (
                <>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="wave-bar"
                      style={{ animationDelay: `${i * 0.04}s` }}
                    />
                  ))}
                </>
              ) : (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Mic2 className="w-4 h-4" />
                  Press record to demo
                </div>
              )}
            </div>

            {/* Record Button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={handleRecordToggle}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording
                    ? "bg-coral-red shadow-lg shadow-coral-red/40 scale-110 animate-pulse"
                    : "bg-sky-blue hover:bg-sky-blue/90 hover:scale-105"
                }`}
              >
                {isRecording ? (
                  <Square className="w-5 h-5 text-white fill-white" />
                ) : (
                  <Mic className="w-7 h-7 text-dark-navy" />
                )}
              </button>
            </div>

            {/* Transcript Output */}
            {voiceText && (
              <div
                className="p-4 rounded-xl text-sm text-slate-300 leading-relaxed"
                style={{ background: "rgba(140,228,255,0.05)", border: "1px solid rgba(140,228,255,0.15)" }}
              >
                <div className="text-xs text-sky-blue font-medium mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Transcription Complete
                </div>
                {voiceText}
              </div>
            )}
          </div>

          {/* OCR Section */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center border border-brand-orange/25">
                <Camera className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Image Text Extraction (OCR)</h3>
                <p className="text-xs text-slate-400">JPG, PNG, PDF, HEIC supported</p>
              </div>
            </div>

            {/* Type Tabs */}
            <div className="flex gap-2 mb-6">
              {OCR_EXAMPLES.map((ex, i) => {
                const Icon = ex.Icon;
                return (
                  <button
                    key={ex.type}
                    onClick={() => setActiveOcr(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      activeOcr === i
                        ? "text-dark-navy"
                        : "text-slate-400 hover:text-white glass-card"
                    }`}
                    style={
                      activeOcr === i
                        ? { background: "linear-gradient(135deg, #FFA239, #FF5656)" }
                        : {}
                    }
                  >
                    <Icon className="w-3 h-3" /> {ex.type}
                  </button>
                );
              })}
            </div>

            {/* OCR Demo */}
            <div className="grid grid-cols-1 gap-4">
              {/* Input */}
              <div
                className="p-4 rounded-xl text-center h-20 flex items-center justify-center"
                style={{ background: "rgba(255,162,57,0.05)", border: "1px dashed rgba(255,162,57,0.3)" }}
              >
                <div>
                  <Camera className="w-6 h-6 text-brand-orange mx-auto mb-1" />
                  <div className="text-xs text-slate-400">{OCR_EXAMPLES[activeOcr].input}</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-orange/50" />
                <div className="text-brand-orange text-xs font-medium px-2">OCR Processing →</div>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-orange/50" />
              </div>

              {/* Output */}
              <div
                className="p-4 rounded-xl"
                style={{ background: "rgba(140,228,255,0.05)", border: "1px solid rgba(140,228,255,0.15)" }}
              >
                <div className="text-xs text-sky-blue font-medium mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Extracted Text
                </div>
                <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {OCR_EXAMPLES[activeOcr].output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
