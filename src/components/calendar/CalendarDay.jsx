import EventChip from './EventChip';
import { CATEGORIES } from '../../lib/constants';

export default function CalendarDay({ date, events, isCurrentMonth, isToday, onDayClick, onEventClick }) {
  const dayNum  = date.getDate();
  const isSun   = date.getDay() === 0;
  const isSat   = date.getDay() === 6;
  const visible  = events.slice(0, 2);
  const overflow = events.length - visible.length;
  const isWeekend = isSun || isSat;
  const dots     = events.slice(0, 4);

  return (
    <div
      className={`border-r border-b border-stone-200 min-h-[52px] sm:min-h-[82px] p-1 sm:p-1.5 group transition-colors
        ${onDayClick ? 'cursor-pointer' : 'cursor-default'}
        ${isToday
          ? 'bg-royal/5 border-b-2 border-b-royal'
          : isCurrentMonth
            ? isWeekend ? 'bg-amber-50/40 hover:bg-amber-50/80' : 'bg-white hover:bg-blue-50/30'
            : 'bg-stone-100/50'
        }`}
      onClick={() => onDayClick?.(date, events)}
      role="gridcell"
    >
      <div className="flex justify-end mb-1">
        <span
          className={`text-xs font-extrabold w-6 h-6 flex items-center justify-center rounded-full leading-none
            ${isToday
              ? 'bg-royal text-white shadow-md'
              : isWeekend && isCurrentMonth
                ? 'text-ember font-bold'
                : isCurrentMonth
                  ? 'text-navy/80'
                  : 'text-slate-300'
            }`}
        >
          {dayNum}
        </span>
      </div>

      {/* Mobile: compact dots only — tap the day to see the full list */}
      {dots.length > 0 && (
        <div className="flex sm:hidden items-center justify-end gap-0.5 flex-wrap">
          {dots.map((evt) => {
            const cat = CATEGORIES[evt.category] || CATEGORIES.others;
            return (
              <span
                key={evt.id}
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.color }}
              />
            );
          })}
          {events.length > dots.length && (
            <span className="text-[8px] font-extrabold text-royal leading-none">+{events.length - dots.length}</span>
          )}
        </div>
      )}

      {/* Tablet/desktop: titled chips */}
      <div className="hidden sm:block space-y-1">
        {visible.map((evt) => (
          <EventChip
            key={evt.id}
            event={evt}
            onClick={(e) => { e.stopPropagation(); onEventClick(evt); }}
          />
        ))}
        {overflow > 0 && (
          <span className="block text-[10px] font-extrabold text-center text-royal bg-royal/10 rounded-md py-1 hover:bg-royal/20 transition-colors">
            +{overflow} more
          </span>
        )}
      </div>
    </div>
  );
}
