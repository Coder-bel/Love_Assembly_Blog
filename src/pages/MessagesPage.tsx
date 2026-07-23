import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, User, Calendar, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchBlogPosts } from '@/lib/queries';
import { formatBlogDate } from '@/lib/format';
import type { BlogPost } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function MessagesPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogPosts(50, 'message')
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Blog / Messages"
        title="Messages"
        description="Short highlights and summaries of messages preached at Christ Love Assembly."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate({ to: '/blog' })}
            className="mb-8 inline-flex items-center gap-2 text-sm text-brand-700 hover:text-brand-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </button>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No messages yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Check back soon for highlights from recent messages.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 80}>
                  <article className="group h-full flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                    {post.image_url && (
                      <div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-brand-950 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      {(post.preacher_name || post.author) && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {post.preacher_name || post.author}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {formatBlogDate(post.published_at)}
                      </span>
                    </div>
                    {post.excerpt && (
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-4 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="mt-4 self-start text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
                    >
                      Read More →
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Full Message Modal */}
      <Dialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-brand-950">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>
              {selectedPost.image_url && (
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={selectedPost.image_url}
                    alt={selectedPost.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                {(selectedPost.preacher_name || selectedPost.author) && (
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" /> {selectedPost.preacher_name || selectedPost.author}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" /> {formatBlogDate(selectedPost.published_at)}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedPost.body}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
