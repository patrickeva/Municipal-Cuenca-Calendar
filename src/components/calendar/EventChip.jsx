import { CATEGORIES } from '../../lib/constants';

export default function EventChip({ event, onClick }) {
  const cat = CATEGORIES[event.category] || CATEGORIES.others;

  return (
    <button
      type="button"
      onClick={onClick}
      title={event.title}
      className="w-full text-left text-[11px] px-2 py-1 rounded-md truncate font-bold hover:brightness-90 active:scale-95 transition-all"
      style={{
        backgroundColor: cat.color,
        color: '#ffffff',
      }}
    >
      {event.title}
    </button>
  );
}
