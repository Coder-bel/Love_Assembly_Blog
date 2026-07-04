import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Crown } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchLegends } from '@/lib/queries';
import type { RccgLegend } from '@/lib/types';

export function LegendsPage() {
  const navigate = useNavigate();
  const [legends, setLegends] = useState<RccgLegend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLegends()
      .then(setLegends)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Blog / RCCG Legends"
        title="RCCG Legends"
        description="Short biographies of notable figures in The Redeemed Christian Church of God."
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
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : legends.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <Crown className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No legends profiles yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Check back soon for biographies of notable RCCG figures.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {legends.map((legend, i) => (
                <Reveal key={legend.id} delay={i * 100}>
                  <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 shrink-0 aspect-square sm:aspect-auto overflow-hidden bg-gradient-to-br from-brand-800 to-brand-600">
                        {legend.photo_url ? (
                          <img
                            src={legend.photo_url}
                            alt={legend.name}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Crown className="h-10 w-10 text-white/40" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-lg font-bold text-brand-950">{legend.name}</h3>
                        {legend.title && (
                          <p className="text-sm font-medium text-brand-600">{legend.title}</p>
                        )}
                        {legend.era && (
                          <p className="mt-1 text-xs text-slate-400">{legend.era}</p>
                        )}
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-4">
                          {legend.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
