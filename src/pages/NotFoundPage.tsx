import { useNavigate } from '@tanstack/react-router';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand-200">404</p>
        <h1 className="mt-4 text-3xl font-bold text-brand-950">Page Not Found</h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back home.
        </p>
        <Button
          onClick={() => navigate({ to: '/' })}
          className="mt-8 bg-brand-800 hover:bg-brand-700"
        >
          <Home className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
}
