import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, CalendarDays, MapPin, Lock } from 'lucide-react';
import { CATEGORIES } from '../../lib/constants';
import { formatDateFilipino } from '../../lib/dateHelpers';

const STATUS = {
  published: { label: 'Published', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  draft:     { label: 'Draft',     cls: 'bg-amber-100  text-amber-700  border-amber-200'  },
  cancelled: { label: 'Cancelled', cls: 'bg-red-100    text-red-600    border-red-200'    },
};

export default function EventTable({ events, onView, onDelete }) {
  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 shadow-card">
        <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
          <CalendarDays size={24} className="text-slate-300" />
        </div>
        <p className="font-bold text-sm text-slate-500">No events found</p>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-stone-100 text-left" style={{ background: 'linear-gradient(135deg, #f8f7f4, #ffffff)' }}>
            <th className="px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Date</th>
            <th className="px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Event</th>
            <th className="px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest hidden md:table-cell">Category</th>
            <th className="px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Status</th>
            <th className="px-5 py-3.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {events.map((e) => {
            const cat = CATEGORIES[e.category] || CATEGORIES.others;
            const st  = STATUS[e.status] || STATUS.draft;
            return (
              <tr
                key={e.id}
                className="hover:bg-stone-50/80 transition-colors group"
              >
                {/* Date */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white"
                      style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}bb)` }}
                    >
                      <span className="text-[8px] font-bold uppercase leading-none opacity-80">
                        {new Date(e.date + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short' })}
                      </span>
                      <span className="text-sm font-extrabold leading-tight">
                        {new Date(e.date + 'T00:00:00').getDate()}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Title + location */}
                <td className="px-5 py-4 max-w-[220px]">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-navy text-sm truncate">{e.title}</p>
                    {e.isPublic === false && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px] font-bold flex-shrink-0">
                        <Lock size={8} /> Private
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={10} className="flex-shrink-0" />
                    {e.location}
                  </p>
                </td>

                {/* Category */}
                <td className="px-5 py-4 hidden md:table-cell">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                    style={{ backgroundColor: cat.light, color: cat.text }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    {cat.label}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border ${st.cls}`}>
                    {st.label}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onView(e)}
                      className="p-2 rounded-xl hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all"
                      title="View"
                    >
                      <Eye size={14} />
                    </button>
                    <Link
                      to={`/admin/events/${e.id}/edit`}
                      className="p-2 rounded-xl hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-all"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => onDelete(e.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
