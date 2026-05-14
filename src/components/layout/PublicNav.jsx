import { NavLink } from 'react-router-dom';
import { CalendarDays, Search, Info, Home } from 'lucide-react';

const links = [
  { to: '/',         label: 'Home',     Icon: Home        },
  { to: '/calendar', label: 'Calendar', Icon: CalendarDays },
  { to: '/search',   label: 'Search',   Icon: Search      },
  { to: '/about',    label: 'About',    Icon: Info        },
];

export default function PublicNav() {
  return (
    <nav aria-label="Main Navigation">
      <ul className="flex items-center gap-0.5">
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors
                ${isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'}`
              }
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
