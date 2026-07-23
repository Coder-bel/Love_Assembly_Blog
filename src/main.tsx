import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/lib/router';
import { Toaster } from '@/components/ui/sonner';
import './index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="top-center" />
  </StrictMode>
);
