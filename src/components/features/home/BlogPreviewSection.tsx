import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/constants";
import { formatDate } from "@/lib/utils";
import { PenLine, ArrowRight, ChevronRight } from "lucide-react";

export default function BlogPreviewSection() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="tag-chip bg-sky-blue/10 text-sky-blue border border-sky-blue/20 mb-3 inline-flex items-center gap-1.5">
              <PenLine className="w-3 h-3" /> From the Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Insights & <span className="gradient-text-blue">Productivity Tips</span>
            </h2>
          </div>
          <Link to="/blog" className="btn-secondary text-sm hidden sm:flex items-center gap-1">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured */}
          <div className="lg:col-span-2 group cursor-pointer">
            <Link to={`/blog/${featured.id}`} className="block">
              <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="tag-chip bg-sky-blue/80 text-dark-navy text-xs font-bold">
                    {featured.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-sky-blue transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-2">{featured.excerpt}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <img src={featured.authorAvatar} alt={featured.author} className="w-6 h-6 rounded-full" />
                <span>{featured.author}</span>
                <span>·</span>
                <span>{formatDate(featured.publishedAt)}</span>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
            </Link>
          </div>

          {/* Smaller posts */}
          <div className="flex flex-col gap-4">
            {rest.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="group flex gap-4 glass-card p-4">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-orange mb-1">{post.category}</div>
                  <h4 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover:text-sky-blue transition-colors">
                    {post.title}
                  </h4>
                  <div className="text-xs text-slate-500">{post.readTime} min · {formatDate(post.publishedAt)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link to="/blog" className="btn-secondary text-sm inline-flex items-center gap-1">
            View All Posts <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
