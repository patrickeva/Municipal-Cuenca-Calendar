import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export default function Footer() {
  const { settings: s } = useSettings();

  return (
    <footer className="bg-navy text-white mt-auto relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-white/3 translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-0 left-1/2 w-48 h-48 rounded-full bg-gold/5 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-xs tracking-wider">LGU</span>
              </div>
              <div>
                <p className="font-bold text-white text-sm tracking-tight">{s.fullName}</p>
                <p className="text-gold/60 text-xs font-medium">Province of {s.province}</p>
              </div>
            </div>
            <p className="text-white/40 text-xs font-medium leading-relaxed max-w-xs">
              {s.tagline}. Serving the people of {s.name} with transparency and excellence.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Contact Us</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-gold mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-xs font-medium leading-relaxed">{s.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-gold flex-shrink-0" />
                <span className="text-white/50 text-xs font-medium">{s.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-gold flex-shrink-0" />
                <span className="text-white/50 text-xs font-medium">{s.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe size={13} className="text-gold flex-shrink-0" />
                <span className="text-white/50 text-xs font-medium">{s.website}</span>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { to: '/',        label: 'Home' },
                { to: '/calendar', label: 'Calendar' },
                { to: '/search',  label: 'Search Events' },
                { to: '/about',   label: 'About' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/45 text-xs font-semibold hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/25 text-[11px] font-medium">
            © {new Date().getFullYear()} {s.fullName}. All Rights Reserved.
          </p>
          <p className="text-white/20 text-[11px] font-medium">
            {s.mayor}, Mayor
          </p>
        </div>
      </div>
    </footer>
  );
}
