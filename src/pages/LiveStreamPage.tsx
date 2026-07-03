import { Play, Radio, Calendar, Clock, Bell } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';

export function LiveStreamPage() {
  // Placeholder YouTube embed — would be replaced with actual live stream URL
  const liveEmbedUrl = 'https://www.youtube.com/embed/live_stream?channel=UC_placeholder';

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Live Stream"
        title="Live Stream"
        description="Join us live from anywhere in the world. Experience worship, the Word, and the move of the Spirit in real time."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Live player */}
      <section className="py-16 lg:py-20 bg-brand-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-400">
                <span className="flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                LIVE
              </span>
              <span className="text-sm text-brand-200">Streaming from Love Assembly</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl bg-black">
              <iframe
                src={liveEmbedUrl}
                title="Love Assembly Live Stream"
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Sunday Worship Service</h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-brand-200">
                  <Clock className="h-4 w-4" /> Every Sunday at 10:30 AM (WAT)
                </p>
              </div>
              <Button className="bg-gold-500 text-brand-950 hover:bg-gold-400">
                <Bell className="mr-2 h-4 w-4" /> Set Reminder
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service schedule */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Weekly Schedule"
            title="When We Stream Live"
            description="Mark your calendar and join us online for these services throughout the week."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { day: 'Sunday', time: '8:00 AM & 10:30 AM', title: 'Worship Service', desc: 'Main worship service with praise, prayer, and the Word.' },
              { day: 'Wednesday', time: '6:30 PM', title: 'Bible Study', desc: 'Deep dive into the Word with interactive teaching.' },
              { day: 'Friday', time: '7:00 PM', title: 'Revival Hour', desc: 'Spirit-filled prayer and revival meeting.' },
            ].map((service, i) => (
              <Reveal key={service.day} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      <Calendar className="h-3 w-3" /> {service.day}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{service.time}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600">
                    <Radio className="h-4 w-4" /> Streamed Live
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Watch on demand */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <Play className="mx-auto h-12 w-12 text-brand-600" />
            <h2 className="mt-4 text-2xl font-bold text-brand-950">Missed a Service?</h2>
            <p className="mt-3 text-slate-600">
              All our services are recorded and available on demand. Visit our sermons archive
              to catch up on any message you may have missed.
            </p>
            <Button className="mt-6 bg-brand-800 hover:bg-brand-700">
              Browse Sermons
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
