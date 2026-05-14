import { useEvents } from '../../contexts/EventsContext';
import { CATEGORIES } from '../../lib/constants';

export default function Categories() {
  const { events } = useEvents();
  const total = events.length || 1;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-extrabold text-2xl text-navy tracking-tight font-display">Categories</h1>
        <p className="text-slate-400 text-sm font-medium mt-0.5">Event types used across the municipal calendar</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const count = events.filter((e) => e.category === key).length;
          const pct   = Math.round((count / total) * 100);

          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-card-md transition-all duration-200 hover:-translate-y-0.5 group overflow-hidden relative"
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }}
              />

              <div className="flex items-start justify-between mt-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-sm flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}
                  >
                    {cat.label.charAt(0)}
                  </div>
                  <div>
                    <p className="font-extrabold text-navy text-sm">{cat.label}</p>
                    <p className="text-[11px] text-slate-400 font-medium font-mono">{cat.color}</p>
                  </div>
                </div>
                <div
                  className="text-2xl font-extrabold"
                  style={{ color: cat.color }}
                >
                  {count}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Share of total events</span>
                  <span className="text-[11px] font-extrabold" style={{ color: cat.color }}>{pct}%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5">
        <h2 className="font-extrabold text-sm text-navy uppercase tracking-wider mb-4 font-display">Summary</h2>
        <div className="space-y-3">
          {Object.entries(CATEGORIES)
            .map(([k, c]) => ({ key: k, ...c, count: events.filter((e) => e.category === k).length }))
            .sort((a, b) => b.count - a.count)
            .map(({ key, label, color, count }) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-sm font-semibold text-slate-600 flex-1">{label}</span>
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(count / total) * 100}%`, backgroundColor: color }}
                  />
                </div>
                <span className="text-sm font-extrabold text-navy w-6 text-right">{count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
