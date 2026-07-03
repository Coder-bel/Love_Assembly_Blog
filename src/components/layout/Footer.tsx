import { Link } from '@tanstack/react-router';
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { RCCGLogo } from '@/components/shared/RCCGLogo';

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/loveassembly', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/loveassembly', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/loveassembly', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com/loveassembly', label: 'Twitter/X' },
];

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Events', to: '/events' },
  { label: 'About RCCG', to: '/about-rccg' },
];

const engageLinks = [
  { label: 'Give / Donate', to: '/give' },
  { label: 'Prayer Requests', to: '/prayer' },
  { label: 'Testimonies', to: '/prayer' },
  { label: 'Contact Us', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                <RCCGLogo variant="dark" className="h-8 w-8" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Love Assembly</p>
                <p className="text-xs text-slate-400">RCCG</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              A parish of The Redeemed Christian Church of God, committed to spreading
              the love of Christ and making disciples of all nations.
            </p>
	     <div className="flex gap-2">
  {socialLinks.map((social) => (
   <a    
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-all hover:bg-brand-700 hover:text-white"
    >
      <social.icon className="h-4 w-4" />
    </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Engage</h4>
            <ul className="space-y-2.5">
              {engageLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-brand-400" />
                <span>RF48+W43, Loburo 110113, Ogun State</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                <a href="tel:+234800123456" className="hover:text-white transition-colors">+234 800 123 456</a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                <a href="mailto:info@loveassembly.org" className="hover:text-white transition-colors">info@loveassembly.org</a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              
              <a href="https://rccg.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors"
              >
                Visit RCCG National <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} RCCG Christ Love Assembly. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <span>|</span>
              <Link to="/contact" className="hover:text-slate-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
