import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { fetchLeaders } from '@/lib/queries';
import type { Leader } from '@/lib/types';

export function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaders()
      .then(setLeaders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const zonalPastor = leaders.find((l) => l.role.toLowerCase().includes('zonal pastor')) ?? leaders[0];
  const otherLeaders = leaders.filter((l) => l.id !== zonalPastor?.id);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Leadership"
        title="Our Leadership Team"
        description="Dedicated men and women called by God to shepherd, teach, and serve the Love Assembly family."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Zonal Pastor spotlight */}
      {zonalPastor && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
              <Reveal className="lg:col-span-2">
                <div className="relative mx-auto max-w-sm">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                    {zonalPastor.photo_url ? (
                      <img src={zonalPastor.photo_url} alt={zonalPastor.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                    )}
                  </div>
                </div>
              </Reveal>
              <div className="lg:col-span-3">
                <SectionHeading eyebrow="Zonal Pastor" title={zonalPastor.name} align="left" />
                <Reveal delay={200}>
                  <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                    {zonalPastor.bio}
                  </p>
                </Reveal>
                <Reveal delay={300}>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {zonalPastor.email && (
                      <a href={`mailto:${zonalPastor.email}`} className="inline-flex items-center gap-2 text-sm text-brand-700 hover:text-brand-800">
                        <Mail className="h-4 w-4" /> {zonalPastor.email}
                      </a>
                    )}
                    {zonalPastor.phone && (
                      <a href={`tel:${zonalPastor.phone}`} className="inline-flex items-center gap-2 text-sm text-brand-700 hover:text-brand-800">
                        <Phone className="h-4 w-4" /> {zonalPastor.phone}
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other leaders */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Team"
            title="Assistant Pastors & Exco"
            description="The dedicated team that helps lead and serve our zonal community."
          />
          {loading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherLeaders.map((leader, i) => (
                <Reveal key={leader.id} delay={i * 100}>
                  <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="aspect-[4/3] overflow-hidden">
                      {leader.photo_url ? (
                        <img src={leader.photo_url} alt={leader.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-700 to-brand-500" />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-brand-950">{leader.name}</h3>
                      <p className="text-sm font-medium text-brand-600">{leader.role}</p>
                      {leader.bio && (
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {leader.bio}
                        </p>
                      )}
                      <div className="mt-4 flex gap-3">
                        {leader.email && (
                          <a href={`mailto:${leader.email}`} className="text-slate-400 hover:text-brand-700 transition-colors" aria-label="Email">
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {leader.phone && (
                          <a href={`tel:${leader.phone}`} className="text-slate-400 hover:text-brand-700 transition-colors" aria-label="Phone">
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
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
