import { useEffect, useState } from 'react';
import { X, Youtube, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchLiveStatus } from '@/lib/queries';

export function LivePopup() {
  const [isLive, setIsLive] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    fetchLiveStatus()
      .then((status) => {
        if (status?.is_live && status.youtube_url) {
          setIsLive(true);
          setYoutubeUrl(status.youtube_url);
          setPopupOpen(true); // auto-open once on load
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Persistent LIVE button — only shows while actually live */}
      {isLive && (
        <button
          onClick={() => setPopupOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:scale-105"
          aria-label="We are live"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          LIVE
        </button>
      )}

      {/* Popup modal */}
      {popupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <button
              onClick={() => setPopupOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <Radio className="h-8 w-8 text-red-600 animate-pulse" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-brand-950">We're Live!</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We're currently streaming live on YouTube. Join us now and be part of the service.
            </p>

            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
              <Button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white">
                <Youtube className="mr-2 h-4 w-4" /> Watch Now
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
