import { BookOpen } from 'lucide-react';
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
      <Reveal>
  <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <BookOpen className="h-5 w-5" />
      </div>
      <h2 className="text-xl font-bold text-brand-950">A Brief History of RCCG</h2>
    </div>
    <p className="text-slate-600 leading-relaxed">
      The Redeemed Christian Church of God traces its roots to 1952, when Pa Josiah Olufemi
      Akindayomi, a Yoruba man with no formal education, left the Cherubim and Seraphim church
      to start a small prayer fellowship called the "Glory of God Fellowship" at 9 Willoughby
      Street, Ebute-Metta, Lagos. In a vision, God revealed to him the name the fellowship would
      carry The Redeemed Christian Church of God which he was miraculously able to write out
      despite being unable to read or write.
    </p>
    <p className="mt-4 text-slate-600 leading-relaxed">
      What began with nine members grew steadily over the following decades. Before his death in
      1980, Akindayomi prophetically identified his successor: a young university mathematics
      lecturer named Enoch Adejare Adeboye, who had joined the church only in 1973. Since Pastor
      Adeboye's appointment as General Overseer in 1981, RCCG has grown from around 39 parishes
      into a global movement present in nearly 200 nations, with tens of thousands of parishes
      worldwide among the largest Pentecostal denominations on earth.
    </p>
  </div>
</Reveal>   
          


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
                  <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg">
  <div className="flex flex-col sm:flex-row">
    <div className="sm:w-72 shrink-0 aspect-square sm:aspect-auto overflow-hidden bg-gradient-to-br from-brand-800 to-brand-600">
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
    <div className="flex-1 p-6 sm:max-h-96 sm:overflow-y-auto">
      <h3 className="text-lg font-bold text-brand-950">{legend.name}</h3>
      {legend.title && (
        <p className="text-sm font-medium text-brand-600">{legend.title}</p>
      )}
      {legend.era && (
        <p className="mt-1 text-xs text-slate-400">{legend.era}</p>
      )}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
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
