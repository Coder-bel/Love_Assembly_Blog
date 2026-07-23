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
        description="Our roots, our mission, and the journey of faith that has shaped us into who we are today."
        bgImage="https://www.thecable.ng/wp-content/uploads/2023/03/adeboye.png"
      />

      {/* Our Roots */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://www.thecable.ng/wp-content/uploads/2023/03/adeboye.png"
                  alt="Love Assembly"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Our Roots"
                title="Where It All Began"
                align="left"
              />
              <Reveal delay={200}>
                <div className="mt-6 text-slate-600 leading-relaxed">
                  <p>
                    Love Assembly is one of the several thousand parishes of The Redeemed
                    Christian Church of God (RCCG) worldwide. RCCG was founded in Nigeria in the
                    year 1952. It started out as a small home group called "the Glory of God
                    fellowship" at Willoughby street, Ebute-Metta, Lagos, Nigeria in West Africa.
                    The name was changed to The Redeemed Christian Church of God after God
                    revealed this to Pa Akindayomi (the founder) in a vision. It was truly amazing
                    because at the time Pa Akindayomi could neither read nor write, but he was able
                    to reproduce what he saw in his vision which was the current name for the
                    church. Initially there were nine members, but before long the fellowship grew
                    as news of the miracles that occurred in their midst spread. Pa Akindayomi was
                    succeeded by Pastor E.A. Adeboye in 1980, and he is the current General
                    Overseer of RCCG worldwide. Since 1981, an open explosion began with the
                    number of parishes growing in leaps and bounds. At the last count, there are
                    at least 2000 parishes of the Redeemed Christian Church of God in Nigeria. RCCG
                    also has a strong presence in other African nations including C'ote D'Ivoire,
                    Ghana, Zambia, Malawi, Zaire, Tanzania, Kenya, Uganda, Gambia, Cameroon, and
                    South Africa. In Europe, the church is fully established in the following
                    countries: United Kingdom, Netherlands, Spain, Italy, Germany, Greece, France.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="lg:order-2">
              <Reveal>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-6/483741361_982029707466558_8769792280913899171_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1536&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=aoEcIeCe6WEQ7kNvwESeg9d&_nc_oc=AdpwgfEZ26n9d9YPrMo_3Q6gFCcFO_KIhTJcUa_faTg3mkOqH3Zj0gyb9bzwEw-utsU&_nc_zt=23&_nc_ht=scontent-los4-1.xx&_nc_gid=v6ZpAOczoaq0YPHo6EJeHw&_nc_ss=7b289&oh=00_AQCCWVXbEq1Xls-DfLsJtiadLvVKdg81hlgW6YfmWOyB4A&oe=6A66ED73"
                    alt="Christ Love Assembly community"
                    className="h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
            <div className="lg:order-1">
              <SectionHeading
                eyebrow="Who We Are"
                title="Our Church Family"
                align="left"
              />
              <Reveal delay={200}>
                <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    RCCG Christ Love Assembly is one of many parishes of The Redeemed Christian
                    Church of God. Christ Love Assembly commenced on March 3rd, 2013 at the
                    pastor's living room. Our second service took place in a hotel hall where we
                    later moved to a community hall located in the southeast region of the city of
                    Calgary. By the grace and mercy of the living God, we have acquired our own
                    property which is located at 3510 27 street Northeast. We have since been
                    progressing and by God's grace, we are still moving on!
                  </p>
                  <p>
                    We are a family of Christ where His agape love binds us together. We are a
                    soul winning, community and a ministry-based church where Holiness is our
                    lifestyle and Heaven is our ultimate.
                  </p>
                  <p>
                    At Christ Love Assembly, we are united by God's love, we see each other as
                    brothers and sisters. Christ Love Assembly is a place where God truly
                    manifest, where His power and grace reigns abundantly. We love each other with
                    the love of God and we hope that your experience with us will generate in you
                    deep yearning for a closer relationship with God.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-100">
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
              <div className="h-full rounded-2xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
                  <Eye className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-2xl font-bold text-brand-950">Our Vision</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  To be a church that reflects the glory of God, raising Spirit-filled
                  leaders, planting vibrant parishes, and impacting our generation with the
                  life-changing power of the gospel.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            description="These values shape everything we do — from how we worship to how we serve our community."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200 hover:-translate-y-1">
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
              { icon: Church, label: 'Years of Service', value: 13, suffix: '' },
              { icon: Users, label: 'Active Members', value: 500, suffix: '+' },
              { icon: Calendar, label: 'Weekly Services', value: 3, suffix: '' },
              { icon: Heart, label: 'Souls Reached', value: 5000, suffix: '+' },
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
              at Christ Love Assembly. We'd love to meet you.
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
