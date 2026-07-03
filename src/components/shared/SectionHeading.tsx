import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' ? 'text-center mx-auto' : 'text-left', 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-950 tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base sm:text-lg text-slate-600 leading-relaxed', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
      <div className={cn('mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-brand-600 to-brand-400', align === 'center' && 'mx-auto')} />
    </Reveal>
  );
}
