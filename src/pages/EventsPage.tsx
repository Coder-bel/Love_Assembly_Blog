import { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, CalendarDays } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { fetchAllEvents } from '@/lib/queries';
import { formatEventDateLong, formatEventTime } from '@/lib/format';
import type { EventItem } from '@/lib/types';

export function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllEvents()
      .then(setEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Events"
        title="Events Calendar"
        description="Stay connected with everything happening at Love Assembly — from worship services to conferences and community outreach."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Upcoming events */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <CalendarDays className="h-7 w-7 text-brand-700" />
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-950">Upcoming Events</h2>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : upcoming.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No upcoming events</h3>
              <p className="mt-2 text-sm text-slate-500">
                Check back soon or subscribe to our newsletter to be the first to know.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {upcoming.map((event, i) => (
                <Reveal key={event.id} delay={i * 50}>
                  <div className="group grid gap-6 rounded-2xl border border-slate-100 bg-white p-5 transition-all hover:shadow-lg hover:border-brand-200 sm:grid-cols-[auto,1fr,auto] sm:items-center">
                    {/* Date block */}
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-900 shrink-0">
                      <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                      <span className="text-xs font-semibold uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      {event.is_featured && (
                        <span className="inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-semibold text-gold-600 mb-2">
                          Featured
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-brand-950">{event.title}</h3>
                      {event.description && (
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" /> {formatEventTime(event.date)}
                        </span>
                        {event.venue && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {event.venue}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="hidden sm:block">
                      <Button variant="outline" className="border-brand-200 text-brand-800 hover:bg-brand-50">
                        Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past events */}
      {past.length > 0 && (
        <section className="py-20 lg:py-28 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <Calendar className="h-7 w-7 text-slate-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-950">Past Events</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event, i) => (
                <Reveal key={event.id} delay={i * 50}>
                  <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md opacity-90">
                    <div className="relative h-40 overflow-hidden">
                      {event.banner_url ? (
                        <img src={event.banner_url} alt={event.title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-400" />
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-slate-400">{formatEventDateLong(event.date)}</p>
                      <h3 className="mt-1 font-bold text-brand-950 line-clamp-1">{event.title}</h3>
                      {event.venue && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" /> {event.venue}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
