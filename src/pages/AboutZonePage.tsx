import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Target, Eye, Heart, Users, Church, Calendar } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { CountUp } from '@/components/shared/CountUp';
import { Button } from '@/components/ui/button';

const values = [
  { icon: Heart, title: 'Love', description: 'We demonstrate the unconditional love of Christ to everyone we encounter.' },
  { icon: Target, title: 'Purpose', description: 'We help every believer discover and fulfill their God-given destiny.' },
  { icon: Users, title: 'Community', description: 'We build authentic relationships that foster growth and belonging.' },
  { icon: Church, title: 'Excellence', description: 'We pursue excellence in every area of ministry and service.' },
];

export function AboutZonePage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Home / About"
        title="About Love Assembly"
        description="Our history, our mission, and the journey of faith that has shaped us into who we are today."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* History */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                  alt="Love Assembly history"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Our History"
                title="From Humble Beginnings"
                align="left"
              />
              <Reveal delay={200}>
                <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    Love Assembly was established in 2011 as a small parish of The Redeemed
                    Christian Church of God. What began with a handful of worshippers in a
                    rented hall has grown into a thriving Zonal Headquarters overseeing
                    multiple parishes across Lagos.
                  </p>
                  <p>
                    Through years of faithful service, passionate evangelism, and a commitment
                    to holiness and prayer, the church has experienced remarkable growth —
                    both in numbers and in spiritual depth. Today, Love Assembly serves as
                    a beacon of hope and a hub of ministry activity for the zone.
                  </p>
                  <p>
                    Our journey has been marked by God's faithfulness at every turn, and we
                    remain committed to the vision of reaching the lost, discipling believers,
                    and planting churches that transform communities.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-brand-950">Our Mission</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  To make disciples of all nations, teaching them to observe all that Christ
                  has commanded, and to demonstrate God's love through practical service and
                  community transformation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-brand-950">Our Vision</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  To be a zonal headquarters that reflects the glory of God, raising Spirit-filled
                  leaders, planting vibrant parishes, and impacting our generation with the
                  life-changing power of the gospel.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            description="These values shape everything we do — from how we worship to how we serve our community."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 p-6 transition-all hover:shadow-lg hover:border-brand-200 hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{value.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-brand-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Church, label: 'Parishes Under the Zone', value: 5, suffix: '+' },
              { icon: Users, label: 'Active Members', value: 3000, suffix: '+' },
              { icon: Calendar, label: 'Years of Service', value: 15, suffix: '' },
              { icon: Heart, label: 'Souls Reached', value: 10000, suffix: '+' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div>
                  <stat.icon className="mx-auto h-8 w-8 text-brand-300 mb-3" />
                  <p className="text-4xl lg:text-5xl font-bold">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-brand-200">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-950">
              Come As You Are
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Whether you're new to faith or looking for a church home, there's a place for you
              at Love Assembly. We'd love to meet you.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate({ to: '/contact' })} className="bg-brand-800 hover:bg-brand-700">
                Plan Your Visit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/about-rccg' })} className="border-brand-200 text-brand-800 hover:bg-brand-50">
                About RCCG
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
