import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotes } from "@/hooks/useNotes";
import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
import NoteCard from "@/components/features/dashboard/NoteCard";
import CreateNoteModal from "@/components/features/dashboard/CreateNoteModal";
import type { Note } from "@/types";
import { formatRelativeTime, getInitials, formatNumber } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  FileText, Mic, Image, Pin, BarChart2, Plus, Bell, Activity, User,
  TrendingUp, Clock, Menu, Zap, Tag, Search, Share2, Settings,
  Globe, Lock, ChevronDown, X, Hash, Palette, Wifi, Download,
  Shield, Moon, Sun, Smartphone, Mail, Check, Trash2, Edit3,
} from "lucide-react";

const ACTIVITY_DATA = [
  { day: "Mon", notes: 4, voice: 2, image: 1 },
  { day: "Tue", notes: 7, voice: 3, image: 2 },
  { day: "Wed", notes: 3, voice: 1, image: 0 },
  { day: "Thu", notes: 9, voice: 4, image: 3 },
  { day: "Fri", notes: 6, voice: 2, image: 1 },
  { day: "Sat", notes: 2, voice: 1, image: 0 },
  { day: "Sun", notes: 5, voice: 2, image: 2 },
];

const NOTE_TYPE_PIE = [
  { name: "Text", value: 55, color: "#8CE4FF" },
  { name: "Voice", value: 28, color: "#FEEE91" },
  { name: "Image", value: 17, color: "#FFA239" },
];

// ─── Overview ───────────────────────────────────────────────────────────────
function OverviewPage({ userId }: { userId: string }) {
  const { notes, isLoading, addNote, removeNote, togglePin } = useNotes(userId);
  const [showModal, setShowModal] = useState(false);
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const recentNotes = notes.slice(0, 4);
  const voiceCount = notes.filter((n) => n.type === "voice").length;
  const imageCount = notes.filter((n) => n.type === "image").length;

  const STATS = [
    { label: "Total Notes", value: notes.length, Icon: FileText, color: "#8CE4FF", change: "+3 this week" },
    { label: "Voice Notes", value: voiceCount, Icon: Mic, color: "#FEEE91", change: "+1 today" },
    { label: "Image Notes", value: imageCount, Icon: Image, color: "#FFA239", change: "AI processed" },
    { label: "Pinned", value: pinnedNotes.length, Icon: Pin, color: "#FF5656", change: "Important" },
  ];

  const QUICK_TYPES = [
    { label: "Text Note", Icon: FileText, color: "#8CE4FF" },
    { label: "Voice Note", Icon: Mic, color: "#FEEE91" },
    { label: "Image Note", Icon: Image, color: "#FFA239" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.Icon;
          return (
            <div key={stat.label} className="glass-card p-5 hover:border-sky-blue/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${stat.color}20`, color: stat.color }}>{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{isLoading ? "—" : stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-sky-blue" /> Activity This Week</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ACTIVITY_DATA}>
              <defs>
                <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8CE4FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8CE4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 12, color: "#fff" }} />
              <Area type="monotone" dataKey="notes" stroke="#8CE4FF" fill="url(#colorNotes)" strokeWidth={2} />
              <Area type="monotone" dataKey="voice" stroke="#FEEE91" fill="none" strokeWidth={2} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-light-yellow" /> Quick Capture</h3>
          <div className="space-y-3 flex-1">
            {QUICK_TYPES.map((t) => {
              const Icon = t.Icon;
              return (
                <button key={t.label} onClick={() => setShowModal(true)} className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]" style={{ background: `${t.color}10`, border: `1px solid ${t.color}25` }}>
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: t.color }} />
                  <span className="text-sm font-medium text-white">{t.label}</span>
                  <Plus className="w-4 h-4 ml-auto text-slate-400" />
                </button>
              );
            })}
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary w-full mt-4 py-2.5 justify-center text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </div>

      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <Pin className="w-4 h-4 text-light-yellow" /> Pinned Notes
            <span className="text-xs text-slate-500">({pinnedNotes.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-blue" /> Recent Notes
        </h3>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentNotes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />
            ))}
          </div>
        )}
      </div>

      {showModal && <CreateNoteModal onClose={() => setShowModal(false)} onSubmit={(data) => { addNote(data); setShowModal(false); }} />}
    </div>
  );
}

// ─── All Notes ───────────────────────────────────────────────────────────────
function AllNotesPage({ userId }: { userId: string }) {
  const { filteredNotes, pinnedNotes, unpinnedNotes, isLoading, searchQuery, setSearchQuery, selectedTag, setSelectedTag, selectedType, setSelectedType, allTags, addNote, removeNote, togglePin } = useNotes(userId);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const TYPE_FILTERS = [
    { key: null, label: "All" },
    { key: "text", label: "Text", Icon: FileText },
    { key: "voice", label: "Voice", Icon: Mic },
    { key: "image", label: "Image", Icon: Image },
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex-1 min-w-48 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input-field pl-10 text-sm" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {TYPE_FILTERS.map((t) => {
            const isActive = selectedType === t.key;
            return (
              <button key={String(t.key)} onClick={() => setSelectedType(t.key)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "text-dark-navy" : "glass-card text-slate-400"}`} style={isActive ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}>
                {"Icon" in t && t.Icon && <t.Icon className="w-3 h-3" />} {t.label}
              </button>
            );
          })}
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2 flex items-center gap-1">
          <Plus className="w-3 h-3" /> New Note
        </button>
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setSelectedTag(null)} className={`tag-chip text-xs border ${!selectedTag ? "bg-sky-blue text-dark-navy border-sky-blue" : "bg-sky-blue/10 text-sky-blue border-sky-blue/20"}`}>All Tags</button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} className={`tag-chip text-xs border ${selectedTag === tag ? "bg-sky-blue text-dark-navy border-sky-blue" : "bg-sky-blue/10 text-sky-blue border-sky-blue/20"}`}>#{tag}</button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No notes found</h3>
          <p className="text-slate-400 text-sm mb-6">Try a different search or create a new note.</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2 flex items-center gap-1 mx-auto"><Plus className="w-3 h-3" /> Create Your First Note</button>
        </div>
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3 flex items-center gap-1"><Pin className="w-3 h-3" /> Pinned</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedNotes.map((note) => <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />)}
              </div>
            </div>
          )}
          {unpinnedNotes.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-3">All Notes ({unpinnedNotes.length})</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {unpinnedNotes.map((note) => <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />)}
              </div>
            </div>
          )}
        </>
      )}

      {showModal && <CreateNoteModal onClose={() => setShowModal(false)} onSubmit={(data) => { addNote(data); setShowModal(false); }} />}
    </div>
  );
}

// ─── Type Notes ──────────────────────────────────────────────────────────────
function TypeNotesPage({ userId, type }: { userId: string; type: "voice" | "image" }) {
  const { notes, isLoading, addNote, removeNote, togglePin } = useNotes(userId);
  const [showModal, setShowModal] = useState(false);
  const filtered = notes.filter((n) => n.type === type);
  const TypeIcon = type === "voice" ? Mic : Image;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <TypeIcon className="w-5 h-5 text-sky-blue" />
          {type === "voice" ? "Voice Notes" : "Image Notes"}
          <span className="text-slate-500 text-base">({filtered.length})</span>
        </h2>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2 flex items-center gap-1"><Plus className="w-3 h-3" /> New {type === "voice" ? "Voice" : "Image"} Note</button>
      </div>
      {type === "voice" && (
        <div className="glass-card p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-light-yellow/15 flex items-center justify-center"><Mic className="w-5 h-5 text-light-yellow" /></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white mb-1">Voice Recording Engine</div>
            <div className="text-xs text-slate-400">12+ languages · 97% accuracy · Auto-transcription</div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-1 rounded-full bg-light-yellow/40" style={{ height: `${8 + Math.random() * 20}px` }} />
            ))}
          </div>
        </div>
      )}
      {type === "image" && (
        <div className="glass-card p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-orange/15 flex items-center justify-center"><Image className="w-5 h-5 text-brand-orange" /></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white mb-1">OCR Image Processing</div>
            <div className="text-xs text-slate-400">JPG, PNG, PDF · Handwriting recognition · Instant extraction</div>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-48 rounded-2xl" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <TypeIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-sm mb-6">No {type} notes yet. Create your first one!</p>
          <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2 flex items-center gap-1 mx-auto"><Plus className="w-3 h-3" /> Create {type === "voice" ? "Voice" : "Image"} Note</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((note) => <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />)}
        </div>
      )}
      {showModal && <CreateNoteModal onClose={() => setShowModal(false)} onSubmit={(data) => { addNote({ ...data, type }); setShowModal(false); }} />}
    </div>
  );
}

// ─── Tags Page ───────────────────────────────────────────────────────────────
function TagsPage({ userId }: { userId: string }) {
  const { notes, removeNote, togglePin } = useNotes(userId);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagMap: Record<string, Note[]> = {};
  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(note);
    });
  });
  const tags = Object.entries(tagMap).sort(([, a], [, b]) => b.length - a.length);
  const tagColors = ["#8CE4FF", "#FEEE91", "#FFA239", "#FF5656", "#A78BFA", "#34D399"];
  const filteredNotes = activeTag ? tagMap[activeTag] || [] : [];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
        <Tag className="w-5 h-5 text-sky-blue" /> Tags & Collections
      </h2>
      <p className="text-slate-400 text-sm mb-6">Organize your notes by topic. Click a tag to view all related notes.</p>

      {tags.length === 0 ? (
        <div className="text-center py-20">
          <Tag className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No tags yet</h3>
          <p className="text-slate-400 text-sm">Add tags to your notes to organize them here.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {tags.map(([tag, tagNotes], i) => {
              const color = tagColors[i % tagColors.length];
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(isActive ? null : tag)}
                  className="p-5 rounded-2xl text-left transition-all hover:-translate-y-1"
                  style={{
                    background: isActive ? `${color}20` : "rgba(255,255,255,0.03)",
                    border: `2px solid ${isActive ? color : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20` }}>
                    <Hash className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">#{tag}</div>
                  <div className="text-xs text-slate-400">{tagNotes.length} note{tagNotes.length !== 1 ? "s" : ""}</div>
                  <div className="mt-3 flex gap-1">
                    {tagNotes.slice(0, 3).map((_, ni) => (
                      <div key={ni} className="h-1 rounded-full flex-1" style={{ background: color, opacity: 0.5 + ni * 0.15 }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {activeTag && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Hash className="w-4 h-4 text-sky-blue" /> #{activeTag}
                  <span className="text-slate-500 text-sm">({filteredNotes.length} notes)</span>
                </h3>
                <button onClick={() => setActiveTag(null)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Search Page ─────────────────────────────────────────────────────────────
function SearchPage({ userId }: { userId: string }) {
  const { notes, removeNote, togglePin } = useNotes(userId);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "oldest" | "title">("recent");

  const results = notes
    .filter((n) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q));
      const matchesType = !typeFilter || n.type === typeFilter;
      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Search className="w-5 h-5 text-sky-blue" /> Search Notes
      </h2>

      <div className="glass-card p-6 mb-6">
        <div className="relative mb-4">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-12 text-base py-4"
            placeholder="Search by title, content, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2">
            {[null, "text", "voice", "image"].map((t) => {
              const labels: Record<string, string> = { text: "Text", voice: "Voice", image: "Image" };
              const Icons: Record<string, typeof FileText> = { text: FileText, voice: Mic, image: Image };
              const isActive = typeFilter === t;
              const Icon = t ? Icons[t] : null;
              return (
                <button key={String(t)} onClick={() => setTypeFilter(t)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isActive ? "text-dark-navy" : "glass-card text-slate-400"}`} style={isActive ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}>
                  {Icon && <Icon className="w-3 h-3" />}
                  {t ? labels[t] : "All Types"}
                </button>
              );
            })}
          </div>
          <select className="input-field text-xs py-1.5 px-3 ml-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {query && (
        <div className="text-sm text-slate-400 mb-4">
          Found <span className="text-white font-semibold">{results.length}</span> result{results.length !== 1 ? "s" : ""} for "<span className="text-sky-blue">{query}</span>"
        </div>
      )}

      {results.length === 0 && query ? (
        <div className="text-center py-16">
          <Search className="w-14 h-14 text-slate-600 mx-auto mb-4" />
          <h3 className="text-white font-semibold mb-2">No results found</h3>
          <p className="text-slate-400 text-sm">Try different keywords or remove filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(query ? results : notes.slice(0, 9)).map((note) => (
            <NoteCard key={note.id} note={note} onDelete={removeNote} onTogglePin={togglePin} onEdit={() => {}} />
          ))}
        </div>
      )}

      {!query && (
        <div className="text-center text-slate-500 text-sm mt-4">Showing recent notes · Type to search</div>
      )}
    </div>
  );
}

// ─── Shared Notes Page ───────────────────────────────────────────────────────
const SHARED_MOCK = [
  { id: "s1", title: "Project Kickoff Notes", sharedWith: "team@startup.com", access: "view", sharedAt: "2026-04-10T09:00:00Z", views: 12 },
  { id: "s2", title: "Product Roadmap Q2", sharedWith: "manager@corp.com", access: "edit", sharedAt: "2026-04-08T14:00:00Z", views: 5 },
  { id: "s3", title: "Research Summary", sharedWith: "Public Link", access: "view", sharedAt: "2026-04-05T11:00:00Z", views: 47 },
];

function SharedNotesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`https://app.shotnotes.com/shared/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-sky-blue" /> Shared Notes
          </h2>
          <p className="text-slate-400 text-sm mt-1">Manage notes you've shared with others</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Shared Notes", value: SHARED_MOCK.length, Icon: Share2, color: "#8CE4FF" },
          { label: "Total Views", value: SHARED_MOCK.reduce((s, n) => s + n.views, 0), Icon: Globe, color: "#FEEE91" },
          { label: "Private Links", value: SHARED_MOCK.filter(n => n.sharedWith !== "Public Link").length, Icon: Lock, color: "#FFA239" },
        ].map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-5">
              <Icon className="w-6 h-6 mb-2" style={{ color: s.color }} />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        {SHARED_MOCK.map((item) => (
          <div key={item.id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-sky-blue/15 flex items-center justify-center flex-shrink-0">
                  {item.sharedWith === "Public Link" ? <Globe className="w-5 h-5 text-sky-blue" /> : <Lock className="w-5 h-5 text-sky-blue" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white mb-1">{item.title}</div>
                  <div className="text-xs text-slate-400 mb-2">Shared with: {item.sharedWith}</div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.access === "edit" ? "bg-brand-orange/20 text-brand-orange" : "bg-sky-blue/20 text-sky-blue"}`}>{item.access === "edit" ? "Can Edit" : "View Only"}</span>
                    <span className="text-xs text-slate-500">{item.views} views</span>
                    <span className="text-xs text-slate-500">{formatRelativeTime(item.sharedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(item.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs glass-card text-slate-400 hover:text-white transition-colors">
                  {copiedId === item.id ? <Check className="w-3 h-3 text-sky-blue" /> : <Share2 className="w-3 h-3" />}
                  {copiedId === item.id ? "Copied!" : "Copy Link"}
                </button>
                <button className="p-1.5 rounded-lg glass-card text-coral-red hover:bg-coral-red/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 glass-card p-6 text-center" style={{ border: "1px dashed rgba(140,228,255,0.2)" }}>
        <Share2 className="w-10 h-10 text-sky-blue/40 mx-auto mb-3" />
        <h3 className="text-white font-medium mb-1">Share any note</h3>
        <p className="text-slate-400 text-sm mb-4">Open any note and click the share button to generate a secure link.</p>
        <button className="btn-primary text-sm py-2">Browse My Notes</button>
      </div>
    </div>
  );
}

// ─── Reminders Page ──────────────────────────────────────────────────────────
function RemindersPage({ userId }: { userId: string }) {
  const { notes } = useNotes(userId);
  const reminders = notes.filter((n) => n.reminder);
  const upcoming = reminders.filter((n) => new Date(n.reminder!) > new Date());
  const past = reminders.filter((n) => new Date(n.reminder!) <= new Date());

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Bell className="w-5 h-5 text-sky-blue" /> Reminders ({reminders.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Reminders", value: reminders.length, color: "#8CE4FF" },
          { label: "Upcoming", value: upcoming.length, color: "#34D399" },
          { label: "Past Due", value: past.length, color: "#FF5656" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-4">
            <div className="text-2xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-20">
          <Bell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-sm">No reminders set. Add a reminder to any note.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.length > 0 && <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Upcoming</div>}
          {upcoming.map((note) => (
            <div key={note.id} className="glass-card p-5 flex items-center gap-4" style={{ border: "1px solid rgba(52,211,153,0.2)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(52,211,153,0.1)" }}>
                <Bell className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1"><div className="font-medium text-white text-sm">{note.title}</div><div className="text-xs text-slate-400">{note.reminder ? new Date(note.reminder).toLocaleString("en-IN") : ""}</div></div>
              <div className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(52,211,153,0.15)", color: "#34D399" }}>Upcoming</div>
            </div>
          ))}
          {past.length > 0 && <div className="text-xs font-semibold text-slate-400 uppercase mb-2 mt-4">Past Due</div>}
          {past.map((note) => (
            <div key={note.id} className="glass-card p-5 flex items-center gap-4 opacity-60">
              <div className="w-10 h-10 rounded-xl bg-coral-red/10 flex items-center justify-center"><Clock className="w-5 h-5 text-coral-red" /></div>
              <div className="flex-1"><div className="font-medium text-white text-sm">{note.title}</div><div className="text-xs text-slate-400">{note.reminder ? new Date(note.reminder).toLocaleString("en-IN") : ""}</div></div>
              <div className="text-xs px-2 py-1 rounded-full bg-coral-red/20 text-coral-red">Past Due</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Activity Page ───────────────────────────────────────────────────────────
function ActivityPage({ userId }: { userId: string }) {
  const { notes } = useNotes(userId);
  const activities = notes.slice(0, 20).map((n, i) => ({
    id: n.id,
    action: i % 3 === 0 ? "Created" : i % 3 === 1 ? "Updated" : "Pinned",
    noteTitle: n.title,
    timestamp: n.updatedAt,
    Icon: n.type === "text" ? FileText : n.type === "voice" ? Mic : Image,
    color: n.type === "text" ? "#8CE4FF" : n.type === "voice" ? "#FEEE91" : "#FFA239",
  }));

  const weeklyStats = [
    { label: "Notes Created", value: notes.filter((_, i) => i < 5).length, Icon: Plus, color: "#8CE4FF" },
    { label: "Edits Made", value: Math.floor(notes.length * 1.4), Icon: Edit3, color: "#FEEE91" },
    { label: "Tags Applied", value: notes.flatMap((n) => n.tags).length, Icon: Tag, color: "#FFA239" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-sky-blue" /> Activity Timeline
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {weeklyStats.map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-4">
              <Icon className="w-5 h-5 mb-2" style={{ color: s.color }} />
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-400">{s.label} this week</div>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-sky-blue/30 to-transparent" />
        <div className="space-y-4">
          {activities.length === 0 ? (
            <div className="text-center py-16"><Activity className="w-14 h-14 text-slate-600 mx-auto mb-4" /><p className="text-slate-400 text-sm">No activity yet. Create some notes!</p></div>
          ) : activities.map((activity) => {
            const Icon = activity.Icon;
            return (
              <div key={activity.id} className="flex gap-4 items-start ml-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10" style={{ background: `${activity.color}20`, border: `2px solid ${activity.color}40` }}>
                  <Icon className="w-3 h-3" style={{ color: activity.color }} />
                </div>
                <div className="flex-1 glass-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white"><span className="font-medium" style={{ color: activity.color }}>{activity.action}</span> · {activity.noteTitle}</span>
                    <span className="text-xs text-slate-500">{formatRelativeTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-sky-blue" /> Profile Settings
      </h2>
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-6 mb-8">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-blue to-light-yellow flex items-center justify-center text-dark-navy text-2xl font-bold">{getInitials(user?.name || "U")}</div>
          )}
          <div>
            <div className="text-xl font-bold text-white">{user?.name}</div>
            <div className="text-slate-400 text-sm">{user?.email}</div>
            <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full capitalize" style={{ background: "rgba(140,228,255,0.2)", color: "#8CE4FF" }}>{user?.plan} plan</span>
          </div>
        </div>
        <div className="space-y-4">
          <div><label className="block text-xs font-medium text-slate-400 mb-2">Full Name</label><input className="input-field" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label className="block text-xs font-medium text-slate-400 mb-2">Email Address</label><input className="input-field" value={user?.email} disabled /></div>
          <div><label className="block text-xs font-medium text-slate-400 mb-2">Member Since</label><input className="input-field" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : ""} disabled /></div>
        </div>
        {saved && <div className="mt-4 p-3 rounded-xl text-sm text-sky-blue flex items-center gap-2" style={{ background: "rgba(140,228,255,0.1)" }}><Activity className="w-4 h-4" /> Profile updated successfully!</div>}
        <button onClick={handleSave} className="btn-primary mt-6 text-sm py-2.5">Save Changes</button>
      </div>
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-sky-blue" /> Storage Usage</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Used</span>
          <span className="text-sm text-white">{user?.storageUsed || 128} MB / {user?.plan === "free" ? "2 GB" : "15 GB"}</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.min((user?.storageUsed || 128) / (user?.plan === "free" ? 2048 : 15360) * 100, 100)}%`, background: "linear-gradient(90deg, #8CE4FF, #FEEE91)" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState({ email: true, push: true, reminders: true, updates: false });
  const [privacy, setPrivacy] = useState({ defaultShare: "private", analytics: true });
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof notifications) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-sky-blue" /> Settings</h2>

      {/* Appearance */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Palette className="w-4 h-4 text-sky-blue" /> Appearance</h3>
        <div className="flex gap-3">
          {[
            { value: "dark", label: "Dark", Icon: Moon },
            { value: "light", label: "Light", Icon: Sun },
            { value: "system", label: "System", Icon: Smartphone },
          ].map(({ value, label, Icon }) => (
            <button key={value} onClick={() => setTheme(value)} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${theme === value ? "text-dark-navy" : "glass-card text-slate-400"}`} style={theme === value ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}>
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-sky-blue" /> Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, val]) => {
            const labels: Record<string, string> = { email: "Email notifications", push: "Push notifications", reminders: "Reminder alerts", updates: "Product updates" };
            const descs: Record<string, string> = { email: "Receive summaries via email", push: "Browser push notifications", reminders: "Alert me for note reminders", updates: "News about new features" };
            return (
              <div key={key} className="flex items-center justify-between">
                <div><div className="text-sm text-white font-medium">{labels[key]}</div><div className="text-xs text-slate-400">{descs[key]}</div></div>
                <button onClick={() => toggle(key as keyof typeof notifications)} className={`w-12 h-6 rounded-full transition-colors ${val ? "bg-sky-blue" : "bg-white/10"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${val ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-sky-blue" /> Privacy & Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white font-medium mb-2">Default note visibility</label>
            <select className="input-field text-sm" value={privacy.defaultShare} onChange={(e) => setPrivacy((p) => ({ ...p, defaultShare: e.target.value }))}>
              <option value="private">Private (only me)</option>
              <option value="link">Anyone with link</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="text-sm text-white font-medium">Two-Factor Authentication</div><div className="text-xs text-slate-400">Add extra security to your account</div></div>
            <button onClick={() => setTwoFA(!twoFA)} className={`w-12 h-6 rounded-full transition-colors ${twoFA ? "bg-sky-blue" : "bg-white/10"}`}>
              <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${twoFA ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div><div className="text-sm text-white font-medium">Analytics & Usage Data</div><div className="text-xs text-slate-400">Help improve ShotNotes with anonymous data</div></div>
            <button onClick={() => setPrivacy((p) => ({ ...p, analytics: !p.analytics }))} className={`w-12 h-6 rounded-full transition-colors ${privacy.analytics ? "bg-sky-blue" : "bg-white/10"}`}>
              <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${privacy.analytics ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Download className="w-4 h-4 text-sky-blue" /> Data Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl glass-card text-left hover:border-sky-blue/30 transition-all">
            <Download className="w-4 h-4 text-sky-blue" />
            <div><div className="text-sm text-white font-medium">Export All Notes</div><div className="text-xs text-slate-400">Download as JSON, Markdown, or PDF</div></div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl glass-card text-left hover:border-sky-blue/30 transition-all">
            <Wifi className="w-4 h-4 text-brand-orange" />
            <div><div className="text-sm text-white font-medium">Sync Status</div><div className="text-xs text-slate-400">Last synced: Just now · All devices up to date</div></div>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-coral-red/10 transition-all" style={{ border: "1px solid rgba(255,86,86,0.2)" }}>
            <Trash2 className="w-4 h-4 text-coral-red" />
            <div><div className="text-sm text-coral-red font-medium">Delete Account</div><div className="text-xs text-slate-400">Permanently remove all data</div></div>
          </button>
        </div>
      </div>

      {saved && <div className="p-4 rounded-xl text-sm text-sky-blue flex items-center gap-2" style={{ background: "rgba(140,228,255,0.1)" }}><Check className="w-4 h-4" /> Settings saved successfully!</div>}
      <button onClick={handleSave} className="btn-primary text-sm py-2.5">Save All Settings</button>
    </div>
  );
}

// ─── Dashboard Shell ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-sky-blue border-t-transparent animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0E1A" }}>
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 min-h-screen">
        <div className="sticky top-0 z-20 px-6 py-4 flex items-center gap-4" style={{ background: "rgba(10,14,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg glass-card">
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            <p className="text-xs text-slate-400">Welcome back, {user?.name?.split(" ")[0]}!</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg glass-card text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral-red notification-badge" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <Routes>
            <Route index element={<OverviewPage userId={user?.id || ""} />} />
            <Route path="notes" element={<AllNotesPage userId={user?.id || ""} />} />
            <Route path="voice" element={<TypeNotesPage userId={user?.id || ""} type="voice" />} />
            <Route path="images" element={<TypeNotesPage userId={user?.id || ""} type="image" />} />
            <Route path="tags" element={<TagsPage userId={user?.id || ""} />} />
            <Route path="search" element={<SearchPage userId={user?.id || ""} />} />
            <Route path="shared" element={<SharedNotesPage />} />
            <Route path="reminders" element={<RemindersPage userId={user?.id || ""} />} />
            <Route path="activity" element={<ActivityPage userId={user?.id || ""} />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="ai" element={<Navigate to="/ai-insights" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
