import { Clock, MapPin } from 'lucide-react';
import { formatMonthAbbr, formatDayNum, formatTime12 } from '../../lib/dateHelpers';
import { CATEGORIES } from '../../lib/constants';

function UpcomingItem({ event, onEventClick }) {
  const cat = CATEGORIES[event.category] || CATEGORIES.others;

  return (
    <button
      type="button"
      onClick={() => onEventClick(event)}
      className="flex gap-3 w-full text-left hover:bg-stone-50 rounded-xl p-2.5 -mx-2.5 group transition-all"
    >
      {/* Date block */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex flex-col items-center justify-center text-white shadow-sm"
        style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}
      >
        <span className="text-[8px] font-extrabold uppercase leading-none opacity-80">
          {formatMonthAbbr(event.date)}
        </span>
        <span className="text-base font-extrabold leading-tight">
          {formatDayNum(event.date)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-xs font-bold text-navy leading-snug line-clamp-2 group-hover:text-royal transition-colors">
          {event.title}
        </p>
        {event.startTime && (
          <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-medium">
            <Clock size={9} className="flex-shrink-0" />
            {formatTime12(event.startTime)}
          </p>
        )}
        <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5 truncate font-medium">
          <MapPin size={9} className="flex-shrink-0 text-gold" />
          <span className="truncate">{event.location}</span>
        </p>
      </div>
    </button>
  );
}

export default function UpcomingList({ events, onEventClick }) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 h-full">
      <h3 className="font-extrabold text-sm text-navy mb-4 tracking-tight font-display flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-gold inline-block" />
        Upcoming
      </h3>

      {events.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-8 font-medium">No upcoming events.</p>
      ) : (
        <div className="space-y-1">
          {events.map((evt) => (
            <UpcomingItem key={evt.id} event={evt} onEventClick={onEventClick} />
          ))}
        </div>
      )}
    </div>
  );
}
