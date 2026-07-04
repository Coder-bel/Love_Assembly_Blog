import { useEffect, useState } from 'react';
import { ImageOff, X, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { fetchGalleryImages } from '@/lib/queries';
import type { GalleryImage } from '@/lib/types';
import { cn } from '@/lib/utils';

const filters = ['all', 'event', 'general'] as const;
type Filter = (typeof filters)[number];

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages()
      .then(setImages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Gallery"
        title="Gallery"
        description="Photos from our services, events, and church life at Christ Love Assembly."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <Reveal>
            <div className="mb-10 flex justify-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'rounded-lg px-5 py-2 text-sm font-medium capitalize transition-all',
                    filter === f
                      ? 'bg-brand-800 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  )}
                >
                  {f === 'all' ? 'All' : f === 'event' ? 'Events' : 'General'}
                </button>
              ))}
            </div>
          </Reveal>

          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <ImageOff className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No images yet</h3>
              <p className="mt-2 text-sm text-slate-500">
                Check back soon for photos from our events and services.
              </p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img, i) => (
                <Reveal key={img.id} delay={i * 50}>
                  <button
                    onClick={() => setLightbox(img)}
                    className="group relative block w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg"
                  >
                    <img
                      src={img.image_url}
                      alt={img.caption || ''}
                      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    {img.caption && (
                      <p className="absolute bottom-0 left-0 right-0 p-3 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 line-clamp-2">
                        {img.caption}
                      </p>
                    )}
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-full max-w-4xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.image_url}
              alt={lightbox.caption || ''}
              className="max-h-[80vh] w-full object-contain"
            />
            {(lightbox.caption || lightbox.event_name) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {lightbox.event_name && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-brand-200">
                    <Calendar className="h-3.5 w-3.5" /> {lightbox.event_name}
                  </p>
                )}
                {lightbox.caption && (
                  <p className="mt-1 text-white text-sm">{lightbox.caption}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
