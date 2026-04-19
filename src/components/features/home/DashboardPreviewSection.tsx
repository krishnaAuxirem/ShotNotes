import { Link } from "react-router-dom";
import {
  LayoutDashboard, FileText, Mic, Image, Bot, Bell, Settings, Pin, BarChart2, Eye,
} from "lucide-react";

const MOCK_NOTES = [
  { title: "Q1 Product Roadmap", type: "text", tags: ["work", "product"], color: "#8CE4FF" },
  { title: "Voice memo - Morning ideas", type: "voice", tags: ["ideas"], color: "#FEEE91" },
  { title: "Scanned invoice #1042", type: "image", tags: ["finance"], color: "#FFA239" },
  { title: "Book notes - Atomic Habits", type: "text", tags: ["reading"], color: "#A78BFA" },
];

const MOCK_STATS = [
  { label: "Total Notes", value: "47", Icon: FileText, change: "+3 today" },
  { label: "Voice Notes", value: "12", Icon: Mic, change: "+1 today" },
  { label: "AI Summaries", value: "38", Icon: Bot, change: "Auto-generated" },
  { label: "Reminders", value: "6", Icon: Bell, change: "2 due today" },
];

const SIDEBAR_ITEMS = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "My Notes", Icon: FileText },
  { label: "Voice Notes", Icon: Mic },
  { label: "Images", Icon: Image },
  { label: "AI Insights", Icon: Bot },
  { label: "Reminders", Icon: Bell },
  { label: "Settings", Icon: Settings },
];

export default function DashboardPreviewSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-navy via-dark-card/30 to-dark-navy" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
            <BarChart2 className="w-3 h-3" /> Dashboard Preview
          </span>
          <h2 className="section-title text-white">
            Your Notes,{" "}
            <span className="gradient-text-blue">Beautifully Organized</span>
          </h2>
          <p className="section-subtitle">
            A powerful dashboard that gives you instant visibility into all your notes, insights, and activity.
          </p>
        </div>

        {/* Mock Dashboard */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(140,228,255,0.15)" }}>
          {/* Header Bar */}
          <div className="bg-dark-card/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-coral-red" />
                <div className="w-3 h-3 rounded-full bg-light-yellow" />
                <div className="w-3 h-3 rounded-full bg-sky-blue" />
              </div>
              <div className="px-4 py-1 rounded-lg bg-white/5 text-xs text-slate-400">
                app.shotnotes.com/dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-blue animate-pulse" />
              <span className="text-xs text-slate-400">Live Preview</span>
            </div>
          </div>

          <div className="flex" style={{ background: "#0D1525" }}>
            {/* Sidebar */}
            <div className="w-56 p-4 border-r border-white/5 hidden md:block">
              <div className="flex items-center gap-2 px-3 py-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-blue to-light-yellow" />
                <span className="text-sm font-semibold text-white">ShotNotes</span>
              </div>
              {SIDEBAR_ITEMS.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-1 text-sm ${
                      i === 0 ? "text-dark-navy font-semibold" : "text-slate-400"
                    }`}
                    style={i === 0 ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                );
              })}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {MOCK_STATS.map((stat) => {
                  const Icon = stat.Icon;
                  return (
                    <div key={stat.label} className="glass-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-sky-blue" />
                        <span className="text-[10px] text-sky-blue">{stat.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Notes Grid */}
              <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                <Pin className="w-4 h-4" /> Pinned Notes
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_NOTES.map((note) => {
                  const NoteIcon = note.type === "text" ? FileText : note.type === "voice" ? Mic : Image;
                  return (
                    <div
                      key={note.title}
                      className="p-4 rounded-xl"
                      style={{ background: `${note.color}08`, border: `1px solid ${note.color}25` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <NoteIcon className="w-4 h-4" style={{ color: note.color }} />
                        <span className="text-sm font-medium text-white">{note.title}</span>
                      </div>
                      <div className="flex gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full"
                            style={{ background: `${note.color}20`, color: note.color }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Overlay CTA */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-dark-navy/20 to-dark-navy/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Link to="/login" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Open Full Dashboard
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          Demo credentials: demo@shotnotes.com / 123456
        </p>
      </div>
    </section>
  );
}
