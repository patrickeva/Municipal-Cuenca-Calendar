import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import { formatDateFilipino, formatTime12 } from '../../lib/dateHelpers';

export default function EventCard({ event, onClick }) {
  const content = (
    <article className="rounded-2xl border border-stone-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow h-full flex flex-col">
      <CategoryBadge category={event.category} />

      <h3 className="font-serif text-lg text-navy mt-2 mb-3 leading-snug line-clamp-2 flex-1">
        {event.title}
      </h3>

      <div className="space-y-1.5 text-xs text-slate-500">
        <p className="font-medium text-slate-600">{formatDateFilipino(event.date)}</p>

        {event.startTime && (
          <p className="flex items-center gap-1.5">
            <Clock size={12} className="flex-shrink-0" />
            {formatTime12(event.startTime)}
            {event.endTime ? ` – ${formatTime12(event.endTime)}` : ''}
          </p>
        )}

        <p className="flex items-center gap-1.5 truncate">
          <MapPin size={12} className="flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </p>
      </div>

      {event.description && (
        <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
          {event.description}
        </p>
      )}
    </article>
  );

  if (onClick) {
    return (
      <button type="button" onClick={() => onClick(event)} className="text-left w-full">
        {content}
      </button>
    );
  }

  return <Link to={`/events/${event.id}`}>{content}</Link>;
}
