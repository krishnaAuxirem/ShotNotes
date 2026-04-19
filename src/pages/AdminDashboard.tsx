import { useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getRegisteredUsers } from "@/lib/auth";
import { getAllNotes } from "@/lib/notes";
import { BLOG_POSTS } from "@/constants";
import { formatRelativeTime, formatDate, formatNumber } from "@/lib/utils";
import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import {
  Users, FileText, DollarSign, Wifi, TrendingUp, BarChart2, PieChart as PieIcon,
  Search, PenLine, Settings, Menu, Zap, Plus, Shield, Bell, Download,
  CheckCircle, X, AlertCircle, CreditCard, ArrowUpRight, ArrowDownRight,
  Filter, RefreshCw, Star, Globe, Lock, Edit3, Trash2, Eye,
  UserCheck, UserX, Database, Cpu, HardDrive, Activity,
} from "lucide-react";

// ─── Chart & Mock Data ────────────────────────────────────────────────────────
const MONTHLY_DATA = [
  { month: "Aug", users: 12400, notes: 89000, revenue: 142000 },
  { month: "Sep", users: 18700, notes: 134000, revenue: 218000 },
  { month: "Oct", users: 24300, notes: 187000, revenue: 289000 },
  { month: "Nov", users: 31200, notes: 245000, revenue: 378000 },
  { month: "Dec", users: 38900, notes: 312000, revenue: 467000 },
  { month: "Jan", users: 47500, notes: 389000, revenue: 571000 },
];

const PIE_DATA = [
  { name: "Text", value: 55, color: "#8CE4FF" },
  { name: "Voice", value: 28, color: "#FEEE91" },
  { name: "Image", value: 17, color: "#FFA239" },
];

const PLAN_DATA = [
  { name: "Free", value: 68, color: "#64748b" },
  { name: "Pro", value: 24, color: "#8CE4FF" },
  { name: "Enterprise", value: 8, color: "#FFA239" },
];

const RECENT_TRANSACTIONS = [
  { id: "TXN001", user: "Priya Sharma", plan: "Pro", amount: 599, status: "success", date: "2026-04-18T09:00:00Z" },
  { id: "TXN002", user: "Arjun Mehta", plan: "Enterprise", amount: 1499, status: "success", date: "2026-04-17T14:00:00Z" },
  { id: "TXN003", user: "Sneha Patel", plan: "Pro", amount: 599, status: "failed", date: "2026-04-17T11:00:00Z" },
  { id: "TXN004", user: "Vikram Rajan", plan: "Pro", amount: 599, status: "success", date: "2026-04-16T16:00:00Z" },
  { id: "TXN005", user: "Ananya K.", plan: "Enterprise", amount: 1499, status: "refunded", date: "2026-04-15T10:00:00Z" },
];

const SYSTEM_METRICS = [
  { label: "API Response Time", value: "142ms", Icon: Cpu, status: "good", color: "#34D399" },
  { label: "DB Query Time", value: "38ms", Icon: Database, status: "good", color: "#34D399" },
  { label: "Storage Used", value: "2.4 TB", Icon: HardDrive, status: "warn", color: "#FEEE91" },
  { label: "Active Sessions", value: "12,847", Icon: Wifi, status: "good", color: "#34D399" },
  { label: "Error Rate", value: "0.02%", Icon: AlertCircle, status: "good", color: "#34D399" },
  { label: "CPU Usage", value: "34%", Icon: Activity, status: "good", color: "#34D399" },
];

const NOTIFICATIONS_MOCK = [
  { id: "n1", type: "alert", message: "Storage at 78% capacity — consider upgrading plan", time: "2026-04-19T08:00:00Z", read: false },
  { id: "n2", type: "success", message: "Monthly backup completed successfully", time: "2026-04-19T06:00:00Z", read: false },
  { id: "n3", type: "info", message: "5 new enterprise sign-ups this week", time: "2026-04-18T20:00:00Z", read: true },
  { id: "n4", type: "alert", message: "Failed payment attempt: TXN003", time: "2026-04-17T11:00:00Z", read: true },
  { id: "n5", type: "info", message: "New blog post published: AI Features Guide", time: "2026-04-16T15:00:00Z", read: true },
];

// ─── Overview ─────────────────────────────────────────────────────────────────
function AdminOverview() {
  const users = getRegisteredUsers();
  const notes = getAllNotes();

  const STATS = [
    { label: "Total Users", value: users.length + 498342, Icon: Users, color: "#8CE4FF", change: "+1.2K this week", up: true },
    { label: "Total Notes", value: notes.length + 24987231, Icon: FileText, color: "#FEEE91", change: "+45K today", up: true },
    { label: "Monthly Revenue", value: "₹18.4L", Icon: DollarSign, color: "#FFA239", change: "+12% MoM", up: true },
    { label: "Active Sessions", value: "12,847", Icon: Wifi, color: "#34D399", change: "Real-time", up: true },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-6 h-6" style={{ color: s.color }} />
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${s.up ? "" : "text-coral-red"}`} style={{ background: `${s.color}20`, color: s.color }}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {s.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{typeof s.value === "number" ? formatNumber(s.value) : s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-sky-blue" /> User & Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={MONTHLY_DATA}>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 10, color: "#fff" }} formatter={(v: number) => v.toLocaleString("en-IN")} />
              <Line type="monotone" dataKey="users" stroke="#8CE4FF" strokeWidth={2} dot={{ fill: "#8CE4FF", strokeWidth: 0, r: 4 }} name="Users" />
              <Line type="monotone" dataKey="revenue" stroke="#FFA239" strokeWidth={2} strokeDasharray="4 2" dot={false} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-sky-blue" /> Note Types</h3>
          <div className="flex justify-center">
            <PieChart width={160} height={160}>
              <Pie data={PIE_DATA} cx={75} cy={75} innerRadius={40} outerRadius={70} dataKey="value" strokeWidth={0}>
                {PIE_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="mt-4 space-y-2">
            {PIE_DATA.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                <span className="text-xs text-slate-400 flex-1">{d.name}</span>
                <span className="text-xs font-medium text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Quick View */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SYSTEM_METRICS.map((m) => {
          const Icon = m.Icon;
          return (
            <div key={m.label} className="glass-card p-4 text-center">
              <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: m.color }} />
              <div className="text-sm font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{m.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Users ────────────────────────────────────────────────────────────────────
function AdminUsers() {
  const users = getRegisteredUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchQ = !search || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchQ && matchRole;
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Users className="w-5 h-5 text-sky-blue" /> User Management</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-9 text-sm w-52" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="input-field text-sm py-1.5 px-3" value={roleFilter || ""} onChange={(e) => setRoleFilter(e.target.value || null)}>
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Users", value: filtered.length + 498340, Icon: Users, color: "#8CE4FF" },
          { label: "Active Today", value: 8420, Icon: UserCheck, color: "#34D399" },
          { label: "Suspended", value: 12, Icon: UserX, color: "#FF5656" },
        ].map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-4 flex items-center gap-3">
              <Icon className="w-6 h-6" style={{ color: s.color }} />
              <div><div className="text-xl font-bold text-white">{typeof s.value === "number" ? s.value.toLocaleString("en-IN") : s.value}</div><div className="text-xs text-slate-400">{s.label}</div></div>
            </div>
          );
        })}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full data-table">
          <thead><tr><th>User</th><th>Role</th><th>Plan</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <img src={u.avatar || `https://i.pravatar.cc/40?u=${u.email}`} alt={u.name} className="w-8 h-8 rounded-full" />
                    <div><div className="text-sm text-white font-medium">{u.name}</div><div className="text-xs text-slate-500">{u.email}</div></div>
                  </div>
                </td>
                <td><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.role === "admin" ? "bg-coral-red/20 text-coral-red" : "bg-sky-blue/20 text-sky-blue"}`}>{u.role}</span></td>
                <td><span className="text-xs px-2 py-0.5 rounded-full bg-light-yellow/20 text-light-yellow capitalize">{u.plan}</span></td>
                <td className="text-xs text-slate-400">{formatDate(u.createdAt)}</td>
                <td><span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400">Active</span></td>
                <td>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded glass-card text-sky-blue hover:bg-sky-blue/10"><Eye className="w-3 h-3" /></button>
                    <button className="p-1.5 rounded glass-card text-light-yellow hover:bg-light-yellow/10"><Edit3 className="w-3 h-3" /></button>
                    <button className="p-1.5 rounded glass-card text-coral-red hover:bg-coral-red/10"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Notes Monitor ────────────────────────────────────────────────────────────
function AdminNotes() {
  const notes = getAllNotes();
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const filtered = typeFilter ? notes.filter((n) => n.type === typeFilter) : notes;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2"><FileText className="w-5 h-5 text-sky-blue" /> Notes Monitor ({notes.length})</h2>
        <div className="flex gap-2">
          {[null, "text", "voice", "image"].map((t) => {
            const labels: Record<string, string> = { text: "Text", voice: "Voice", image: "Image" };
            return (
              <button key={String(t)} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${typeFilter === t ? "text-dark-navy" : "glass-card text-slate-400"}`} style={typeFilter === t ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}>
                {t ? labels[t] : "All"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full data-table">
          <thead><tr><th>Title</th><th>Type</th><th>User ID</th><th>Tags</th><th>Created</th></tr></thead>
          <tbody>
            {filtered.slice(0, 20).map((note) => (
              <tr key={note.id}>
                <td><div className="text-sm text-white font-medium max-w-xs truncate">{note.title}</div></td>
                <td><span className={`text-xs px-2 py-0.5 rounded-full ${note.type === "text" ? "bg-sky-blue/20 text-sky-blue" : note.type === "voice" ? "bg-light-yellow/20 text-light-yellow" : "bg-brand-orange/20 text-brand-orange"}`}>{note.type}</span></td>
                <td className="text-xs text-slate-400 font-mono">{note.userId.slice(0, 12)}…</td>
                <td>
                  <div className="flex gap-1 flex-wrap">
                    {note.tags.slice(0, 2).map((t) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400">#{t}</span>)}
                    {note.tags.length > 2 && <span className="text-[10px] text-slate-500">+{note.tags.length - 2}</span>}
                  </div>
                </td>
                <td className="text-xs text-slate-400">{formatRelativeTime(note.createdAt)}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={5} className="text-center text-slate-500 py-8">No notes yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Blog Manager ─────────────────────────────────────────────────────────────
function AdminBlog() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", category: "Productivity" });

  const handleSubmit = () => {
    if (!form.title) return;
    if (editId) {
      setPosts(posts.map((p) => p.id === editId ? { ...p, ...form } : p));
      setEditId(null);
    } else {
      const newPost = { ...BLOG_POSTS[0], id: Date.now().toString(), ...form, publishedAt: new Date().toISOString(), views: 0 };
      setPosts([newPost, ...posts]);
    }
    setForm({ title: "", excerpt: "", category: "Productivity" });
    setShowForm(false);
  };

  const handleEdit = (post: typeof BLOG_POSTS[0]) => {
    setForm({ title: post.title, excerpt: post.excerpt, category: post.category });
    setEditId(post.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2"><PenLine className="w-5 h-5 text-sky-blue" /> Blog Management</h2>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", excerpt: "", category: "Productivity" }); }} className="btn-primary text-sm py-2 flex items-center gap-1">
          <Plus className="w-3 h-3" /> New Post
        </button>
      </div>

      {showForm && (
        <div className="glass-card p-6 mb-6">
          <h3 className="font-semibold text-white mb-4">{editId ? "Edit Post" : "Create New Blog Post"}</h3>
          <div className="space-y-3">
            <input className="input-field" placeholder="Post title..." value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <textarea className="input-field min-h-20 resize-none" placeholder="Excerpt/description..." value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
            <select className="input-field text-sm" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {["Productivity", "AI & Technology", "Research", "Tutorial", "Case Study"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="flex gap-2">
              <button onClick={handleSubmit} className="btn-primary text-sm py-2">{editId ? "Update Post" : "Publish"}</button>
              <button onClick={() => { setShowForm(false); setEditId(null); }} className="btn-secondary text-sm py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card overflow-hidden">
        <table className="w-full data-table">
          <thead><tr><th>Title</th><th>Category</th><th>Published</th><th>Views</th><th>Actions</th></tr></thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td><div className="text-sm text-white font-medium max-w-xs truncate">{post.title}</div></td>
                <td><span className="text-xs px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange">{post.category}</span></td>
                <td className="text-xs text-slate-400">{formatDate(post.publishedAt)}</td>
                <td className="text-sm text-white">{post.views.toLocaleString("en-IN")}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post)} className="p-1.5 rounded glass-card text-light-yellow hover:bg-light-yellow/10"><Edit3 className="w-3 h-3" /></button>
                    <button onClick={() => setPosts(posts.filter((p) => p.id !== post.id))} className="p-1.5 rounded glass-card text-coral-red hover:bg-coral-red/10"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────────
function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2"><BarChart2 className="w-5 h-5 text-sky-blue" /> Platform Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><DollarSign className="w-4 h-4 text-brand-orange" /> Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA239" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFA239" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(255,162,57,0.2)", borderRadius: 10, color: "#fff" }} formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
              <Area type="monotone" dataKey="revenue" stroke="#FFA239" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Plan Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><PieIcon className="w-4 h-4 text-sky-blue" /> Plan Distribution</h3>
          <div className="flex items-center gap-6">
            <PieChart width={150} height={150}>
              <Pie data={PLAN_DATA} cx={70} cy={70} outerRadius={65} dataKey="value" strokeWidth={0}>
                {PLAN_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-3">
              {PLAN_DATA.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: d.color }} /><span className="text-sm text-white">{d.name}</span></div>
                    <span className="text-sm font-bold text-white">{d.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full" style={{ width: `${d.value}%`, background: d.color }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Created per Month */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-sky-blue" /> Notes Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_DATA}>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(140,228,255,0.2)", borderRadius: 10, color: "#fff" }} formatter={(v: number) => v.toLocaleString("en-IN")} />
              <Bar dataKey="notes" fill="#8CE4FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Geo Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-sky-blue" /> Top Regions</h3>
          <div className="space-y-3">
            {[
              { country: "India", users: 312000, pct: 62 },
              { country: "USA", users: 78000, pct: 16 },
              { country: "UK", users: 35000, pct: 7 },
              { country: "Singapore", users: 22000, pct: 4 },
              { country: "Others", users: 51000, pct: 11 },
            ].map((r) => (
              <div key={r.country}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{r.country}</span>
                  <span className="text-xs text-slate-400">{r.users.toLocaleString("en-IN")} users · {r.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5"><div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: "linear-gradient(90deg, #8CE4FF, #FEEE91)" }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Download className="w-4 h-4 text-sky-blue" /> Export Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "User Report", desc: "All users with plan & activity data", format: "CSV" },
            { label: "Revenue Report", desc: "Monthly breakdown by plan", format: "XLSX" },
            { label: "Notes Analytics", desc: "Note creation trends & types", format: "PDF" },
          ].map((r) => (
            <button key={r.label} className="glass-card p-4 text-left hover:border-sky-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{r.label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-blue/20 text-sky-blue">{r.format}</span>
              </div>
              <div className="text-xs text-slate-400 mb-3">{r.desc}</div>
              <div className="flex items-center gap-1 text-xs text-sky-blue"><Download className="w-3 h-3" /> Download</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Revenue & Billing ────────────────────────────────────────────────────────
function AdminRevenue() {
  const REVENUE_STATS = [
    { label: "MRR", value: "₹18.4L", change: "+12%", Icon: TrendingUp, color: "#34D399", up: true },
    { label: "ARR", value: "₹2.2Cr", change: "+34%", Icon: DollarSign, color: "#8CE4FF", up: true },
    { label: "Avg. Revenue/User", value: "₹ 367", change: "+8%", Icon: Star, color: "#FEEE91", up: true },
    { label: "Churn Rate", value: "2.1%", change: "-0.3%", Icon: ArrowDownRight, color: "#34D399", up: true },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2"><CreditCard className="w-5 h-5 text-sky-blue" /> Revenue & Billing</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {REVENUE_STATS.map((s) => {
          const Icon = s.Icon;
          return (
            <div key={s.label} className="glass-card p-5">
              <Icon className="w-6 h-6 mb-2" style={{ color: s.color }} />
              <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-slate-400 mb-1">{s.label}</div>
              <div className={`text-xs font-medium flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-coral-red"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {s.change} MoM
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4">Revenue Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={MONTHLY_DATA}>
            <defs>
              <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#1A2235", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 10, color: "#fff" }} formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
            <Area type="monotone" dataKey="revenue" stroke="#34D399" fill="url(#revG)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="glass-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white">Recent Transactions</h3>
          <button className="text-xs text-sky-blue hover:underline flex items-center gap-1"><Download className="w-3 h-3" /> Export</button>
        </div>
        <table className="w-full data-table">
          <thead><tr><th>ID</th><th>User</th><th>Plan</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>
            {RECENT_TRANSACTIONS.map((tx) => (
              <tr key={tx.id}>
                <td className="font-mono text-xs text-slate-500">{tx.id}</td>
                <td className="text-sm text-white">{tx.user}</td>
                <td><span className="text-xs px-2 py-0.5 rounded-full bg-sky-blue/20 text-sky-blue">{tx.plan}</span></td>
                <td className="text-sm font-semibold text-white">₹{tx.amount.toLocaleString("en-IN")}</td>
                <td>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tx.status === "success" ? "bg-emerald-400/20 text-emerald-400" : tx.status === "failed" ? "bg-coral-red/20 text-coral-red" : "bg-slate-500/20 text-slate-400"}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="text-xs text-slate-400">{formatRelativeTime(tx.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Roles & Permissions ──────────────────────────────────────────────────────
function AdminRoles() {
  const ROLES = [
    {
      name: "Super Admin",
      color: "#FF5656",
      users: 1,
      perms: ["Full platform access", "Delete users", "Manage billing", "View all data", "System settings", "Role management"],
    },
    {
      name: "Admin",
      color: "#FFA239",
      users: 3,
      perms: ["User management", "Blog management", "View analytics", "Manage notes", "Send notifications"],
    },
    {
      name: "Pro User",
      color: "#8CE4FF",
      users: 119847,
      perms: ["Unlimited notes", "Voice & Image notes", "AI features", "Priority support", "15 GB storage"],
    },
    {
      name: "Free User",
      color: "#64748b",
      users: 379342,
      perms: ["50 notes/month", "Text notes only", "Basic search", "2 GB storage"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Shield className="w-5 h-5 text-sky-blue" /> Roles & Permissions</h2>
        <button className="btn-primary text-sm py-2 flex items-center gap-1"><Plus className="w-3 h-3" /> New Role</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ROLES.map((role) => (
          <div key={role.name} className="glass-card p-6" style={{ border: `1px solid ${role.color}25` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${role.color}20` }}>
                  <Shield className="w-5 h-5" style={{ color: role.color }} />
                </div>
                <div>
                  <div className="font-semibold text-white">{role.name}</div>
                  <div className="text-xs text-slate-400">{role.users.toLocaleString("en-IN")} users</div>
                </div>
              </div>
              <button className="p-1.5 rounded glass-card text-slate-400 hover:text-white"><Edit3 className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-2">
              {role.perms.map((perm) => (
                <div key={perm} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: role.color }} />
                  {perm}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function AdminNotifications() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS_MOCK);
  const unread = notifs.filter((n) => !n.read).length;

  const markRead = (id: string) => setNotifs((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs((ns) => ns.map((n) => ({ ...n, read: true })));
  const remove = (id: string) => setNotifs((ns) => ns.filter((n) => n.id !== id));

  const icons: Record<string, typeof AlertCircle> = { alert: AlertCircle, success: CheckCircle, info: Bell };
  const colors: Record<string, string> = { alert: "#FF5656", success: "#34D399", info: "#8CE4FF" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Bell className="w-5 h-5 text-sky-blue" /> Notifications
          {unread > 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-coral-red text-white">{unread}</span>}
        </h2>
        <div className="flex gap-2">
          {unread > 0 && <button onClick={markAllRead} className="text-xs text-sky-blue hover:underline flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Mark all read</button>}
        </div>
      </div>

      {/* Send Notification Panel */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-sky-blue" /> Send Platform Notification</h3>
        <div className="space-y-3">
          <select className="input-field text-sm">
            <option>All Users</option>
            <option>Pro Users Only</option>
            <option>Free Users Only</option>
            <option>Enterprise Users</option>
          </select>
          <input className="input-field text-sm" placeholder="Notification title..." />
          <textarea className="input-field text-sm resize-none min-h-20" placeholder="Notification message..." />
          <div className="flex gap-2">
            <button className="btn-primary text-sm py-2">Send Notification</button>
            <button className="btn-secondary text-sm py-2">Schedule</button>
          </div>
        </div>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifs.map((n) => {
          const Icon = icons[n.type] || Bell;
          const color = colors[n.type] || "#8CE4FF";
          return (
            <div key={n.id} className={`glass-card p-4 flex items-start gap-3 transition-all ${n.read ? "opacity-60" : ""}`} style={!n.read ? { border: `1px solid ${color}25` } : {}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">{n.message}</div>
                <div className="text-xs text-slate-500 mt-1">{formatRelativeTime(n.time)}</div>
              </div>
              <div className="flex gap-2">
                {!n.read && <button onClick={() => markRead(n.id)} className="text-xs text-sky-blue hover:underline">Mark read</button>}
                <button onClick={() => remove(n.id)} className="text-slate-600 hover:text-coral-red"><X className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── System Settings ──────────────────────────────────────────────────────────
function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
    aiFeatures: true,
    emailNotifications: true,
    rateLimiting: true,
    debugMode: false,
  });

  const toggle = (key: keyof typeof settings) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const SETTING_DEFS = [
    { key: "maintenance", label: "Maintenance Mode", desc: "Temporarily disable public access", color: "#FF5656" },
    { key: "registration", label: "User Registration", desc: "Allow new user sign-ups", color: "#34D399" },
    { key: "aiFeatures", label: "AI Features", desc: "Enable AI summarization for all users", color: "#8CE4FF" },
    { key: "emailNotifications", label: "Email Notifications", desc: "Send system emails to users", color: "#8CE4FF" },
    { key: "rateLimiting", label: "Rate Limiting", desc: "Protect API from abuse (recommended ON)", color: "#FEEE91" },
    { key: "debugMode", label: "Debug Mode", desc: "Verbose logging for troubleshooting", color: "#A78BFA" },
  ] as const;

  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="text-xl font-semibold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-sky-blue" /> Platform Settings</h2>

      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-5 flex items-center gap-2"><Zap className="w-4 h-4 text-light-yellow" /> Feature Flags</h3>
        <div className="space-y-4">
          {SETTING_DEFS.map((s) => (
            <div key={s.key} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div>
                <div className="font-medium text-white text-sm">{s.label}</div>
                <div className="text-xs text-slate-400">{s.desc}</div>
              </div>
              <button onClick={() => toggle(s.key)} className={`w-12 h-6 rounded-full transition-colors ${settings[s.key] ? "" : "bg-white/10"}`} style={settings[s.key] ? { background: s.color } : {}}>
                <div className={`w-5 h-5 rounded-full bg-white m-0.5 transition-transform ${settings[s.key] ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="glass-card p-6">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-sky-blue" /> System Information</h3>
        <div className="space-y-3">
          {[
            ["Platform Version", "v2.4.1"],
            ["Database", "PostgreSQL 16 · Supabase"],
            ["Storage Provider", "Supabase Storage · 2.4 TB"],
            ["AI Engine", "GPT-5 · ShotNotes AI Gateway"],
            ["Edge Functions", "12 deployed · All healthy"],
            ["Last Deploy", "Apr 18, 2026 · 03:42 AM IST"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-xs text-slate-400">{k}</span>
              <span className="text-xs text-white font-mono">{v}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-1.5 text-xs text-sky-blue hover:underline"><RefreshCw className="w-3 h-3" /> Check for Updates</button>
      </div>

      <button className="btn-primary text-sm py-2.5">Save Settings</button>
    </div>
  );
}

// ─── Admin Shell ──────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-coral-red border-t-transparent animate-spin" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex" style={{ background: "#0A0E1A" }}>
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 min-h-screen">
        <div className="sticky top-0 z-20 px-6 py-4 flex items-center gap-4" style={{ background: "rgba(10,14,26,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg glass-card">
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
            <p className="text-xs text-coral-red flex items-center gap-1"><Zap className="w-3 h-3" /> Super Admin Access</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative p-2 rounded-lg glass-card text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral-red" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="notes" element={<AdminNotes />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="roles" element={<AdminRoles />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
