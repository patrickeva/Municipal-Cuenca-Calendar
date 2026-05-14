import { Link } from 'react-router-dom';
import { CalendarDays, Search } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { CATEGORIES } from '../../lib/constants';
import { todayStr } from '../../lib/dateHelpers';
// Home is always public — no auth needed; private events are excluded

export default function Home() {
  const { events } = useEvents();
  const today = todayStr();

  const totalPublished = events.filter((e) => e.status === 'published' && e.isPublic !== false).length;
  const totalUpcoming  = events.filter((e) => e.status === 'published' && e.isPublic !== false && e.date >= today).length;
  const currentYear    = new Date().getFullYear();

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: 'calc(100vh - 56px)',
        background: 'linear-gradient(135deg, #0c1f3f 0%, #0f2d5a 50%, #1a3a6b 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/3 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold/5 translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full bg-royal/12 -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — headline + CTAs */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <p className="text-gold text-xs font-bold uppercase tracking-[0.18em]">
                Municipality of Cuenca, Batangas
              </p>
            </div>

            {/* Title */}
            <h1 className="font-extrabold text-white leading-[1.05] tracking-tight mb-5 font-display"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Municipal<br />
              <span style={{ color: '#e8920a' }}>Events</span> Calendar
            </h1>

            {/* Subtitle */}
            <p className="text-white/55 text-base font-medium leading-relaxed mb-8 max-w-lg">
              Stay informed on all events, activities, and official announcements from the local government unit of Cuenca, Batangas.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                to="/calendar"
                className="inline-flex items-center gap-2.5 text-white font-bold rounded-xl px-7 py-3.5 text-sm transition-all shadow-lg hover:brightness-110 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #e8920a, #f5b93a)' }}
              >
                <CalendarDays size={16} />
                View Calendar
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2.5 bg-white/10 text-white font-semibold rounded-xl px-7 py-3.5 text-sm hover:bg-white/18 border border-white/20 transition-all active:scale-95"
              >
                <Search size={15} />
                Search Events
              </Link>
            </div>

            {/* Inline stats row */}
            <div className="flex flex-wrap items-center gap-6">
              {[
                { value: totalPublished, label: 'Published Events', accent: '#e8920a' },
                { value: totalUpcoming,  label: 'Upcoming',         accent: '#60a5fa' },
                { value: currentYear,    label: 'Year',             accent: '#4ade80' },
              ].map(({ value, label, accent }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-7 bg-white/10" />}
                  <div>
                    <p className="text-2xl font-extrabold leading-none" style={{ color: accent }}>{value}</p>
                    <p className="text-white/35 text-[11px] font-semibold mt-0.5 uppercase tracking-wider">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — category cards grid */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {Object.entries(CATEGORIES).slice(0, 4).map(([key, cat]) => {
              const count = events.filter((e) => e.status === 'published' && e.category === key).length;
              return (
                <Link to="/search" key={key}>
                  <div
                    className="rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base mb-3 shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}bb)` }}
                    >
                      {cat.label.charAt(0)}
                    </div>
                    <p className="text-white font-bold text-sm leading-tight">{cat.label}</p>
                    <p className="text-white/35 text-xs font-semibold mt-1">
                      {count} event{count !== 1 ? 's' : ''}
                    </p>
                    <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (count / Math.max(totalPublished, 1)) * 100 * 4)}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom category color strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        {Object.values(CATEGORIES).map((cat) => (
          <div key={cat.color} className="flex-1" style={{ backgroundColor: cat.color }} />
        ))}
      </div>
    </section>
  );
}
