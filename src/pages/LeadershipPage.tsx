import pastorImage from '@/assets/fliers/Daramola.jpg';
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
        bgImage="https://yt3.googleusercontent.com/ytc/AIdro_kdCQz3m2EaxL_lhcUG2MWduAMAbLr9_stf3EAuntVchg=s900-c-k-c0x00ffffff-no-rj"
      />

      {/* Pastor in charge — text write-up with placeholder image */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
            {/* Placeholder pastor image */}
<Reveal className="lg:col-span-2">
  <div className="relative mx-auto max-w-sm">
    <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
      <img
        src={pastorImage}
        alt="Pastor (Mrs.) Margaret M. Daramola"
        className="h-full w-full object-cover"
      />
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
                  <h1>Pastor (Mrs.) Margaret M. Daramola</h1>
		   <p>
                    Assistant Continental Overseer (Hospitality), RCCG GlobalPastor (Mrs.) Margaret M. Daramola is a highly respected senior leader, 
                    seasoned administrator, and anointed spiritual figure within the Redeemed Christian 
                    Church of God (RCCG) global mission. Known for her exceptional humility, profound wisdom, 
                    and operational expertise, she serves as a major pillar in managing the church’s administrative 
                    demands while nurturing the spiritual growth of millions worldwide.
                  </p>
                  <p>
                    Under the pastor's leadership, Love Assembly has grown from a small
                    gathering to a thriving church family. The pastor's vision
                    is to see every member equipped, empowered, and walking in their God-given
                    purpose a community where God's love is real, His power is present, and
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
