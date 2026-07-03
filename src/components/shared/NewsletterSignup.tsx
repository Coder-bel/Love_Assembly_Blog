import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NewsletterSignupProps {
  variant?: 'light' | 'dark';
}

export function NewsletterSignup({ variant = 'light' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        if (error.code === '23505') {
          toast.info('You are already subscribed!');
          setDone(true);
        } else {
          throw error;
        }
      } else {
        toast.success('Subscribed! Welcome to the Love Assembly family.');
        setDone(true);
        setEmail('');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className={cn(
        'flex items-center gap-3 rounded-xl border p-4',
        variant === 'dark' ? 'border-white/20 bg-white/5' : 'border-brand-100 bg-brand-50'
      )}>
        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
        <p className={variant === 'dark' ? 'text-white' : 'text-brand-900'}>
          You're subscribed! Watch your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Mail className={cn(
          'absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4',
          variant === 'dark' ? 'text-slate-400' : 'text-slate-400'
        )} />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={cn(
            'w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2',
            variant === 'dark'
              ? 'border-white/15 bg-white/5 text-white placeholder:text-slate-400 focus:ring-brand-500/50 focus:border-brand-500'
              : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-brand-500/30 focus:border-brand-500'
          )}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-600 disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Subscribing...</>
        ) : (
          'Subscribe'
        )}
      </button>
    </form>
  );
}
