import { Link } from "react-router-dom";
import {
  FileText, Mic, Image, Bot, Key, Tag, Search, Folder, Palette,
  Bell, Pin, Users, Link2, RefreshCw, WifiOff, Lock, BarChart2, Upload,
  Zap, Rocket,
} from "lucide-react";

const ALL_FEATURES = [
  { Icon: FileText, title: "Rich Text Notes", desc: "Full markdown support, checklists, headers, bold, italic, code blocks and more. Your notes, perfectly formatted.", color: "#8CE4FF", category: "Core" },
  { Icon: Mic, title: "Voice-to-Text", desc: "Record voice memos and convert them to text instantly with 97% accuracy. Supports 12+ languages.", color: "#FEEE91", category: "Core" },
  { Icon: Image, title: "Image OCR", desc: "Photograph any text — business cards, whiteboards, handwritten notes — and extract the text in seconds.", color: "#FFA239", category: "Core" },
  { Icon: Bot, title: "AI Summarization", desc: "Let AI read your long notes and produce concise, actionable summaries with key points and action items.", color: "#A78BFA", category: "AI" },
  { Icon: Key, title: "Keyword Extraction", desc: "Automatically identify the most important terms and concepts in every note you write.", color: "#34D399", category: "AI" },
  { Icon: Tag, title: "Auto-Tagging", desc: "AI suggests the most relevant tags based on your note's content, saving hours of manual organization.", color: "#8CE4FF", category: "AI" },
  { Icon: Search, title: "Universal Search", desc: "Search across note titles, content, OCR text, voice transcripts, and tags — all in one place.", color: "#FEEE91", category: "Organization" },
  { Icon: Folder, title: "Folders & Collections", desc: "Organize notes into folders and smart collections. Nest up to 5 levels deep.", color: "#FFA239", category: "Organization" },
  { Icon: Palette, title: "Color Coding", desc: "Visually differentiate notes with 12 color themes. Instantly recognize categories at a glance.", color: "#FF5656", category: "Organization" },
  { Icon: Bell, title: "Smart Reminders", desc: "Set time, date, and location-based reminders on any note. Recurring reminders for habits.", color: "#8CE4FF", category: "Productivity" },
  { Icon: Pin, title: "Pin Important Notes", desc: "Keep your most-accessed notes at the top for instant access, no matter how many notes you have.", color: "#FEEE91", category: "Productivity" },
  { Icon: Users, title: "Real-time Collaboration", desc: "Invite team members to collaborate on notes with granular view/edit/comment permissions.", color: "#FFA239", category: "Collaboration" },
  { Icon: Link2, title: "Share via Link", desc: "Generate public or password-protected links to share individual notes with anyone.", color: "#A78BFA", category: "Collaboration" },
  { Icon: RefreshCw, title: "Cross-Device Sync", desc: "Your notes sync instantly across all devices — web, iOS, Android — in real-time.", color: "#34D399", category: "Sync" },
  { Icon: WifiOff, title: "Offline Mode", desc: "Create and edit notes without internet. Everything syncs automatically when you reconnect.", color: "#8CE4FF", category: "Sync" },
  { Icon: Lock, title: "AES-256 Encryption", desc: "End-to-end encryption for all your notes. Zero-knowledge architecture — even we can't read your notes.", color: "#FF5656", category: "Security" },
  { Icon: BarChart2, title: "Usage Analytics", desc: "Track your note-taking patterns, productivity peaks, and usage insights on your personal dashboard.", color: "#FEEE91", category: "Insights" },
  { Icon: Upload, title: "Export Anywhere", desc: "Export notes to PDF, Markdown, DOCX, or plain text. Import from Notion, Evernote, or any format.", color: "#FFA239", category: "Export" },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-20 text-center">
        <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
          <Zap className="w-3 h-3" /> Features
        </span>
        <h1 className="section-title text-white">Everything You Need to <br /><span className="gradient-text-blue">Think Better</span></h1>
        <p className="section-subtitle mt-4">18+ powerful features designed to eliminate friction between your thoughts and your notes.</p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/register" className="btn-primary">Get Started Free</Link>
          <Link to="/pricing" className="btn-secondary">View Pricing</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_FEATURES.map((feature) => {
            const Icon = feature.Icon;
            return (
              <div key={feature.title} className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1" style={{ background: `${feature.color}08`, border: `1px solid ${feature.color}20` }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{ background: `${feature.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${feature.color}20`, color: feature.color }}>{feature.category}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-card inline-block p-10 max-w-2xl">
            <Rocket className="w-10 h-10 text-sky-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Ready to experience all these features?</h2>
            <p className="text-slate-400 mb-6">Start with our free plan. No credit card required.</p>
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn-primary">Start Free Trial</Link>
              <Link to="/pricing" className="btn-secondary">See Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
