import { useState } from "react";
import { Navigate, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotes } from "@/hooks/useNotes";
import { mockAiSummary, extractKeywords, formatRelativeTime } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, AreaChart, Area,
} from "recharts";
import {
  Bot, Search, ClipboardList, TrendingUp, Tag, BarChart2, Zap, Target,
  ChevronLeft, Lightbulb, Brain, Award, CheckCircle, Hash, Flame,
  Calendar, ArrowRight, Clock, Sparkles, RefreshCw, Menu, X,
} from "lucide-react";

const PRODUCTIVITY_DATA = [
  { hour: "6am", score: 30 }, { hour: "8am", score: 65 }, { hour: "10am", score: 90 },
  { hour: "12pm", score: 75 }, { hour: "2pm", score: 85 }, { hour: "4pm", score: 70 },
  { hour: "6pm", score: 55 }, { hour: "8pm", score: 40 },
];

const RADAR_DATA = [
  { subject: "Consistency", A: 80 }, { subject: "Variety", A: 65 },
  { subject: "Depth", A: 75 }, { subject: "Speed", A: 90 },
  { subject: "Organization", A: 70 },
];

const WEEKLY_TREND = [
  { day: "Mon", score: 72 }, { day: "Tue", score: 85 }, { day: "Wed", score: 68 },
  { day: "Thu", score: 91 }, { day: "Fri", score: 79 }, { day: "Sat", score: 55 },
  { day: "Sun", score: 63 },
];

const GOAL_DATA = [
  { label: "Daily Notes Goal", target: 5, current: 3, color: "#8CE4FF" },
  { label: "Weekly Voice Notes", target: 10, current: 7, color: "#FEEE91" },
  { label: "AI Summaries Used", target: 20, current: 18, color: "#FFA239" },
  { label: "Tags Organized", target: 15, current: 12, color: "#A78BFA" },
];

const AI_SUGGESTIONS = [
  { title: "Morning Routine Notes", suggestion: "You create 3× more notes between 9–11am. Try scheduling your most important captures in this window.", icon: Clock, color: "#8CE4FF" },
  { title: "Voice Note Opportunity", suggestion: "Your voice notes are 40% longer and more detailed than text notes. Consider switching to voice for brainstorming sessions.", icon: Zap, color: "#FEEE91" },
  { title: "Tag Consistency", suggestion: "You have 5 notes about 'product' using different tag variations. Standardizing to one tag will improve search results.", icon: Tag, color: "#FFA239" },
  { title: "Weekly Review", suggestion: "You haven't reviewed your pinned notes in 7 days. A quick 10-minute review can refresh key priorities.", icon: RefreshCw, color: "#34D399" },
];

const WRITING_INSIGHTS = [
  { label: "Avg. Note Length", value: "187 words", change: "+12% vs last week", positive: true },
  { label: "Most Productive Day", value: "Thursday", change: "91 avg score", positive: true },
  { label: "Fastest Note Speed", value: "2.3 min", change: "Voice note", positive: true },
  { label: "Notes Without Tags", value: "8 notes", change: "Add tags to organize", positive: false },
];

const AI_NAV = [
  { to: "/ai-insights", label: "Overview", Icon: BarChart2, end: true },
  { to: "/ai-insights/suggestions", label: "Suggestions", Icon: Lightbulb },
  { to: "/ai-insights/keywords", label: "Keywords", Icon: Hash },
  { to: "/ai-insights/goals", label: "Goals", Icon: Target },
  { to: "/ai-insights/writing", label: "Writing Insights", Icon: Brain },
];

// ─── Overview ─────────────────────────────────────────────────────────────────
function AiOverview({ notes, generatedSummaries, processing, onGenerate }: {
  notes: ReturnType<typeof useNotes>["notes"];
  generatedSummaries: Record<string, string>;
  processing: string | null;
  onGenerate: (id: string, content: string) => void;
}) {
  const allKeywords = Array.from(new Set(notes.flatMap((n) => n.extractedKeywords || []))).slice(0, 20);
  const tagFrequency = notes.flatMap((n) => n.tags).reduce((acc, tag) => { acc[tag] = (acc[tag] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topTags = Object.entries(tagFrequency).sort(([, a], [, b]) => b - a).slice(0, 8);

  const STATS = [
    { label: "Notes Analyzed", value: notes.length, Icon: Search, color: "#8CE4FF" },
    { label: "Keywords Found", value: allKeywords.length, Icon: Hash, color: "#FEEE91" },
    { label: "Summaries Ready", value: notes.filter((n) => n.aiSummary).length, Icon: ClipboardList, color: "#FFA239" },
    { label: "Productivity Score", value: "87%", Icon: TrendingUp, color: "#34D399" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-5">
              <Icon className="w-6 h-6 mb-2" style={{ color: s.color }} />
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-light-yellow" /> Productivity by Hour</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PRODUCTIVITY_DATA}>
              <XAxis dataKey="hour" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 10, color: "#fff" }} />
              <Bar dataKey="score" fill="#8CE4FF" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-sky-blue" /> Note Quality Metrics</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <Radar name="Score" dataKey="A" stroke="#8CE4FF" fill="#8CE4FF" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Summaries */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bot className="w-4 h-4 text-sky-blue" /> AI Note Summaries</h3>
        {notes.length === 0 ? (
          <p className="text-slate-500 text-sm">Create notes to see AI summaries here.</p>
        ) : (
          <div className="space-y-4">
            {notes.slice(0, 5).map((note) => (
              <div key={note.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{note.title}</span>
                  <button onClick={() => onGenerate(note.id, note.content)} disabled={processing === note.id} className="text-xs text-sky-blue hover:underline disabled:opacity-50 flex items-center gap-1">
                    {processing === note.id ? <><RefreshCw className="w-3 h-3 animate-spin" /> Processing...</> : <><Bot className="w-3 h-3" /> Regenerate</>}
                  </button>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{generatedSummaries[note.id] || note.aiSummary || "Click Regenerate to generate AI summary."}</p>
                {note.extractedKeywords && note.extractedKeywords.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {note.extractedKeywords.slice(0, 4).map((kw) => (
                      <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.15)", color: "#A78BFA" }}>{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Tags */}
      {topTags.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Tag className="w-4 h-4 text-sky-blue" /> Most Used Tags</h3>
          <div className="space-y-3">
            {topTags.map(([tag, count]) => (
              <div key={tag} className="flex items-center gap-3">
                <span className="text-sm text-slate-300 w-20">#{tag}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(count / (topTags[0]?.[1] || 1)) * 100}%`, background: "linear-gradient(90deg, #8CE4FF, #FEEE91)" }} />
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Suggestions ──────────────────────────────────────────────────────────────
function AiSuggestions({ notes }: { notes: ReturnType<typeof useNotes>["notes"] }) {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const visible = AI_SUGGESTIONS.filter((_, i) => !dismissed.includes(i));

  const SMART_TAGS = Array.from(new Set(notes.flatMap((n) => n.extractedKeywords || []))).slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-light-yellow" /> AI Smart Suggestions</h2>
        <p className="text-slate-400 text-sm">Personalized recommendations based on your note-taking patterns.</p>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-16 glass-card">
          <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">You're all caught up!</h3>
          <p className="text-slate-400 text-sm">No suggestions right now. Keep creating notes!</p>
          <button onClick={() => setDismissed([])} className="btn-primary text-sm py-2 mt-4">Reset Suggestions</button>
        </div>
      ) : (
        <div className="space-y-4">
          {AI_SUGGESTIONS.map((s, i) => {
            if (dismissed.includes(i)) return null;
            const Icon = s.icon;
            return (
              <div key={i} className="glass-card p-5 flex gap-4" style={{ border: `1px solid ${s.color}25` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{s.suggestion}</div>
                  <button className="mt-3 text-xs flex items-center gap-1 font-medium" style={{ color: s.color }}>Apply Suggestion <ArrowRight className="w-3 h-3" /></button>
                </div>
                <button onClick={() => setDismissed((d) => [...d, i])} className="text-slate-600 hover:text-slate-400 self-start">
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Auto-suggested tags */}
      {SMART_TAGS.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-light-yellow" /> Suggested Tags for Untagged Notes</h3>
          <p className="text-xs text-slate-400 mb-4">Based on keyword frequency across your notes:</p>
          <div className="flex flex-wrap gap-2">
            {SMART_TAGS.map((tag) => (
              <button key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all glass-card text-slate-300 hover:text-white hover:border-sky-blue/30">
                <Hash className="w-3 h-3 text-sky-blue" /> {tag}
                <span className="text-sky-blue ml-1">+ Apply</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Keywords Mind Map ────────────────────────────────────────────────────────
function AiKeywords({ notes }: { notes: ReturnType<typeof useNotes>["notes"] }) {
  const allKeywords = notes.flatMap((n) => n.extractedKeywords || []);
  const freq: Record<string, number> = {};
  allKeywords.forEach((k) => (freq[k] = (freq[k] || 0) + 1));
  const sorted = Object.entries(freq).sort(([, a], [, b]) => b - a);
  const keywordColors = ["#8CE4FF", "#FEEE91", "#FFA239", "#FF5656", "#A78BFA", "#34D399"];

  const tagFrequency = notes.flatMap((n) => n.tags).reduce((acc, tag) => { acc[tag] = (acc[tag] || 0) + 1; return acc; }, {} as Record<string, number>);
  const tagData = Object.entries(tagFrequency).sort(([, a], [, b]) => b - a).slice(0, 10).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2"><Hash className="w-5 h-5 text-sky-blue" /> Keyword Analysis</h2>
        <p className="text-slate-400 text-sm">AI-extracted keywords from all your notes, ranked by frequency.</p>
      </div>

      {/* Keyword Cloud */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4">Keyword Cloud</h3>
        {sorted.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">Create more notes to see keyword extraction.</p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center py-4">
            {sorted.slice(0, 30).map(([kw, count], i) => {
              const color = keywordColors[i % keywordColors.length];
              const size = Math.max(0.7, Math.min(1.4, 0.7 + count * 0.2));
              return (
                <span key={kw} className="px-3 py-1.5 rounded-full font-medium transition-all hover:scale-110 cursor-default" style={{ background: `${color}15`, border: `1px solid ${color}30`, color, fontSize: `${size}rem` }}>
                  {kw}
                  <span className="text-xs opacity-60 ml-1">×{count}</span>
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Tag Frequency Bar Chart */}
      {tagData.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-sky-blue" /> Tag Frequency Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tagData} layout="vertical">
              <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 10, color: "#fff" }} />
              <Bar dataKey="value" fill="#8CE4FF" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Keyword Details Table */}
      {sorted.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h3 className="font-semibold text-white">Keyword Details</h3>
          </div>
          <table className="w-full data-table">
            <thead><tr><th>Keyword</th><th>Frequency</th><th>Notes Found In</th><th>Relevance</th></tr></thead>
            <tbody>
              {sorted.slice(0, 15).map(([kw, count], i) => {
                const color = keywordColors[i % keywordColors.length];
                const notesWithKw = notes.filter((n) => n.extractedKeywords?.includes(kw)).length;
                const relevance = Math.min(100, Math.round((count / (sorted[0]?.[1] || 1)) * 100));
                return (
                  <tr key={kw}>
                    <td><span className="text-sm font-medium px-2 py-0.5 rounded" style={{ background: `${color}15`, color }}>{kw}</span></td>
                    <td className="text-sm text-white">{count}</td>
                    <td className="text-sm text-slate-400">{notesWithKw} note{notesWithKw !== 1 ? "s" : ""}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${relevance}%`, background: color }} /></div>
                        <span className="text-xs text-slate-400">{relevance}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Goals Page ───────────────────────────────────────────────────────────────
function AiGoals({ notes }: { notes: ReturnType<typeof useNotes>["notes"] }) {
  const [streak] = useState(7);

  const ACHIEVEMENTS = [
    { title: "First Note", desc: "Created your first note", done: notes.length > 0, Icon: Award, color: "#8CE4FF" },
    { title: "Note Streak", desc: "7 days of consecutive notes", done: streak >= 7, Icon: Flame, color: "#FFA239" },
    { title: "Voice Pioneer", desc: "Created 5 voice notes", done: notes.filter((n) => n.type === "voice").length >= 5, Icon: Zap, color: "#FEEE91" },
    { title: "Tag Master", desc: "Applied 10 unique tags", done: new Set(notes.flatMap((n) => n.tags)).size >= 10, Icon: Tag, color: "#A78BFA" },
    { title: "AI User", desc: "Generated 3 AI summaries", done: notes.filter((n) => n.aiSummary).length >= 3, Icon: Bot, color: "#34D399" },
    { title: "Power Note-r", desc: "Created 20+ notes", done: notes.length >= 20, Icon: TrendingUp, color: "#FF5656" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2"><Target className="w-5 h-5 text-sky-blue" /> Goals & Progress</h2>
        <p className="text-slate-400 text-sm">Track your productivity goals and unlock achievements.</p>
      </div>

      {/* Streak */}
      <div className="glass-card p-6 flex items-center gap-6" style={{ border: "1px solid rgba(255,162,57,0.3)", background: "linear-gradient(135deg, rgba(255,162,57,0.05), rgba(255,86,86,0.05))" }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,162,57,0.2)" }}>
          <Flame className="w-8 h-8 text-brand-orange" />
        </div>
        <div>
          <div className="text-4xl font-bold text-brand-orange">{streak}</div>
          <div className="text-white font-medium">Day Streak</div>
          <div className="text-xs text-slate-400">Keep going! You're on a roll.</div>
        </div>
        <div className="ml-auto flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i < streak ? "text-dark-navy" : "bg-white/5 text-slate-600"}`} style={i < streak ? { background: "linear-gradient(135deg, #FFA239, #FF5656)" } : {}}>
              {["M", "T", "W", "T", "F", "S", "S"][i]}
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goals */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-5 flex items-center gap-2"><Calendar className="w-4 h-4 text-sky-blue" /> Today's Goals</h3>
        <div className="space-y-5">
          {GOAL_DATA.map((goal) => {
            const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
            return (
              <div key={goal.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{goal.label}</span>
                  <span className="text-sm font-semibold" style={{ color: goal.color }}>{goal.current}/{goal.target}</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: goal.color }} />
                </div>
                <div className="text-xs text-slate-500 mt-1">{pct}% complete</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-light-yellow" /> Achievements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a) => {
            const Icon = a.Icon;
            return (
              <div key={a.title} className={`glass-card p-5 transition-all ${a.done ? "hover:scale-105" : "opacity-50"}`} style={a.done ? { border: `1px solid ${a.color}40` } : {}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: a.done ? `${a.color}20` : "rgba(255,255,255,0.03)" }}>
                  <Icon className="w-6 h-6" style={{ color: a.done ? a.color : "#64748b" }} />
                </div>
                <div className="font-medium text-white text-sm mb-1">{a.title}</div>
                <div className="text-xs text-slate-400">{a.desc}</div>
                {a.done && <div className="mt-2 flex items-center gap-1 text-xs font-medium" style={{ color: a.color }}><CheckCircle className="w-3 h-3" /> Unlocked</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Writing Insights ─────────────────────────────────────────────────────────
function AiWritingInsights({ notes }: { notes: ReturnType<typeof useNotes>["notes"] }) {
  const avgWords = notes.length > 0 ? Math.round(notes.reduce((s, n) => s + n.content.split(" ").length, 0) / notes.length) : 0;
  const longestNote = notes.reduce((m, n) => n.content.length > (m?.content.length || 0) ? n : m, notes[0]);
  const shortestNote = notes.reduce((m, n) => n.content.length < (m?.content.length || Infinity) ? n : m, notes[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2"><Brain className="w-5 h-5 text-sky-blue" /> Writing Insights</h2>
        <p className="text-slate-400 text-sm">Deep analysis of your writing style, patterns, and habits.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {WRITING_INSIGHTS.map((s) => (
          <div key={s.label} className="glass-card p-5">
            <div className="text-2xl font-bold text-white mb-1">{s.label === "Avg. Note Length" ? `${avgWords || 187} words` : s.value}</div>
            <div className="text-sm text-slate-400 mb-1">{s.label}</div>
            <div className={`text-xs flex items-center gap-1 ${s.positive ? "text-emerald-400" : "text-coral-red"}`}>
              <TrendingUp className="w-3 h-3" /> {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Productivity Trend */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-sky-blue" /> Weekly Productivity Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={WEEKLY_TREND}>
            <defs>
              <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8CE4FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8CE4FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 10, color: "#fff" }} />
            <Area type="monotone" dataKey="score" stroke="#8CE4FF" fill="url(#scoreGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Note Length Distribution */}
      {notes.length > 0 && (
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-sky-blue" /> Your Note Spotlight</h3>
          <div className="space-y-4">
            {longestNote && (
              <div className="p-4 rounded-xl" style={{ background: "rgba(140,228,255,0.05)", border: "1px solid rgba(140,228,255,0.15)" }}>
                <div className="text-xs text-sky-blue font-medium mb-1 flex items-center gap-1"><Award className="w-3 h-3" /> Most Detailed Note</div>
                <div className="font-medium text-white text-sm">{longestNote.title}</div>
                <div className="text-xs text-slate-400 mt-1">{longestNote.content.split(" ").length} words · {longestNote.tags.length} tags</div>
              </div>
            )}
            {shortestNote && shortestNote.id !== longestNote?.id && (
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,162,57,0.05)", border: "1px solid rgba(255,162,57,0.15)" }}>
                <div className="text-xs text-brand-orange font-medium mb-1 flex items-center gap-1"><Zap className="w-3 h-3" /> Quickest Capture</div>
                <div className="font-medium text-white text-sm">{shortestNote.title}</div>
                <div className="text-xs text-slate-400 mt-1">{shortestNote.content.split(" ").length} words · Captured fast</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Writing Tips */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Lightbulb className="w-4 h-4 text-light-yellow" /> Personalized Writing Tips</h3>
        <div className="space-y-3">
          {[
            { tip: "Add at least 2 tags to every note for better searchability.", icon: Tag, color: "#8CE4FF" },
            { tip: "Your notes are most detailed on weekdays — try voice notes on weekends for quick captures.", icon: Mic, color: "#FEEE91" },
            { tip: "Use AI summaries weekly to review and consolidate your knowledge base.", icon: Bot, color: "#FFA239" },
            { tip: "Pin your 3 most important notes each week to keep priorities clear.", icon: Target, color: "#A78BFA" },
          ].map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: `${t.color}08` }}>
                <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: t.color }} />
                <span className="text-sm text-slate-300">{t.tip}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── AI Dashboard Shell ───────────────────────────────────────────────────────
export default function AiDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { notes } = useNotes(user?.id);
  const [processing, setProcessing] = useState<string | null>(null);
  const [generatedSummaries, setGeneratedSummaries] = useState<Record<string, string>>({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-sky-blue border-t-transparent animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleGenerateSummary = async (noteId: string, content: string) => {
    setProcessing(noteId);
    await new Promise((r) => setTimeout(r, 1200));
    setGeneratedSummaries((prev) => ({ ...prev, [noteId]: mockAiSummary(content) }));
    setProcessing(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A0E1A" }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-20 px-6 py-4 flex items-center gap-4" style={{ background: "rgba(10,14,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="/dashboard" className="text-slate-400 hover:text-white p-2 rounded-lg glass-card">
          <ChevronLeft className="w-5 h-5" />
        </a>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-blue/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-sky-blue" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Insights</div>
            <div className="text-xs text-slate-400">Powered by ShotNotes AI</div>
          </div>
        </div>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="ml-auto lg:hidden p-2 rounded-lg glass-card text-slate-400">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Side Nav */}
        <nav className={`${mobileNavOpen ? "block" : "hidden"} lg:block w-full lg:w-56 p-4 lg:sticky lg:top-20 lg:h-fit`}>
          <div className="space-y-1">
            {AI_NAV.map((item) => {
              const Icon = item.Icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 p-6 min-w-0">
          <Routes>
            <Route index element={<AiOverview notes={notes} generatedSummaries={generatedSummaries} processing={processing} onGenerate={handleGenerateSummary} />} />
            <Route path="suggestions" element={<AiSuggestions notes={notes} />} />
            <Route path="keywords" element={<AiKeywords notes={notes} />} />
            <Route path="goals" element={<AiGoals notes={notes} />} />
            <Route path="writing" element={<AiWritingInsights notes={notes} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
