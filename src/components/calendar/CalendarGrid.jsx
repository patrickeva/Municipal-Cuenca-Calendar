import { format, isSameMonth, isToday, getMonthGrid } from '../../lib/dateHelpers';
import { DAYS_SHORT } from '../../lib/constants';
import CalendarDay from './CalendarDay';

export default function CalendarGrid({ year, month, events, onDayClick, onEventClick }) {
  const days        = getMonthGrid(year, month);
  const monthAnchor = new Date(year, month, 1);

  return (
    <div role="grid" aria-label="Calendar">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b-2 border-stone-200 bg-navy">
        {DAYS_SHORT.map((d, i) => (
          <div
            key={d}
            className={`text-center text-[11px] font-extrabold py-2 uppercase tracking-widest
              ${i === 0 || i === 6 ? 'text-amber-300' : 'text-white/70'}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 border-l border-t border-stone-200">
        {days.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const dayEvts = events
            .filter((e) => e.date === dateStr)
            .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

          return (
            <CalendarDay
              key={dateStr}
              date={date}
              events={dayEvts}
              isCurrentMonth={isSameMonth(date, monthAnchor)}
              isToday={isToday(date)}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
            />
          );
        })}
      </div>
    </div>
  );
}
