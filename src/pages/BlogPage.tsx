import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchBlogPosts } from '@/lib/queries';
import { formatBlogDate } from '@/lib/format';
import type { BlogPost } from '@/lib/types';

const categories = ['all', 'devotional', 'testimony', 'teaching'];

export function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchBlogPosts(50)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, category]);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Blog"
        title="Blog & Articles"
        description="Devotionals, testimonies, and teachings to nourish your spirit and strengthen your walk with God."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search & filter */}
          <Reveal>
            <div className="mb-10 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                      category === cat
                        ? 'bg-brand-800 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No articles found.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <Reveal key={post.id} delay={i * 50}>
                  <article
                    className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate({ to: '/blog/$slug', params: { slug: post.slug } })}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-700 to-brand-500" />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600">
                        {post.category}
                      </span>
                      <h3 className="mt-2 font-bold text-brand-950 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{post.author}</span>
                          <span>|</span>
                          <span>{formatBlogDate(post.published_at)}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
