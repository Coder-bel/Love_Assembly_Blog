import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string;
  bgImage?: string;
}

export function PageHeader({ title, description, breadcrumb, bgImage }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {bgImage ? (
          <>
            <img src={bgImage} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800" />
        )}
      </div>

      {/* Decorative pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-brand-400 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-brand-500 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {breadcrumb && (
            <nav className="mb-4">
              <span className="text-sm font-medium text-brand-200/80">{breadcrumb}</span>
            </nav>
          )}
          <h1 className={cn(
            'text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance animate-fade-up'
          )}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg sm:text-xl text-brand-100/90 leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '100ms' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
