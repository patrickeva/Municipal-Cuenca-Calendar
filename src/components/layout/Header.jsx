import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import PublicNav from './PublicNav';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-navy sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 h-14 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 group">
          <div className="w-7 h-7 rounded-md bg-gold flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[10px] leading-none tracking-wide">LGU</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-xs sm:text-sm leading-tight tracking-tight truncate">
              Municipality of Cuenca
            </p>
            <p className="hidden sm:block text-gold/80 text-[11px] leading-none font-medium">Province of Batangas</p>
          </div>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <PublicNav />

          {/* Admin button */}
          {user ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 bg-gold text-white rounded-lg px-3 py-1.5 text-[12px] font-bold hover:bg-gold/90 transition-all"
            >
              <ShieldCheck size={13} />
              <span className="hidden sm:inline">Admin Panel</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 border border-white/25 text-white/70 hover:text-white hover:border-white/50 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all"
            >
              <ShieldCheck size={13} />
              <span className="hidden sm:inline">Staff Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Thin accent line */}
      <div className="h-[2px] flex">
        <div className="w-1/3 bg-gold" />
        <div className="w-1/3 bg-ember" />
        <div className="w-1/3 bg-navy border-t border-white/10" />
      </div>
    </header>
  );
}
