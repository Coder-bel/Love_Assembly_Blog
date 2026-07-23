import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Users, Heart, Sparkles, Calendar, Clock, Target } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';

const focusAreas = [
  {
    icon: Heart,
    title: 'Spiritual Growth',
    description: 'Building a generation of young people rooted in Christ, grounded in the Word, and passionate about authentic worship.',
  },
  {
    icon: Users,
    title: 'Community & Fellowship',
    description: 'A safe, welcoming space where young adults and youth find belonging, friendship, and support among peers who share their faith.',
  },
  {
    icon: Target,
    title: 'Mentorship & Leadership',
    description: 'Connecting young people with mentors who help them navigate career, academics, relationships, and purpose through a biblical lens.',
  },
  {
    icon: Sparkles,
    title: 'Impact & Outreach',
    description: 'Equipping the next generation to be salt and light — reaching peers, serving the community, and leading with excellence.',
  },
];

export function YayaPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Home / YAYA Fellowship"
        title="YAYA Fellowship"
        description="Young Adults and Youth Affairs, raising a generation rooted in Christ and positioned to lead."
        bgImage="https://images.pexels.com/photos/8617542/pexels-photo-8617542.jpeg"
      />

      {/* Intro */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
               A Family Within the Family
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-brand-950 tracking-tight">
              Welcome to YAYA
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              YAYA(Young Adults and Youth Affairs) is the youth arm of Christ Love Assembly,
              part of the wider RCCG YAYA movement raising young people across the world. We are
              a community of young adults and youth committed to growing in Christ together,
              supporting one another, and stepping into the purpose God has for our generation.
              Whether you're a teenager finding your feet in faith or a young adult navigating
              career, school, and relationships, YAYA is a place to belong.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We're About"
            title="Growing Together in Purpose"
            description="YAYA exists to nurture the spiritual growth of young people while equipping them for real life."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-950">{area.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{area.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Times */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Join Us"
            title="When We Meet"
            align="left"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl bg-brand-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-brand-950">Select Sundays</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-700 font-medium">
                  <Clock className="h-4 w-4" /> After the main service
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  YAYA gathers on select Sundays right after the Power Service, watch our
                  announcements for upcoming dates.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl bg-gold-500/10 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 text-brand-950">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-brand-950">Midweek Fellowship</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-gold-700 font-medium">
                  <Clock className="h-4 w-4" /> Details coming soon
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  A dedicated midweek gathering is in the works — check back soon for the
                  confirmed day and time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              Ready to Grow With Us?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-lg text-brand-100/80 leading-relaxed">
              Whether it's your first time or you've been part of the family for years, there's a
              place for you at YAYA. Come as you are.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/contact' })}
              className="mt-8 bg-gold-500 text-brand-950 hover:bg-gold-400 text-base px-8"
            >
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
