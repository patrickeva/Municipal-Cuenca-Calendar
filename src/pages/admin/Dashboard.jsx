import { Link } from 'react-router-dom';
import { Plus, CalendarDays, TrendingUp, FileEdit, XCircle, Clock, ArrowRight, Eye, BarChart3 } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { useAuth } from '../../contexts/AuthContext';
import { format, todayStr, formatDateFilipino } from '../../lib/dateHelpers';
import { CATEGORIES } from '../../lib/constants';
import CategoryBadge from '../../components/events/CategoryBadge';

function StatCard({ label, value, icon: Icon, iconBg, iconColor, accentColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-card border border-stone-200 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: accentColor }} />
      <div className="flex items-start justify-between mt-1">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBg }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
        <span className="text-slate-400 text-[11px] font-bold uppercase tracking-widest text-right">{label}</span>
      </div>
      <p className="text-4xl font-extrabold text-navy tracking-tight">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const { events } = useEvents();
  const { user } = useAuth();
  const thisMonth = format(new Date(), 'yyyy-MM');
  const today = todayStr();

  const totalEvents    = events.length;
  const thisMonthCount = events.filter((e) => e.date.startsWith(thisMonth)).length;
  const draftCount     = events.filter((e) => e.status === 'draft').length;
  const cancelledCount = events.filter((e) => e.status === 'cancelled').length;

  const upcoming = events
    .filter((e) => e.status === 'published' && e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const recent = [...events]
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .slice(0, 5);

  const currentYear   = new Date().getFullYear();
  const thisYearEvents = events.filter((e) => e.date.startsWith(String(currentYear)));

  const byCat = Object.keys(CATEGORIES).map((k) => ({
    key: k, label: CATEGORIES[k].label, color: CATEGORIES[k].color,
    count: thisYearEvents.filter((e) => e.category === k).length,
  })).filter((c) => c.count > 0).sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...byCat.map((c) => c.count), 1);

  const emailName = user?.email?.split('@')[0] || 'Admin';

  return (
    <div className="p-6 space-y-6">

      {/* Welcome banner */}
      <div className="rounded-2xl overflow-hidden shadow-card-md" style={{ background: 'linear-gradient(135deg, #0c1f3f 0%, #1a3a6b 60%, #1d4ed8 100%)' }}>
        <div className="px-7 py-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-amber-300 text-xs font-bold uppercase tracking-[0.2em] mb-1">Municipal Calendar</p>
            <h1 className="text-white font-extrabold text-2xl tracking-tight font-display">
              Good day, <span className="text-amber-300 capitalize">{emailName}</span>!
            </h1>
            <p className="text-white/40 text-sm font-medium mt-1">
              {new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link
              to="/admin/events/new"
              className="flex items-center gap-2 text-white font-bold rounded-xl px-5 py-2.5 text-sm transition-all shadow-sm"
              style={{ background: 'linear-gradient(135deg, #e8920a, #f5b93a)' }}
            >
              <Plus size={15} />
              Add Event
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 bg-white/10 text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-white/20 transition-all border border-white/15"
            >
              <Eye size={15} />
              View Site
            </Link>
          </div>
        </div>
        {/* Accent strip */}
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#e8920a' }} />
          <div className="flex-1" style={{ background: '#dc2626' }} />
          <div className="flex-1" style={{ background: '#1d4ed8' }} />
          <div className="flex-1" style={{ background: '#16a34a' }} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Events"
          value={totalEvents}
          icon={CalendarDays}
          iconBg="#e8f0fe"
          iconColor="#1d4ed8"
          accentColor="#1d4ed8"
        />
        <StatCard
          label="This Month"
          value={thisMonthCount}
          icon={TrendingUp}
          iconBg="#d1fae5"
          iconColor="#059669"
          accentColor="#10b981"
        />
        <StatCard
          label="Drafts"
          value={draftCount}
          icon={FileEdit}
          iconBg="#fef3c7"
          iconColor="#d97706"
          accentColor="#f59e0b"
        />
        <StatCard
          label="Cancelled"
          value={cancelledCount}
          icon={XCircle}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          accentColor="#ef4444"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Upcoming Events */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-royal/10 flex items-center justify-center">
                <Clock size={15} className="text-royal" />
              </div>
              <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider font-display">Upcoming Events</h2>
            </div>
            <Link to="/admin/events" className="text-[11px] font-bold text-gold hover:text-gold/80 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-slate-400 font-medium">
              No upcoming events.
            </div>
          ) : (
            <ul className="divide-y divide-stone-50">
              {upcoming.map((e) => {
                const d = new Date(e.date + 'T00:00:00');
                const cat = CATEGORIES[e.category] || CATEGORIES.others;
                return (
                  <li key={e.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-stone-50/70 transition-colors">
                    <div
                      className="w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}
                    >
                      <span className="text-[9px] font-bold uppercase leading-none opacity-80">
                        {d.toLocaleDateString('en-PH', { month: 'short' })}
                      </span>
                      <span className="text-base font-extrabold leading-tight">
                        {d.getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-navy truncate">{e.title}</p>
                      <p className="text-[11px] text-slate-400 font-medium truncate">{e.location}</p>
                    </div>
                    <CategoryBadge category={e.category} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Events by Category */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-card">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
              <BarChart3 size={15} className="text-gold" />
            </div>
            <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider font-display">
              By Category <span className="text-slate-400 normal-case font-semibold">· {currentYear}</span>
            </h2>
          </div>
          <div className="px-5 py-4 space-y-3.5">
            {byCat.length === 0 ? (
              <p className="text-sm text-slate-400 font-medium text-center py-6">No events yet.</p>
            ) : byCat.map(({ key, label, color, count }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-600 font-bold truncate">{label}</span>
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ml-2"
                    style={{ backgroundColor: color }}
                  >
                    {count}
                  </span>
                </div>
                <div className="h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 to-white">
          <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider font-display">Recent Activity</h2>
          <Link to="/admin/events" className="text-[11px] font-bold text-gold hover:text-gold/80 flex items-center gap-1">
            Manage <ArrowRight size={11} />
          </Link>
        </div>
        <ul className="divide-y divide-stone-50">
          {recent.map((e) => {
            const cat = CATEGORIES[e.category] || CATEGORIES.others;
            return (
              <li key={e.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-stone-50/70 transition-colors">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-navy truncate">{e.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{formatDateFilipino(e.date)} · {cat.label}</p>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${
                  e.status === 'published' ? 'bg-emerald-100 text-emerald-700' :
                  e.status === 'draft'     ? 'bg-amber-100 text-amber-700' :
                                             'bg-red-100 text-red-600'
                }`}>
                  {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                </span>
                <Link
                  to={`/admin/events/${e.id}/edit`}
                  className="text-[11px] font-bold text-royal hover:text-royal/70 transition-colors"
                >
                  Edit
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
