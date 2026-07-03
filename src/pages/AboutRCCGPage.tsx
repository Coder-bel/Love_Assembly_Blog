import { useNavigate } from '@tanstack/react-router';
import { ExternalLink, ArrowRight, Church, Globe, BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';

export function AboutRCCGPage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Home / About RCCG"
        title="About The Redeemed Christian Church of God"
        description="Love Assembly is a Zonal Headquarters under The Redeemed Christian Church of God (RCCG), one of the largest and fastest-growing Pentecostal churches in the world."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed">
                The Redeemed Christian Church of God (RCCG) was founded in 1952 in Lagos, Nigeria,
                by Reverend Josiah Akindayomi. What started as a small fellowship has grown into
                a global movement with thousands of parishes across more than 190 countries,
                making it one of the largest evangelical organizations in the world.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Under the leadership of the General Overseer, Pastor E.A. Adeboye, RCCG has
                experienced unprecedented growth, driven by a commitment to holiness, evangelism,
                prayer, and the power of the Holy Spirit. The church's vision is to spread the
                gospel to every nation and to plant churches within five minutes' walking distance
                of every person on earth.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                RCCG is known for its vibrant worship, sound biblical teaching, and a strong
                emphasis on prayer and fasting. The church operates a structured governance model
                with parishes grouped into areas, zones, provinces, and regions — enabling
                effective oversight and rapid growth while maintaining spiritual depth.
              </p>
              <p className="mt-4 text-slate-700 leading-relaxed">
                Love Assembly serves as a Zonal Headquarters within this global network,
                overseeing multiple parishes and carrying forward the RCCG mandate to win souls,
                make disciples, and plant churches. While we are part of the larger RCCG family,
                this website focuses on our zonal activities. For information about the national
                body, please visit the official RCCG website.
              </p>
            </div>
          </Reveal>

          {/* Key facts */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { icon: Church, label: 'Founded', value: '1952' },
              { icon: Globe, label: 'Countries', value: '190+' },
              { icon: BookOpen, label: 'Parishes Worldwide', value: '40,000+' },
            ].map((fact, i) => (
              <Reveal key={fact.label} delay={i * 100}>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
                  <fact.icon className="mx-auto h-8 w-8 text-brand-600 mb-3" />
                  <p className="text-3xl font-bold text-brand-950">{fact.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{fact.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={200}>
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 p-8 text-center">
              <h3 className="text-2xl font-bold text-white">Visit the Official RCCG Website</h3>
              <p className="mt-3 text-brand-100/80">
                For national conventions, the General Overseer's messages, Open Heavens devotional,
                and more, visit the official RCCG website.
              </p>
              <a
                href="https://rccg.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition-all hover:bg-brand-50"
              >
                Visit rccg.org <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => navigate({ to: '/about' })}
                className="border-brand-200 text-brand-800 hover:bg-brand-50"
              >
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Love Assembly
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
