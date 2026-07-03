import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';

export function LeadershipPage() {
  return (
    <div>
      <PageHeader
        breadcrumb="Home / Leadership"
        title="Our Leadership"
        description="Meet the shepherd God has placed over Christ Love Assembly."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Pastor in charge — text write-up with placeholder image */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
            {/* Placeholder pastor image — can be swapped later */}
            <Reveal className="lg:col-span-2">
              <div className="relative mx-auto max-w-sm">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-brand-800 to-brand-600 flex items-center justify-center">
                  <div className="text-center text-white/60">
                    <svg viewBox="0 0 24 24" className="mx-auto h-16 w-16" fill="currentColor" opacity="0.4">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <p className="mt-3 text-sm font-medium">Pastor's photo</p>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-gold-500/20 -z-10" />
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-brand-500/20 -z-10" />
              </div>
            </Reveal>

            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow="Pastor in Charge"
                title="Our Pastor"
                align="left"
              />
              <Reveal delay={200}>
                <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-lg">
                  <p>
                    Our Pastor in Charge leads Christ Love Assembly with a heart for God's
                    people and a passion for the gospel. Called to shepherd this flock, the
                    pastor brings a deep commitment to prayer, the Word, and the spiritual
                    growth of every member.
                  </p>
                  <p>
                    Under the pastor's leadership, Christ Love Assembly has grown from a small
                    gathering in a living room to a thriving church family. The pastor's vision
                    is to see every member equipped, empowered, and walking in their God-given
                    purpose — a community where God's love is real, His power is present, and
                    lives are transformed.
                  </p>
                  <p>
                    More details about our pastor and the leadership team will be shared here
                    soon. We invite you to visit us in person and experience the warmth and love
                    of our church family.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
