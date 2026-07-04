import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, MapPin, Calendar, Heart, Church, Users, Clock, Sparkles, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { CountUp } from '@/components/shared/CountUp';
import { fetchLeaders, fetchUpcomingEvents } from '@/lib/queries';
import { formatEventDateLong, formatEventTime } from '@/lib/format';
import type { Leader, EventItem } from '@/lib/types';

const heroImage = 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg';

const stats = [
  { icon: Church, label: 'Years of Service', value: 13, suffix: '' },
  { icon: Users, label: 'Members', value: 500, suffix: '+' },
  { icon: Calendar, label: 'Weekly Services', value: 3, suffix: '' },
  { icon: Heart, label: 'Souls Reached', value: 5000, suffix: '+' },
];

const weeklyServices = [
  { name: 'Digging Deep', day: 'Tuesday', time: '5:30 – 6:30 PM', description: 'A midweek gathering to dig deeper into the Word and grow in understanding and revelation.' },
  { name: 'Faith Clinic', day: 'Thursday', time: '5:30 – 6:30 PM', description: 'A time of teaching and impartation to strengthen and build your faith.' },
];

const sundayServices = [
  { name: "Workers' Meeting", time: '7:30 AM', description: 'A time of preparation, prayer, and coordination for all church workers ahead of Sunday service.' },
  { name: 'Sunday School', time: '8:00 AM', description: 'Bible-based teaching and discussion for all ages before the main service begins.' },
  { name: 'Sunday Service', time: '9:00 – 11:00 AM', description: 'Our main worship service with vibrant praise, deep teaching, and fellowship for the whole family.' },
];


export function HomePage() {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeFlier, setActiveFlier] = useState(0);

  useEffect(() => {
    fetchLeaders(1)
      .then((l) => {
        setLeaders(l);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchUpcomingEvents(5)
      .then(setEvents)
      .catch(() => {});
  }, []);

  const pastor = leaders[0] ?? null;

  const nextFlier = () => setActiveFlier((prev) => (prev + 1) % events.length);
  const prevFlier = () => setActiveFlier((prev) => (prev - 1 + events.length) % events.length);
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950/85 via-brand-900/75 to-brand-800/65" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 backdrop-blur-sm ring-1 ring-white/20">
                Welcome to Love Assembly
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight text-balance leading-[1.1]">
                A Place to Belong.<br />
                <span className="bg-gradient-to-r from-brand-200 to-gold-400 bg-clip-text text-transparent">
                  A Place to Grow.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-brand-100/90 leading-relaxed max-w-2xl">
                RCCG Love Assembly is a church that believes in Jesus, a church that loves
                God and people. We are a family of Christ where His agape love binds us together.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/about' })}
                  className="bg-white text-brand-900 hover:bg-brand-50 text-base px-8"
                >
                  Learn About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/events' })}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white text-base px-8 backdrop-blur-sm"
                >
                  <Calendar className="mr-2 h-4 w-4" /> View Events
                </Button>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex items-center gap-6 text-sm text-brand-100/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>RF48+W43, Loburo 110113, Ogun State</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Sundays 9:00 AM</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
            <div className="h-2 w-1 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* SERVICES & EVENTS SECTION */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Weekly Services */}
          <Reveal>
            <div className="mb-12">
              <SectionHeading
                eyebrow="Weekly Gatherings"
                title="Weekly Services"
                description="Join us throughout the week for worship, prayer, and the Word."
                align="left"
              />
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {weeklyServices.map((service, i) => (
              <Reveal key={service.name} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <Church className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      <Calendar className="h-3 w-3" /> {service.day}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{service.name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-brand-600">
                    <Clock className="h-4 w-4" /> {service.time}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sunday Services */}
          <Reveal delay={200}>
            <div className="mt-12 mb-6">
              <SectionHeading
                eyebrow="Sunday Worship"
                title="Sunday Services"
                description="Come worship with us every sunday."
                align="left"
              />
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {sundayServices.map((service, i) => (
              <Reveal key={service.name} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-600">
                      <Clock className="h-3 w-3" /> {service.time}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{service.name}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

{/* Upcoming Events — Flier Carousel + Info Panel */}
<Reveal delay={200}>
  <div className="mt-16 mb-6">
    <SectionHeading
      eyebrow="What's Coming Up"
      title="Upcoming Events"
      description="Swipe through event fliers and details below."
      align="left"
    />
  </div>
</Reveal>

{events.length === 0 ? (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
    <Calendar className="mx-auto h-12 w-12 text-slate-300 mb-4" />
    <h3 className="text-lg font-semibold text-slate-700">No upcoming events</h3>
    <p className="mt-2 text-sm text-slate-500">Check back soon for new events.</p>
  </div>
) : (
  <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
    {/* Flier carousel */}
    <Reveal>
      <div className="relative h-full">
        <div className="relative aspect-[3/4] sm:aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-slate-100">
          {events.map((flier, i) => (
            <div
              key={flier.id}
              className={`absolute inset-0 transition-opacity duration-500 ${i === activeFlier ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {flier.banner_url ? (
                <img
                  src={flier.banner_url}
                  alt={flier.title}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 p-8 text-center">
                  <ImageIcon className="h-12 w-12 text-white/30 mb-4" />
                  <p className="text-white/50 text-sm font-medium">Flier Coming Soon</p>
                  <p className="mt-2 text-white font-bold text-lg">{flier.title}</p>
                  <p className="mt-1 text-brand-200 text-sm">{formatEventDateLong(flier.date)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrow controls */}
        <button
          onClick={prevFlier}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-brand-900 transition-all hover:bg-white"
          aria-label="Previous flier"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextFlier}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md text-brand-900 transition-all hover:bg-white"
          aria-label="Next flier"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dot navigation */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveFlier(i)}
              aria-label={`Go to flier ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === activeFlier ? 'w-8 bg-brand-700' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>
    </Reveal>

    {/* Info panel — synced to active flier */}
    <Reveal delay={100}>
      <div className="h-full rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-100 flex flex-col">
        <div key={activeFlier} className="animate-fade-in flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Calendar className="h-3 w-3" /> {formatEventDateLong(events[activeFlier].date)}
          </span>
          <h3 className="mt-4 text-2xl font-bold text-brand-950">
            {events[activeFlier].title}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            <span>{formatEventTime(events[activeFlier].date)}</span>
          </div>
          {events[activeFlier].venue && (
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{events[activeFlier].venue}</span>
            </div>
          )}
          <p className="mt-4 text-slate-600 leading-relaxed">
            {events[activeFlier].description}
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/events' })}
            className="border-brand-200 text-brand-800 hover:bg-brand-50"
          >
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Reveal>
  </div>
)}
        </div>
      </section>

      {/* ABOUT SNAPSHOT — "Our Story" */}      
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                    alt="Love Assembly congregation"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 hidden sm:block">
                  <div className="rounded-2xl bg-brand-900 p-6 text-white shadow-xl">
                    <p className="text-3xl font-bold">
                      <CountUp end={13} suffix="+" />
                    </p>
                    <p className="text-sm text-brand-200">Years of Faithful Service</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="About Love Assembly"
                align="left"
              />
              <Reveal delay={200}>
                <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                  RCCG Christ Love Assembly is a church that believes in Jesus, a church that loves
                  God and people. Overwhelmed by the gift of salvation we have found in Jesus, we
                  have a heart for authentic worship, are passionate about the local church, and are
                  on mission to see God's kingdom established across the earth. We are a family of
                  Christ where His agape love binds us together.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <stat.icon className="h-5 w-5 text-brand-600 mb-2" />
                      <p className="text-2xl font-bold text-brand-950">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={400}>
                <Button
                  onClick={() => navigate({ to: '/about' })}
                  className="mt-8 bg-brand-800 hover:bg-brand-700"
                >
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PASTOR IN CHARGE */}
      {pastor && (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-brand-50 to-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
              <Reveal className="lg:col-span-2">
                <div className="relative mx-auto max-w-sm">
                  <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                    {pastor.photo_url ? (
                      <img src={pastor.photo_url} alt={pastor.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                    )}
                  </div>
                  <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-gold-500/20 -z-10" />
                  <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-brand-500/20 -z-10" />
                </div>
              </Reveal>
              <div className="lg:col-span-3">
                <SectionHeading
                  eyebrow="Leadership"
                  title="A Word From Our Pastor"
                  align="left"
                />
                <Reveal delay={200}>
                  <blockquote className="mt-6 text-lg text-slate-700 leading-relaxed font-serif italic">
                    "{pastor.bio ?? 'Welcome home. At Christ Love Assembly, we believe every person is uniquely loved by God and has a place in His family. We are here to walk with you on your journey of faith.'}"
                  </blockquote>
                </Reveal>
                <Reveal delay={300}>
                  <div className="mt-6">
                    <p className="text-lg font-bold text-brand-950">{pastor.name}</p>
                    <p className="text-sm text-brand-600">{pastor.role}</p>
                  </div>
                </Reveal>
                <Reveal delay={400}>
                  <Button
                    variant="outline"
                    onClick={() => navigate({ to: '/leadership' })}
                    className="mt-6 border-brand-200 text-brand-800 hover:bg-brand-50"
                  >
                    Meet Our Leadership <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* GIVE CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20 mb-6">
              <Heart className="h-8 w-8 text-gold-400" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Partner With Us in the Work of the Gospel
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 text-lg text-brand-100/80 leading-relaxed max-w-2xl mx-auto">
              Your giving fuels the mission — supporting church planting, community outreach,
              and the day-to-day ministry of Christ Love Assembly. Every seed matters.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/give' })}
                className="bg-gold-500 text-brand-950 hover:bg-gold-400 text-base px-8"
              >
                Give Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/contact' })}
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white text-base px-8"
              >
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
