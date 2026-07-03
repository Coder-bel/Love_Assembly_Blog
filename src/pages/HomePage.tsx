import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Play, MapPin, Calendar, Heart, Users, Church, Sparkles, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCarousel } from '@/components/shared/EventCarousel';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { CountUp } from '@/components/shared/CountUp';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';
import { fetchUpcomingEvents, fetchSermons, fetchBlogPosts, fetchLeaders, fetchMinistries, fetchTestimonies } from '@/lib/queries';
import { formatSermonDate, formatBlogDate } from '@/lib/format';
import type { EventItem, Sermon, BlogPost, Leader, Ministry, Testimony } from '@/lib/types';

const heroImage = 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg';

const stats = [
  { icon: Church, label: 'Parishes', value: 5, suffix: '+' },
  { icon: Users, label: 'Members', value: 3000, suffix: '+' },
  { icon: Calendar, label: 'Years of Service', value: 15, suffix: '' },
  { icon: Heart, label: 'Souls Reached', value: 10000, suffix: '+' },
];

export function HomePage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchUpcomingEvents(6),
      fetchSermons(1),
      fetchBlogPosts(3),
      fetchLeaders(1),
      fetchMinistries(6),
      fetchTestimonies(3),
    ])
      .then(([e, s, b, l, m, t]) => {
        setEvents(e);
        setSermons(s);
        setBlogPosts(b);
        setLeaders(l);
        setMinistries(m);
        setTestimonies(t);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const latestSermon = sermons[0] ?? null;
  const pastor = leaders[0] ?? null;

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
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
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
                Love Assembly is a Zonal Headquarters of The Redeemed Christian Church of God,
                passionate about sharing the love of Christ and making disciples of all nations.
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
                  onClick={() => navigate({ to: '/live' })}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white text-base px-8 backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4 fill-white" /> Watch Live
                </Button>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex items-center gap-6 text-sm text-brand-100/70">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Lekki, Lagos</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Sundays 8:00 & 10:30 AM</span>
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

      {/* EVENT CAROUSEL */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="What's Coming Up"
              title="Upcoming Events"
              description="Join us at our next gathering — there's a place for you."
              align="left"
            />
            <Reveal delay={200}>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/events' })}
                className="border-brand-200 text-brand-800 hover:bg-brand-50"
              >
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : (
            <EventCarousel events={events} />
          )}
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
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
                      <CountUp end={15} suffix="+" />
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
                description="Love Assembly began as a small fellowship and has grown into a vibrant zonal headquarters, overseeing multiple parishes and thousands of worshippers across Lagos."
                align="left"
              />
              <Reveal delay={200}>
                <p className="mt-6 text-slate-600 leading-relaxed">
                  As a Zonal Headquarters of The Redeemed Christian Church of God, we are committed
                  to holiness, evangelism, and raising leaders who impact their communities. Our
                  doors are open to everyone — regardless of background or story.
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
                  title="A Word From Our Zonal Pastor"
                  align="left"
                />
                <Reveal delay={200}>
                  <blockquote className="mt-6 text-lg text-slate-700 leading-relaxed font-serif italic">
                    "{pastor.bio ?? 'Welcome home. At Love Assembly, we believe every person is uniquely loved by God and has a place in His family. We are here to walk with you on your journey of faith.'}"
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
                    Meet the Team <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LATEST SERMON */}
      {latestSermon && (
        <section className="py-20 lg:py-28 bg-brand-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Reveal>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-300 mb-3">
                    Latest Message
                  </span>
                </Reveal>
                <Reveal delay={100}>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    {latestSermon.title}
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-brand-200">
                    <span className="font-medium">{latestSermon.speaker}</span>
                    <span className="text-brand-400">|</span>
                    <span>{formatSermonDate(latestSermon.date)}</span>
                    {latestSermon.scripture_reference && (
                      <>
                        <span className="text-brand-400">|</span>
                        <span className="text-gold-400">{latestSermon.scripture_reference}</span>
                      </>
                    )}
                  </div>
                </Reveal>
                <Reveal delay={300}>
                  <p className="mt-6 text-brand-100/80 leading-relaxed text-lg">
                    {latestSermon.description}
                  </p>
                </Reveal>
                <Reveal delay={400}>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      onClick={() => navigate({ to: '/sermons/$id', params: { id: latestSermon.id } })}
                      className="bg-white text-brand-900 hover:bg-brand-50"
                    >
                      <Play className="mr-2 h-4 w-4 fill-brand-900" /> Watch Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => navigate({ to: '/sermons' })}
                      className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                    >
                      All Sermons <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={200}>
                <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
                  onClick={() => navigate({ to: '/sermons/$id', params: { id: latestSermon.id } })}
                >
                  {latestSermon.thumbnail_url ? (
                    <img src={latestSermon.thumbnail_url} alt={latestSermon.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-brand-800 to-brand-600" />
                  )}
                  <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform group-hover:scale-110">
                      <Play className="h-7 w-7 fill-brand-900 text-brand-900 ml-1" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* MINISTRIES OVERVIEW */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Get Involved"
            title="Our Ministries"
            description="Discover a place to serve, grow, and connect with others who share your passion for God."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.slice(0, 6).map((ministry, i) => (
              <Reveal key={ministry.id} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{ministry.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {ministry.description}
                  </p>
                  {ministry.lead_name && (
                    <p className="mt-3 text-xs font-medium text-brand-600">
                      Led by {ministry.lead_name}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/ministries' })}
                className="border-brand-200 text-brand-800 hover:bg-brand-50"
              >
              Explore All Ministries <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIES / BLOG HIGHLIGHTS */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Stories of God's Faithfulness"
            title="Testimonies & Articles"
            description="Be encouraged by what God is doing in and through our community."
          />

          {/* Testimonies */}
          {testimonies.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonies.map((testimony, i) => (
                <Reveal key={testimony.id} delay={i * 100}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                    <Quote className="h-8 w-8 text-brand-200" />
                    <p className="mt-4 text-slate-700 leading-relaxed line-clamp-4">
                      {testimony.body}
                    </p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="font-semibold text-brand-950 text-sm">{testimony.name}</p>
                      <p className="text-xs text-slate-500">{testimony.title}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Blog highlights */}
          {blogPosts.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {blogPosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 100}>
                  <article
                    className="group h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate({ to: '/blog/$slug', params: { slug: post.slug } })}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      {post.image_url ? (
                        <img src={post.image_url} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-brand-700 to-brand-500" />
                      )}
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand-600">
                        {post.category}
                      </span>
                      <h3 className="mt-2 font-bold text-brand-950 leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.author}</span>
                        <span>|</span>
                        <span>{formatBlogDate(post.published_at)}</span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/prayer' })}
                className="border-brand-200 text-brand-800 hover:bg-brand-50"
              >
                Share Your Testimony <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/blog' })}
                className="border-brand-200 text-brand-800 hover:bg-brand-50"
              >
                Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

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
              and the day-to-day ministry of Love Assembly. Every seed matters.
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

      {/* NEWSLETTER */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950 tracking-tight">
              Never Miss an Update
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Subscribe to our newsletter for event announcements, new sermons, devotionals,
              and updates from the Love Assembly family.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8">
              <NewsletterSignup />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
