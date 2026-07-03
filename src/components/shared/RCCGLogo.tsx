import { cn } from '@/lib/utils';
import rccgLogo from '@/assets/rccg_logo.png';

interface RCCGLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function RCCGLogo({ className }: RCCGLogoProps) {
  return (
    <img
      src={rccgLogo}
      alt="RCCG Logo"
      className={cn('h-full w-full object-contain', className)}
    />
  );
}
