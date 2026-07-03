import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348001234567?text=Hello%20Love%20Assembly"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our WhatsApp community"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 transition-all hover:scale-110 hover:shadow-xl active:scale-95"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
      </span>
    </a>
  );
}
