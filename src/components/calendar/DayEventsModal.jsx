import { Clock, MapPin, Plus, CalendarDays } from 'lucide-react';
import Modal from '../ui/Modal';
import { CATEGORIES } from '../../lib/constants';
import { formatDateFilipino, formatTime12, format } from '../../lib/dateHelpers';

function DayEventRow({ event, onClick }) {
  const cat = CATEGORIES[event.category] || CATEGORIES.others;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left hover:bg-stone-50 rounded-xl p-2.5 -mx-2.5 group transition-all"
    >
      <span
        className="w-2 h-10 rounded-full flex-shrink-0"
        style={{ backgroundColor: cat.color }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-navy leading-snug truncate group-hover:text-royal transition-colors">
          {event.title}
        </p>
        <div className="flex items-center gap-3 mt-0.5">
          {event.startTime && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
              <Clock size={10} className="flex-shrink-0" />
              {formatTime12(event.startTime)}
            </span>
          )}
          <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium truncate">
            <MapPin size={10} className="flex-shrink-0 text-gold" />
            <span className="truncate">{event.location}</span>
          </span>
        </div>
      </div>
      <span
        className="flex-shrink-0 text-[10px] font-extrabold px-2 py-1 rounded-lg"
        style={{ backgroundColor: cat.light, color: cat.text }}
      >
        {cat.label}
      </span>
    </button>
  );
}

export default function DayEventsModal({ date, events, isOpen, onClose, onEventClick, onAddEvent }) {
  if (!date) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={formatDateFilipino(format(date, 'yyyy-MM-dd'))} size="md">
      {events.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-3">
            <CalendarDays size={20} className="text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-500">No events on this date</p>
        </div>
      ) : (
        <div className="space-y-1">
          {events.map((evt) => (
            <DayEventRow key={evt.id} event={evt} onClick={() => onEventClick(evt)} />
          ))}
        </div>
      )}

      {onAddEvent && (
        <button
          type="button"
          onClick={onAddEvent}
          className="flex items-center justify-center gap-1.5 w-full mt-4 pt-4 border-t border-stone-100 text-sm font-bold text-royal hover:text-navy transition-colors"
        >
          <Plus size={15} />
          Add Event on This Date
        </button>
      )}
    </Modal>
  );
}
