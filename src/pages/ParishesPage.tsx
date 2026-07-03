import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, User, Navigation } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchParishes } from '@/lib/queries';
import type { Parish } from '@/lib/types';

export function ParishesPage() {
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchParishes()
      .then(setParishes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = parishes.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.address?.toLowerCase().includes(search.toLowerCase()) ||
    p.pastor_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Parishes"
        title="Parishes Under the Zone"
        description="Find a Love Assembly parish near you. Each parish is a family — come worship, grow, and serve with us."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <Reveal>
            <div className="mx-auto max-w-md mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, location, or pastor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                />
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">No parishes found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((parish, i) => (
                <Reveal key={parish.id} delay={i * 100}>
                  <div className="group h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                        <MapPin className="h-6 w-6" />
                      </div>
                      {parish.latitude && parish.longitude && (
                        <a
                          href={`https://www.google.com/maps?q=${parish.latitude},${parish.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-800"
                        >
                          <Navigation className="h-3.5 w-3.5" /> Directions
                        </a>
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-brand-950">{parish.name}</h3>
                    {parish.address && (
                      <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" />
                        {parish.address}
                      </p>
                    )}
                    {parish.pastor_name && (
                      <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <User className="h-4 w-4 shrink-0 text-slate-400" />
                        {parish.pastor_name}
                      </p>
                    )}
                    {parish.service_times && (
                      <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4 mt-0.5 shrink-0 text-slate-400" />
                        {parish.service_times}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex gap-4">
                      {parish.phone && (
                        <a href={`tel:${parish.phone}`} className="inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-800">
                          <Phone className="h-3.5 w-3.5" /> Call
                        </a>
                      )}
                      {parish.email && (
                        <a href={`mailto:${parish.email}`} className="inline-flex items-center gap-1.5 text-sm text-brand-700 hover:text-brand-800">
                          <Mail className="h-3.5 w-3.5" /> Email
                        </a>
                      )}
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
