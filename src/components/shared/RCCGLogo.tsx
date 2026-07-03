import { cn } from '@/lib/utils';

interface RCCGLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function RCCGLogo({ className, variant = 'dark' }: RCCGLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('h-full w-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke={variant === 'light' ? '#ffffff' : '#0A3D91'} strokeWidth="2" />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="40" stroke={variant === 'light' ? '#ffffff' : '#0A3D91'} strokeWidth="1.5" opacity="0.6" />
      {/* Cross */}
      <rect x="46" y="18" width="8" height="50" fill={variant === 'light' ? '#ffffff' : '#0A3D91'} rx="1" />
      <rect x="36" y="32" width="28" height="8" fill={variant === 'light' ? '#ffffff' : '#0A3D91'} rx="1" />
      {/* Globe lines */}
      <ellipse cx="50" cy="62" rx="22" ry="8" stroke={variant === 'light' ? '#ffffff' : '#0A3D91'} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="50" cy="62" rx="22" ry="4" stroke={variant === 'light' ? '#ffffff' : '#0A3D91'} strokeWidth="1" opacity="0.4" />
      {/* Bottom text arc suggestion - dots */}
      <circle cx="50" cy="88" r="1.5" fill={variant === 'light' ? '#ffffff' : '#0A3D91'} />
      <circle cx="42" cy="87" r="1" fill={variant === 'light' ? '#ffffff' : '#0A3D91'} opacity="0.6" />
      <circle cx="58" cy="87" r="1" fill={variant === 'light' ? '#ffffff' : '#0A3D91'} opacity="0.6" />
    </svg>
  );
}
