import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Music, Camera, Users, Baby, Heart, Hand, Megaphone, User, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { fetchMinistries } from '@/lib/queries';
import type { Ministry } from '@/lib/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Music, Camera, Users, Baby, Heart, Hand, Megaphone,
};

export function MinistriesPage() {
  const navigate = useNavigate();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMinistries()
      .then(setMinistries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Ministries"
        title="Ministries & Departments"
        description="Every member has a gift and a place to serve. Explore our ministries and find where you can plug in and grow."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ministries.map((ministry, i) => {
                const Icon = iconMap[ministry.icon ?? 'Users'] ?? Users;
                return (
                  <Reveal key={ministry.id} delay={i * 80}>
                    <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200 hover:-translate-y-1">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-brand-950">{ministry.name}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        {ministry.description}
                      </p>
                      {ministry.lead_name && (
                        <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-brand-600">
                          <User className="h-3.5 w-3.5" /> Led by {ministry.lead_name}
                        </p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Join a Ministry
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-lg text-brand-100/80 leading-relaxed">
              Serving is one of the best ways to grow in your faith and build meaningful
              relationships. Reach out to learn how you can get involved.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/contact' })}
              className="mt-8 bg-gold-500 text-brand-950 hover:bg-gold-400"
            >
              Get Involved <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
