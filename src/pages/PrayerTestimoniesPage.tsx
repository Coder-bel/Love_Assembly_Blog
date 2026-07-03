import { useEffect, useState } from 'react';
import { Send, Loader2, Heart, Quote, CheckCircle2, Lock } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { fetchTestimonies } from '@/lib/queries';
import { submitPrayerRequest, submitTestimony as submitTestimonyForm } from '@/lib/formSubmit';
import { formatBlogDate } from '@/lib/format';
import type { Testimony } from '@/lib/types';
import { toast } from 'sonner';

export function PrayerTestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'prayer' | 'testimony'>('prayer');

  // Prayer form
  const [prayer, setPrayer] = useState({ name: '', email: '', phone: '', request: '', is_private: false });
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [prayerDone, setPrayerDone] = useState(false);

  // Testimony form
  const [testimony, setTestimony] = useState({ name: '', title: '', body: '' });
  const [testimonyLoading, setTestimonyLoading] = useState(false);
  const [testimonyDone, setTestimonyDone] = useState(false);

  useEffect(() => {
    fetchTestimonies(20)
      .then(setTestimonies)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

const submitPrayer = async (e: React.FormEvent) => {
  e.preventDefault();
  setPrayerLoading(true);
  try {
    await submitPrayerRequest({
      name: prayer.name,
      email: prayer.email,
      phone: prayer.phone,
      request: prayer.request,
    });
    toast.success('Your prayer request has been received. Our prayer team is praying for you.');
    setPrayerDone(true);
    setPrayer({ name: '', email: '', phone: '', request: '', is_private: false });
  } catch {
    toast.error('Something went wrong. Please try again.');
  } finally {
    setPrayerLoading(false);
  }
};
const submitTestimony = async (e: React.FormEvent) => {
  e.preventDefault();
  setTestimonyLoading(true);
  try {
    await submitTestimonyForm({
      name: testimony.name,
      title: testimony.title,
      body: testimony.body,
    });
    toast.success('Thank you for sharing your testimony! It will be reviewed and published soon.');
    setTestimonyDone(true);
    setTestimony({ name: '', title: '', body: '' });
  } catch {
    toast.error('Something went wrong. Please try again.');
  } finally {
    setTestimonyLoading(false);
  }
};
  return (
    <div>
      <PageHeader
        breadcrumb="Home / Prayer & Testimonies"
        title="Prayer Requests & Testimonies"
        description="Share your prayer needs with our prayer team, or celebrate what God has done by sharing your testimony."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      {/* Submission forms */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <Reveal>
            <div className="mb-8 flex gap-2 rounded-xl bg-slate-100 p-1.5">
              <button
                onClick={() => setTab('prayer')}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  tab === 'prayer' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Heart className="mr-2 inline h-4 w-4" /> Prayer Request
              </button>
              <button
                onClick={() => setTab('testimony')}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${
                  tab === 'testimony' ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Quote className="mr-2 inline h-4 w-4" /> Share Testimony
              </button>
            </div>
          </Reveal>

          {/* Prayer form */}
          {tab === 'prayer' && (
            <Reveal>
              {prayerDone ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-brand-950">Request Received</h3>
                  <p className="mt-2 text-slate-600">
                    Our prayer team is standing in faith with you. You are loved.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setPrayerDone(false)}
                    className="mt-6 border-brand-200 text-brand-800 hover:bg-brand-50"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={submitPrayer} className="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-100 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={prayer.name}
                        onChange={(e) => setPrayer({ ...prayer, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email (optional)</label>
                      <input
                        type="email"
                        value={prayer.email}
                        onChange={(e) => setPrayer({ ...prayer, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone (optional)</label>
                    <input
                      type="tel"
                      value={prayer.phone}
                      onChange={(e) => setPrayer({ ...prayer, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Prayer Request</label>
                    <textarea
                      required
                      rows={5}
                      value={prayer.request}
                      onChange={(e) => setPrayer({ ...prayer, request: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
                      placeholder="Share your prayer request..."
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={prayer.is_private}
                      onChange={(e) => setPrayer({ ...prayer, is_private: e.target.checked })}
                      className="rounded border-slate-300"
                    />
                    <Lock className="h-3.5 w-3.5" /> Keep this request private (only seen by pastoral team)
                  </label>
                  <Button type="submit" disabled={prayerLoading} className="w-full bg-brand-800 hover:bg-brand-700">
                    {prayerLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Submit Prayer Request</>
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          )}

          {/* Testimony form */}
          {tab === 'testimony' && (
            <Reveal>
              {testimonyDone ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-brand-950">Thank You for Sharing!</h3>
                  <p className="mt-2 text-slate-600">
                    Your testimony has been submitted and will be reviewed by our team before being published.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setTestimonyDone(false)}
                    className="mt-6 border-brand-200 text-brand-800 hover:bg-brand-50"
                  >
                    Share Another Testimony
                  </Button>
                </div>
              ) : (
                <form onSubmit={submitTestimony} className="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-100 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={testimony.name}
                        onChange={(e) => setTestimony({ ...testimony, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                      <input
                        type="text"
                        required
                        value={testimony.title}
                        onChange={(e) => setTestimony({ ...testimony, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        placeholder="e.g. Healed of illness"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Testimony</label>
                    <textarea
                      required
                      rows={6}
                      value={testimony.body}
                      onChange={(e) => setTestimony({ ...testimony, body: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
                      placeholder="Share what God has done in your life..."
                    />
                  </div>
                  <Button type="submit" disabled={testimonyLoading} className="w-full bg-brand-800 hover:bg-brand-700">
                    {testimonyLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Share Testimony</>
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {/* Testimony wall */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Glory to God"
            title="Testimony Wall"
            description="Be encouraged by what God is doing in the lives of our members."
          />
          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : testimonies.length === 0 ? (
            <div className="mt-12 text-center text-slate-500">
              No testimonies yet. Be the first to share what God has done!
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonies.map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                    <Quote className="h-8 w-8 text-brand-200" />
                    <p className="mt-4 text-slate-700 leading-relaxed">{t.body}</p>
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <p className="font-semibold text-brand-950">{t.name}</p>
                      <p className="text-sm text-brand-600">{t.title}</p>
                      <p className="mt-1 text-xs text-slate-400">{formatBlogDate(t.created_at)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
