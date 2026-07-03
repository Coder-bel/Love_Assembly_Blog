import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RCCGLogo } from '@/components/shared/RCCGLogo';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          transparent
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
          {/* Logo lockup: RCCG logo + Love Assembly text */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              'flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl transition-all',
              transparent ? 'bg-white/15 backdrop-blur-sm' : 'bg-white'
            )}>
              <RCCGLogo
                variant={transparent ? 'light' : 'dark'}
                className="h-7 w-7 lg:h-9 lg:w-9"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={cn(
                'font-bold text-base lg:text-lg tracking-tight transition-colors',
                transparent ? 'text-white' : 'text-brand-900'
              )}>
                Love Assembly
              </span>
              <span className={cn(
                'text-[10px] lg:text-xs font-medium tracking-wide transition-colors',
                transparent ? 'text-white/70' : 'text-slate-500'
              )}>
                RCCG
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-all',
                    transparent
                      ? active
                        ? 'text-white bg-white/15'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                      : active
                        ? 'text-brand-900 bg-brand-50'
                        : 'text-slate-600 hover:text-brand-900 hover:bg-slate-50'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => navigate({ to: '/give' })}
              className={cn(
                'hidden sm:inline-flex transition-all',
                transparent
                  ? 'bg-gold-500 text-brand-900 hover:bg-gold-400'
                  : 'bg-brand-900 text-white hover:bg-brand-800'
              )}
            >
              Give
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                'lg:hidden flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                transparent ? 'text-white hover:bg-white/10' : 'text-brand-900 hover:bg-slate-100'
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 left-0 right-0 bg-white shadow-xl border-b border-slate-100 animate-fade-in">
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                      active
                        ? 'text-brand-900 bg-brand-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                size="sm"
                onClick={() => navigate({ to: '/give' })}
                className="mt-2 bg-gold-500 text-brand-900 hover:bg-gold-400"
              >
                Give / Donate
              </Button>
              <Link
                to="/about-rccg"
                className="px-4 py-3 text-sm font-medium rounded-lg text-slate-500 hover:bg-slate-50"
              >
                About RCCG
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
