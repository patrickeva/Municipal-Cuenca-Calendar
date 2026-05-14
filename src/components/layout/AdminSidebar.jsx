import { NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Tag, Settings, LogOut, Eye, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/admin',            label: 'Dashboard',  Icon: LayoutDashboard, end: true },
  { to: '/admin/events',     label: 'Events',     Icon: CalendarDays },
  { to: '/admin/categories', label: 'Categories', Icon: Tag },
  { to: '/admin/settings',   label: 'Settings',   Icon: Settings },
];

export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <aside className="w-72 flex flex-col h-screen sticky top-0 overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(180deg, #0c1f3f 0%, #0a1a35 100%)' }}>

      {/* Brand */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3.5 mb-1">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e8920a, #f5b93a)' }}>
            <span className="text-white font-black text-xs tracking-wide">LGU</span>
          </div>
          <div>
            <p className="font-extrabold text-base leading-tight text-white tracking-tight">Cuenca</p>
            <p className="text-xs font-semibold" style={{ color: '#e8920a' }}>Admin Portal</p>
          </div>
        </div>
        <div className="mt-5 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-1 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-extrabold text-white/20 uppercase tracking-[0.2em] px-3 mb-2">Menu</p>
        {links.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${isActive
                ? 'text-white shadow-sm'
                : 'text-white/45 hover:text-white/80 hover:bg-white/5'}`
            }
            style={({ isActive }) => isActive
              ? { background: 'linear-gradient(135deg, rgba(232,146,10,0.25), rgba(30,64,175,0.2))', borderLeft: '3px solid #e8920a', paddingLeft: '13px' }
              : {}
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}

        <div className="pt-4">
          <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-3" />
          <p className="text-[10px] font-extrabold text-white/20 uppercase tracking-[0.2em] px-3 mb-2">Site</p>
          <Link
            to="/"
            className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold text-white/45 hover:text-white/80 hover:bg-white/5 transition-all"
          >
            <Eye size={17} />
            View Calendar
          </Link>
        </div>
      </nav>

      {/* User info + Logout */}
      <div className="px-4 pb-6 pt-3">
        <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />

        {user?.email && (
          <div className="flex items-center gap-3 px-4 py-3 mb-1 rounded-xl bg-white/5 border border-white/8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #e8920a, #f5b93a)' }}>
              <span className="text-white font-extrabold text-sm">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white/70 font-bold truncate">{user.email.split('@')[0]}</p>
              <p className="text-[10px] text-white/30 font-medium flex items-center gap-1">
                <Shield size={9} /> Admin
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white/35 hover:bg-red-500/15 hover:text-red-300 transition-all duration-200 mt-1"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
