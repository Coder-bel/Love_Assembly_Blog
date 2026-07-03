import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import type { EventItem } from '@/lib/types';
import { formatEventDate } from '@/lib/format';

interface EventCarouselProps {
  events: EventItem[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const navigate = useNavigate();

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused || count <= 1) return;
    const interval = setInterval(() => {
      const next = (api.selectedScrollSnap() + 1) % count;
      api.scrollTo(next);
    }, 5000);
    return () => clearInterval(interval);
  }, [api, paused, count]);

  if (events.length === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
        <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
        <h3 className="text-lg font-semibold text-slate-700">No upcoming events</h3>
        <p className="mt-2 text-sm text-slate-500">
          Check back soon for new events, or subscribe to our newsletter to be the first to know.
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        opts={{ align: 'start', loop: events.length > 1 }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6">
          {events.map((event) => (
            <CarouselItem key={event.id} className="pl-4 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
              <article
                className="group relative h-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Banner */}
                <div className="relative h-48 overflow-hidden">
                  {event.banner_url ? (
                    <img
                      src={event.banner_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-900 backdrop-blur-sm">
                      <Calendar className="h-3 w-3" />
                      {formatEventDate(event.date)}
                    </span>
                  </div>
                  {event.is_featured && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center rounded-full bg-gold-500 px-2.5 py-1 text-xs font-semibold text-brand-950">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col p-5">
                  <h3 className="text-lg font-bold text-brand-950 leading-snug line-clamp-2">
                    {event.title}
                  </h3>
                  {event.venue && (
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="line-clamp-1">{event.venue}</span>
                    </p>
                  )}
                  {event.description && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-4 self-start text-brand-700 hover:bg-brand-50 hover:text-brand-800"
                    onClick={() => navigate({ to: '/events' })}
                  >
                    Learn More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {events.length > 1 && (
          <>
            <CarouselPrevious className="left-2 h-10 w-10 rounded-full bg-white/90 border-0 shadow-md text-brand-900 hover:bg-white" />
            <CarouselNext className="right-2 h-10 w-10 rounded-full bg-white/90 border-0 shadow-md text-brand-900 hover:bg-white" />
          </>
        )}
      </Carousel>

      {/* Dot navigation */}
      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === i ? 'w-8 bg-brand-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
