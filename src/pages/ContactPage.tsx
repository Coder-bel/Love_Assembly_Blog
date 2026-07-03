import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Reveal } from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { submitContactMessage } from '@/lib/formSubmit';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'RF48+W43, Loburo 110113, Ogun State, Nigeria' },
  { icon: Phone, label: 'Phone', value: '+234 800 123 4567' },
  { icon: Mail, label: 'Email', value: 'info@loveassembly.org' },
  { icon: Clock, label: 'Sunday Service Time', value: 'Sundays 9:00 AM' },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await submitContactMessage(form);
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
  } catch {
    toast.error('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <PageHeader
        breadcrumb="Home / Contact"
        title="Contact Us"
        description="We'd love to hear from you. Whether you have a question, a prayer request, or just want to say hello reach out."
        bgImage="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <Reveal>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-950">Get in Touch</h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  Use the information below to reach us, or fill out the form and we'll respond
                  as soon as possible.
                </p>
              </Reveal>
              <div className="mt-8 space-y-5">
                {contactInfo.map((info, i) => (
                  <Reveal key={info.label} delay={i * 100}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 shrink-0">
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{info.label}</p>
                        <p className="mt-1 text-brand-950 font-medium">{info.value}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Map */}
              <Reveal delay={300}>
                <div className="mt-8 overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-100">
		  <iframe 
		    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.692063734702!2d3.4652969000000002!3d6.8072625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bc0c8a34c4c83%3A0xdc622c657ec16b47!2sRF48%2BW43%2C%20Loburo%20110113%2C%20Ogun%20State!5e0!3m2!1sen!2sng!4v1783108220993!5m2!1sen!2sng" 
		    width="600" 
		    height="450" 
		    style={{ border: 0 }} 
		    allowfullscreen="" 
		    loading="lazy" 
                    referrerpolicy="strict-origin-when-cross-origin">
		  </iframe>
                </div>
              </Reveal>
            </div>

            {/* Contact form */}
            <Reveal delay={200}>
              <div className="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-100">
                <h3 className="text-xl font-bold text-brand-950 mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                      placeholder="What is this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-brand-800 hover:bg-brand-700">
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Send Message</>
                    )}
                  </Button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Privacy policy */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-white p-8 ring-1 ring-slate-100">
              <h3 className="text-lg font-bold text-brand-950 mb-3">Privacy Policy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Love Assembly respects your privacy. Any information you share with us including
                prayer requests, contact form submissions, and newsletter signups is kept
                confidential and used solely for the purpose of ministry and communication. We
                do not sell or share your personal data with third parties. You may unsubscribe
                from our newsletter at any time.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
