import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, MessageSquare, Crown } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';

export function BlogPage() {
  const navigate = useNavigate();

  const tiles = [
    {
      title: 'Messages',
      description: 'Short highlights and summaries of messages preached at Christ Love Assembly.',
      icon: MessageSquare,
      to: '/blog/messages',
    },
    {
      title: 'RCCG Legends',
      description: 'Short biographies of notable figures in The Redeemed Christian Church of God.',
      icon: Crown,
      to: '/blog/legends',
    },
  ];

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Blog"
        title="Blog"
        description="Explore messages preached at Christ Love Assembly and learn about the legends of RCCG."
        bgImage="https://scontent-los4-1.xx.fbcdn.net/v/t39.30808-6/483741361_982029707466558_8769792280913899171_n.jpg?stp=cp6_dst-jpg_tt6&cstp=mx2048x1536&ctp=s960x960&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=aoEcIeCe6WEQ7kNvwESeg9d&_nc_oc=AdpwgfEZ26n9d9YPrMo_3Q6gFCcFO_KIhTJcUa_faTg3mkOqH3Zj0gyb9bzwEw-utsU&_nc_zt=23&_nc_ht=scontent-los4-1.xx&_nc_gid=v6ZpAOczoaq0YPHo6EJeHw&_nc_ss=7b289&oh=00_AQCCWVXbEq1Xls-DfLsJtiadLvVKdg81hlgW6YfmWOyB4A&oe=6A66ED73"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {tiles.map((tile, i) => (
              <Reveal key={tile.to} delay={i * 150}>
                <button
                  onClick={() => navigate({ to: tile.to as '/blog/messages' | '/blog/legends' })}
                  className="group relative h-full w-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 text-left transition-all hover:shadow-xl hover:border-brand-200 hover:-translate-y-1"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                    <tile.icon className="h-8 w-8" />
                  </div>
                  <h2 className="mt-6 text-2xl font-bold text-brand-950">{tile.title}</h2>
                  <p className="mt-3 text-slate-600 leading-relaxed">{tile.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:text-brand-800">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
