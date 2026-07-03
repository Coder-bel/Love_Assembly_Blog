import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Copy, Check, Building2, CreditCard, Globe, Heart, Shield } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const bankDetails = [
  { label: 'Account Name', value: 'Love Assembly RCCG Zonal HQ' },
  { label: 'Bank', value: 'Guaranty Trust Bank (GTBank)' },
  { label: 'Account Number', value: '0123456789' },
  { label: 'Sort Code', value: '058152' },
];

const givingOptions = [
  { icon: Building2, title: 'Bank Transfer', description: 'Transfer directly to our church account. Use the reference field to specify your giving purpose.' },
  { icon: CreditCard, title: 'Online Payment', description: 'Give securely online via Paystack or Flutterwave using your debit/credit card.' },
  { icon: Globe, title: 'International Giving', description: 'For donations from outside Nigeria, use our international payment gateway.' },
];

const givingTypes = [
  'Tithe', 'Offering', 'Building Fund', 'Missions & Evangelism', 'Welfare', 'Special Seed',
];

export function GivePage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    toast.success(`${label} copied`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Give"
        title="Give & Support"
        description="Your generosity makes it possible for us to share the love of Christ, support our community, and advance the work of the gospel."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Giving options */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ways to Give"
            title="Choose Your Method"
            description="Select the giving option that works best for you. Every contribution makes a difference."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {givingOptions.map((option, i) => (
              <Reveal key={option.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 transition-all hover:shadow-lg hover:border-brand-200">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <option.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-950">{option.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{option.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bank details */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-2xl font-bold text-brand-950 mb-2">Bank Account Details</h2>
              <p className="text-sm text-slate-500 mb-6">Use these details for direct bank transfers.</p>
              <div className="space-y-3">
                {bankDetails.map((detail) => (
                  <div key={detail.label} className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{detail.label}</p>
                      <p className="mt-1 font-semibold text-brand-950">{detail.value}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(detail.value, detail.label)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-400 transition-colors hover:bg-brand-700 hover:text-white"
                      aria-label={`Copy ${detail.label}`}
                    >
                      {copied === detail.label ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Online giving */}
          <Reveal delay={200}>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 p-8 text-center">
              <h3 className="text-2xl font-bold text-white">Give Online</h3>
              <p className="mt-3 text-brand-100/80">
                Securely give online via Paystack or Flutterwave. Fast, easy, and safe.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-gold-500 text-brand-950 hover:bg-gold-400">
                  <CreditCard className="mr-2 h-4 w-4" /> Give with Paystack
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <CreditCard className="mr-2 h-4 w-4" /> Give with Flutterwave
                </Button>
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-200">
                <Shield className="h-3.5 w-3.5" /> Your payment is secured with bank-level encryption
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Giving types */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl font-bold text-brand-950 text-center mb-2">Giving Categories</h2>
            <p className="text-center text-slate-500 mb-8">Specify what your giving is for when making a transfer or online payment.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {givingTypes.map((type) => (
                <span key={type} className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800">
                  <Heart className="h-3.5 w-3.5" /> {type}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <p className="text-lg text-slate-600 leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7
            </p>
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/contact' })}
              className="mt-6 border-brand-200 text-brand-800 hover:bg-brand-50"
            >
              Questions About Giving?
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
