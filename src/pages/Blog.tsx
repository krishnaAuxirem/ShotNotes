import { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/constants";
import { formatDate } from "@/lib/utils";
import { Search, PenLine, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Productivity", "AI & Technology", "Research", "Tutorial", "Case Study"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = BLOG_POSTS.filter((p) => {
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen">
      <div className="page-hero pt-32 pb-20 text-center">
        <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-4 inline-flex items-center gap-1.5">
          <PenLine className="w-3 h-3" /> Blog
        </span>
        <h1 className="section-title text-white">Insights & <span className="gradient-text-blue">Productivity Tips</span></h1>
        <p className="section-subtitle mt-4">Expert articles on note-taking, AI, productivity, and building your second brain.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div className="relative flex-1 min-w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-10 text-sm" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${category === c ? "text-dark-navy" : "glass-card text-slate-400 hover:text-white"}`} style={category === c ? { background: "linear-gradient(135deg, #8CE4FF, #FEEE91)" } : {}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No articles found for your search.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link to={`/blog/${featured.id}`} className="group block mb-10">
                <div className="glass-card overflow-hidden flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img src={featured.imageUrl} alt={featured.title} className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-4 left-4"><span className="tag-chip bg-sky-blue/80 text-dark-navy text-xs font-bold px-3 py-1">{featured.category}</span></div>
                  </div>
                  <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                    <div className="text-xs text-slate-400 mb-3 flex items-center gap-3">
                      <img src={featured.authorAvatar} className="w-6 h-6 rounded-full" alt={featured.author} />
                      {featured.author} · {formatDate(featured.publishedAt)} · {featured.readTime} min read
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-blue transition-colors">{featured.title}</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-6">{featured.tags.map((tag) => <span key={tag} className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 text-xs">#{tag}</span>)}</div>
                    <div className="flex items-center gap-2 text-sky-blue text-sm font-medium">
                      Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group glass-card overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative overflow-hidden h-48">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute top-3 left-3"><span className="text-xs px-2 py-0.5 rounded-full font-medium bg-brand-orange/80 text-dark-navy">{post.category}</span></div>
                  </div>
                  <div className="p-5">
                    <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                      <img src={post.authorAvatar} className="w-5 h-5 rounded-full" alt={post.author} />
                      {post.author} · {post.readTime} min
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-sky-blue transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{formatDate(post.publishedAt)}</span>
                      <span className="text-xs text-slate-500">{post.views.toLocaleString("en-IN")} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
