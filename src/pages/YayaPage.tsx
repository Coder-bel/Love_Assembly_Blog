import { useState, useEffect } from 'react';
import { MessageCircle, Send, Loader2, CheckCircle2, Flame, Users, Sunrise, Moon, Clock, MapPin, Heart, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { submitYayaSignup } from '@/lib/formSubmit';
import { fetchYayaGallery } from '@/lib/queries';
import type { YayaGalleryItem } from '@/lib/types';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/KF7iCWNN7lpCpNq9L2Agfa?s=cl&p=a&ilr=1&amv=3';

const activities = [
  {
    icon: Users,
    name: 'YAYA Connect',
    schedule: '2nd & 3rd Sundays',
    focus: 'Fostering meaningful fellowship, community, and building accountability structures for spiritual growth.',
    color: 'brand',
  },
  {
    icon: Sunrise,
    name: 'YAYA Sunday',
    schedule: 'Every 3rd Sunday',
    focus: 'Bridging potential and action deploying gifts with Holy Spirit confidence and making visible impact.',
    color: 'gold',
  },
  {
    icon: Flame,
    name: 'YAYA Prayer Hour',
    schedule: 'Thursday before YAYA Sunday',
    focus: 'Stirring Holy Spirit boldness through corporate prayer to shift atmospheres and break barriers.',
    color: 'brand',
  },
  {
    icon: Moon,
    name: 'YAYA Vigil',
    schedule: 'Last Friday of the month',
    focus: 'Night prayer, intercession, spiritual watchfulness, taking territories, and receiving fresh vision.',
    color: 'gold',
  },
];

// --- Countdown logic: finds the nearer of the next YAYA Sunday (3rd Sunday) or YAYA Vigil (last Friday) ---
function getNextNthWeekday(nth: number, weekday: number, from: Date): Date {
  let year = from.getFullYear();
  let month = from.getMonth();

  const calc = (y: number, m: number) => {
    const first = new Date(y, m, 1);
    const firstWeekdayOffset = (weekday - first.getDay() + 7) % 7;
    return new Date(y, m, 1 + firstWeekdayOffset + (nth - 1) * 7);
  };

  let candidate = calc(year, month);
  if (candidate < from) {
    month += 1;
    if (month > 11) { month = 0; year += 1; }
    candidate = calc(year, month);
  }
  return candidate;
}

function getNextLastWeekday(weekday: number, from: Date): Date {
  let year = from.getFullYear();
  let month = from.getMonth();

  const calc = (y: number, m: number) => {
    const lastOfMonth = new Date(y, m + 1, 0);
    const offset = (lastOfMonth.getDay() - weekday + 7) % 7;
    return new Date(y, m, lastOfMonth.getDate() - offset);
  };

  let candidate = calc(year, month);
  if (candidate < from) {
    month += 1;
    if (month > 11) { month = 0; year += 1; }
    candidate = calc(year, month);
  }
  return candidate;
}

function useNextYayaEvent() {
  const [target, setTarget] = useState<{ name: string; date: Date } | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    const nextSunday = getNextNthWeekday(3, 0, now); // 3rd Sunday
    const nextVigil = getNextLastWeekday(5, now); // last Friday

    if (nextSunday <= nextVigil) {
      setTarget({ name: 'YAYA Sunday', date: nextSunday });
    } else {
      setTarget({ name: 'YAYA Vigil', date: nextVigil });
    }
  }, []);

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = target.date.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return { target, timeLeft };
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm text-2xl sm:text-3xl font-bold text-white">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-2 text-xs uppercase tracking-wide text-brand-100/70">{label}</span>
    </div>
  );
}

export function YayaPage() {
  const navigate = useNavigate();
  const { target, timeLeft } = useNextYayaEvent();

  const [gallery, setGallery] = useState<YayaGalleryItem[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const [signup, setSignup] = useState({ name: '', phone: '', location: '' });
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupDone, setSignupDone] = useState(false);

  useEffect(() => {
    fetchYayaGallery().then(setGallery).catch(() => {});
  }, []);

  useEffect(() => {
    if (gallery.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSlide((p) => (p + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [gallery.length]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      await submitYayaSignup(signup);
      toast.success("You're in! Welcome to the YAYA family.");
      setSignupDone(true);
      setSignup({ name: '', phone: '', location: '' });
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        breadcrumb="Home / YAYA Fellowship"
        title="YAYA Fellowship"
        description="Young Adults and Youth Affairs moving from receiving to releasing."
        bgImage="https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-6/483741361_982029707466558_8769792280913899171_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1536&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=aoEcIeCe6WEQ7kNvwESeg9d&_nc_oc=AdpwgfEZ26n9d9YPrMo_3Q6gFCcFO_KIhTJcUa_faTg3mkOqH3Zj0gyb9bzwEw-utsU&_nc_zt=23&_nc_ht=scontent-los4-1.xx&_nc_gid=v6ZpAOczoaq0YPHo6EJeHw&_nc_ss=7b289&oh=00_AQCCWVXbEq1Xls-DfLsJtiadLvVKdg81hlgW6YfmWOyB4A&oe=6A66ED73"
      />

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 uppercase tracking-wide">
              <Flame className="h-3.5 w-3.5 text-gold-500" /> Our Mission
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-3xl sm:text-5xl font-bold text-brand-950 tracking-tight leading-tight">
              From Receiving to <span className="bg-gradient-to-r from-brand-700 to-gold-500 bg-clip-text text-transparent">Releasing.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              We're empowering young adults to act with Holy Spirit boldness, overcome with grace,
              and create Kingdom impact not just consuming what God gives, but releasing it into
              the world around us.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Countdown */}
      {target && timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds > 0 && (
        <section className="py-16 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">Next Up</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">{target.name}</h3>
              <div className="mt-8 flex justify-center gap-3 sm:gap-6">
                <CountdownBlock value={timeLeft.days} label="Days" />
                <CountdownBlock value={timeLeft.hours} label="Hours" />
                <CountdownBlock value={timeLeft.minutes} label="Mins" />
                <CountdownBlock value={timeLeft.seconds} label="Secs" />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Activities */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Core Activities"
            description="Four rhythms that keep the YAYA family connected, prayerful, and moving in purpose."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {activities.map((activity, i) => (
              <Reveal key={activity.name} delay={i * 100}>
                <div className="group h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      activity.color === 'gold'
                        ? 'bg-gold-500/15 text-gold-600 group-hover:bg-gold-500 group-hover:text-white'
                        : 'bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white'
                    }`}>
                      <activity.icon className="h-6 w-6" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      activity.color === 'gold' ? 'bg-gold-500/15 text-gold-700' : 'bg-brand-50 text-brand-700'
                    }`}>
                      <Clock className="h-3 w-3" /> {activity.schedule}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-brand-950">{activity.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{activity.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Slider */}
      {gallery.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Moments"
              title="From Our Gatherings"
              align="left"
            />
            <Reveal delay={100}>
              <div className="mt-10 relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-slate-100">
                {gallery.map((item, i) => (
                  <img
                    key={item.id}
                    src={item.media_url}
                    alt={item.caption || 'YAYA gathering'}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        aria-label={`Go to photo ${i + 1}`}
                        className={`h-2 rounded-full transition-all ${i === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Get Involved */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Involved"
            title="Ready to Get Plugged In?"
            description="Join a Connect Group, share a prayer request, or link up with the YAYA community online."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Connect signup form */}
            <Reveal>
              {signupDone ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-brand-950">You're In!</h3>
                  <p className="mt-2 text-slate-600">Someone from the YAYA team will reach out to plug you into a Connect Group soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 space-y-4">
                  <h3 className="text-lg font-bold text-brand-950">Join a Connect Group</h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={signup.name}
                      onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={signup.phone}
                      onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                    <input
                      type="text"
                      required
                      value={signup.location}
                      onChange={(e) => setSignup({ ...signup, location: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="Area you live in"
                    />
                  </div>
                  <Button type="submit" disabled={signupLoading} className="w-full bg-brand-800 hover:bg-brand-700">
                    {signupLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Join a Connect Group</>
                    )}
                  </Button>
                </form>
              )}
            </Reveal>

            {/* Other ways to connect */}
            <Reveal delay={100}>
              <div className="h-full flex flex-col gap-4">
                <button
                  onClick={() => navigate({ to: '/prayer' })}
                  className="group flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white transition-colors">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-brand-950">Prayer Request or Testimony</h4>
                    <p className="text-sm text-slate-500">Share what's on your heart with our prayer team</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-brand-700 transition-colors" />
                </button>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl bg-green-600 p-6 shadow-sm transition-all hover:bg-green-700 hover:shadow-lg text-left"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">Join Our WhatsApp Community</h4>
                    <p className="text-sm text-white/80">Stay in the loop with daily encouragement & updates</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
                </a>

              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location note */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" /> All YAYA gatherings hold at Love Assembly, Abuja Juction,Redemption Camp, Mowe, Nigeria
          </p>
        </div>
      </section>
    </div>
  );
}
