import { useParams, Link } from "react-router-dom";
import { BLOG_POSTS } from "@/constants";
import { formatDate } from "@/lib/utils";
import { FileText, Lightbulb, Check, ChevronLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);
  const related = BLOG_POSTS.filter((p) => p.id !== id).slice(0, 3);

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <FileText className="w-16 h-16 text-slate-600 mb-4" />
      <h2 className="text-2xl font-bold text-white mb-3">Article Not Found</h2>
      <Link to="/blog" className="btn-primary text-sm py-2">Back to Blog</Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-navy via-dark-navy/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <span className="tag-chip bg-sky-blue/80 text-dark-navy text-xs font-bold mb-3 inline-flex">{post.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-white/5">
          <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full" />
          <div>
            <div className="font-semibold text-white">{post.author}</div>
            <div className="text-xs text-slate-400">{formatDate(post.publishedAt)} · {post.readTime} min read · {post.views.toLocaleString("en-IN")} views</div>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            {post.tags.map((tag) => <span key={tag} className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 text-xs">#{tag}</span>)}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-slate-300 leading-relaxed mb-6">{post.excerpt}</p>
          <p className="text-slate-400 leading-relaxed mb-6">{post.content}</p>

          <div className="glass-card p-6 my-8">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-light-yellow" /> Key Takeaways
            </h3>
            <ul className="space-y-2">
              {["Establish a consistent note-taking routine", "Use AI to surface patterns and insights", "Organize notes with tags and categories for quick retrieval", "Review and refine notes regularly to deepen retention"].map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-sky-blue mt-0.5 flex-shrink-0" />{takeaway}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-slate-400 leading-relaxed mb-6">
            The most successful note-takers share one common trait: consistency. Whether you use ShotNotes or any other platform, the system only works if you commit to using it daily. Start with one note per day, and build from there.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Remember, the goal isn't perfection — it's capture. A rough, imperfect note captured instantly is infinitely more valuable than the perfect note you planned to write but never did. Trust the system, and the system will serve you.
          </p>
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 py-6 border-t border-white/5 mt-8">
          <span className="text-sm text-slate-400">Share this article:</span>
          {["Twitter", "LinkedIn", "WhatsApp"].map((platform) => (
            <button key={platform} className="px-3 py-1.5 rounded-lg glass-card text-xs text-slate-300 hover:text-white transition-colors">
              {platform}
            </button>
          ))}
        </div>

        {/* Related */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="group glass-card overflow-hidden">
                <img src={p.imageUrl} alt={p.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="p-4">
                  <div className="text-xs text-brand-orange mb-1">{p.category}</div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-sky-blue transition-colors line-clamp-2">{p.title}</h4>
                  <div className="text-xs text-slate-500 mt-2">{p.readTime} min read</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link to="/blog" className="btn-secondary text-sm inline-flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
