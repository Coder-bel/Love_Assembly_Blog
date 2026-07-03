import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/Reveal';
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/queries';
import { formatBlogDate } from '@/lib/format';
import type { BlogPost } from '@/lib/types';
import { toast } from 'sonner';

export function BlogPostPage() {
  const { slug } = useParams({ from: '/blog/$slug' });
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchBlogPostBySlug(slug), fetchBlogPosts(4)])
      .then(([p, all]) => {
        setPost(p);
        setRelated(all.filter((r) => r.slug !== slug).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = (platform?: string) => {
    const url = window.location.href;
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title ?? '')}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (navigator.share) {
      navigator.share({ title: post?.title, url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="h-8 w-24 animate-pulse rounded bg-slate-200 mb-4" />
          <div className="h-12 w-full animate-pulse rounded bg-slate-200 mb-4" />
          <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-slate-500">Article not found.</p>
        <Button onClick={() => navigate({ to: '/blog' })} className="mt-4">Back to Blog</Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {post.image_url ? (
            <>
              <img src={post.image_url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/85 to-brand-800/80" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
          )}
        </div>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <button
              onClick={() => navigate({ to: '/blog' })}
              className="mb-6 inline-flex items-center gap-2 text-sm text-brand-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </button>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-brand-100/80">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatBlogDate(post.published_at)}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {post.body}
            </div>
          </Reveal>

          {/* Share */}
          <Reveal delay={200}>
            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-700 mb-3">Share this article</p>
              <div className="flex gap-3">
                <button onClick={() => handleShare('facebook')} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-brand-700 hover:text-white" aria-label="Share on Facebook">
                  <Facebook className="h-4 w-4" />
                </button>
                <button onClick={() => handleShare('twitter')} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-brand-700 hover:text-white" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </button>
                <button onClick={() => handleShare()} className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-brand-700 hover:text-white" aria-label="Copy link">
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-950 mb-8">More Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.id} delay={i * 100}>
                  <article
                    className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate({ to: '/blog/$slug', params: { slug: r.slug } })}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {r.image_url ? (
                        <img src={r.image_url} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-700 to-brand-500" />
                      )}
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">{r.category}</span>
                      <h3 className="mt-1.5 font-bold text-brand-950 line-clamp-2">{r.title}</h3>
                      <p className="mt-2 text-xs text-slate-400">{r.author} | {formatBlogDate(r.published_at)}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
