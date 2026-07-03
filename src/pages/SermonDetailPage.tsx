import { useEffect, useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeft, Play, Calendar, User, BookOpen, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/Reveal';
import { fetchSermonById, fetchSermons } from '@/lib/queries';
import { formatSermonDate, getYouTubeEmbed } from '@/lib/format';
import type { Sermon } from '@/lib/types';
import { toast } from 'sonner';

export function SermonDetailPage() {
  const { id } = useParams({ from: '/sermons/$id' });
  const navigate = useNavigate();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [related, setRelated] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSermonById(id), fetchSermons(5)])
      .then(([s, all]) => {
        setSermon(s);
        setRelated(all.filter((r) => r.id !== id).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: sermon?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  if (!sermon) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-slate-500">Sermon not found.</p>
        <Button onClick={() => navigate({ to: '/sermons' })} className="mt-4">Back to Sermons</Button>
      </div>
    );
  }

  const embedUrl = sermon.video_url ? getYouTubeEmbed(sermon.video_url) : null;

  return (
    <div>
      {/* Video section */}
      <section className="pt-28 pb-12 bg-brand-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate({ to: '/sermons' })}
            className="mb-6 inline-flex items-center gap-2 text-sm text-brand-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Sermons
          </button>
          {embedUrl ? (
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                src={embedUrl}
                title={sermon.title}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 flex items-center justify-center">
              <div className="text-center">
                <Play className="mx-auto h-16 w-16 text-white/80" />
                <p className="mt-4 text-white/80">Video coming soon</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            {sermon.series && (
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
                {sermon.series}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-950 tracking-tight">
              {sermon.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {sermon.speaker}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {formatSermonDate(sermon.date)}</span>
              {sermon.scripture_reference && (
                <span className="flex items-center gap-1.5 text-gold-600 font-medium"><BookOpen className="h-4 w-4" /> {sermon.scripture_reference}</span>
              )}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed">
              {sermon.description}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" onClick={handleShare} className="border-brand-200 text-brand-800 hover:bg-brand-50">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              {sermon.audio_url && (
                <a href={sermon.audio_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-brand-200 text-brand-800 hover:bg-brand-50">
                    Download Audio
                  </Button>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-950 mb-8">More Sermons</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.id} delay={i * 100}>
                  <article
                    className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate({ to: '/sermons/$id', params: { id: s.id } })}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {s.thumbnail_url ? (
                        <img src={s.thumbnail_url} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-10 w-10 text-white/80" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-brand-950 line-clamp-2">{s.title}</h3>
                      <p className="mt-2 text-xs text-slate-500">{s.speaker} | {formatSermonDate(s.date)}</p>
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
