import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Search, Play, Calendar, User, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchSermons } from '@/lib/queries';
import { formatSermonDate } from '@/lib/format';
import type { Sermon } from '@/lib/types';

export function SermonsPage() {
  const navigate = useNavigate();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState('all');

  useEffect(() => {
    fetchSermons(50)
      .then(setSermons)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const speakers = useMemo(() => {
    const set = new Set(sermons.map((s) => s.speaker));
    return ['all', ...Array.from(set)];
  }, [sermons]);

  const filtered = sermons.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase()) ||
      s.scripture_reference?.toLowerCase().includes(search.toLowerCase());
    const matchesSpeaker = speakerFilter === 'all' || s.speaker === speakerFilter;
    return matchesSearch && matchesSpeaker;
  });

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Sermons"
        title="Sermons & Messages"
        description="Watch, listen, and grow through the preaching and teaching of God's Word at Love Assembly."
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
                  placeholder="Search by title, scripture, or keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                />
              </div>
              <select
                value={speakerFilter}
                onChange={(e) => setSpeakerFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              >
                {speakers.map((s) => (
                  <option key={s} value={s}>{s === 'all' ? 'All Speakers' : s}</option>
                ))}
              </select>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No sermons found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((sermon, i) => (
                <Reveal key={sermon.id} delay={i * 50}>
                  <article
                    className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate({ to: '/sermons/$id', params: { id: sermon.id } })}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {sermon.thumbnail_url ? (
                        <img src={sermon.thumbnail_url} alt={sermon.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                      )}
                      <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5 fill-brand-900 text-brand-900 ml-0.5" />
                        </div>
                      </div>
                      {sermon.series && (
                        <span className="absolute top-3 left-3 rounded-full bg-brand-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {sermon.series}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-brand-950 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {sermon.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" /> {sermon.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {formatSermonDate(sermon.date)}
                        </span>
                      </div>
                      {sermon.scripture_reference && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gold-600">
                          <BookOpen className="h-3 w-3" /> {sermon.scripture_reference}
                        </p>
                      )}
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
