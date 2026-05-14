import EventChip from './EventChip';

export default function CalendarDay({ date, events, isCurrentMonth, isToday, onDayClick, onEventClick }) {
  const dayNum  = date.getDate();
  const isSun   = date.getDay() === 0;
  const isSat   = date.getDay() === 6;
  const visible  = events.slice(0, 3);
  const overflow = events.length - visible.length;
  const isWeekend = isSun || isSat;

  return (
    <div
      className={`border-r border-b border-stone-200 min-h-[82px] p-1.5 group transition-colors
        ${onDayClick ? 'cursor-pointer' : 'cursor-default'}
        ${isToday
          ? 'bg-royal/5 border-b-2 border-b-royal'
          : isCurrentMonth
            ? isWeekend ? 'bg-amber-50/40 hover:bg-amber-50/80' : 'bg-white hover:bg-blue-50/30'
            : 'bg-stone-100/50'
        }`}
      onClick={() => onDayClick?.(date)}
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

      <div className="space-y-0.5">
        {visible.map((evt) => (
          <EventChip
            key={evt.id}
            event={evt}
            onClick={(e) => { e.stopPropagation(); onEventClick(evt); }}
          />
        ))}
        {overflow > 0 && (
          <span className="block text-[10px] text-royal font-bold px-1 py-0.5">
            +{overflow} more
          </span>
        )}
      </div>
    </div>
  );
}
