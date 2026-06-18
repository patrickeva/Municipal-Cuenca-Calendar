import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Pencil, Trash2, Copy } from 'lucide-react';
import Modal from '../ui/Modal';
import CategoryBadge from './CategoryBadge';
import { CATEGORIES } from '../../lib/constants';
import { formatDateFilipino, formatTime12 } from '../../lib/dateHelpers';

export default function EventDetailModal({ event, isOpen, onClose, onEdit, onDelete, onDuplicate }) {
  const [confirmDel, setConfirmDel] = useState(false);

  if (!event) return null;

  const cat = CATEGORIES[event.category] || CATEGORIES.others;

  const handleClose = () => {
    setConfirmDel(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={null}>
      {/* Color bar */}
      <div
        className="h-1 rounded-t-xl -mt-5 -mx-5 mb-5"
        style={{ backgroundColor: cat.color }}
      />

      <CategoryBadge category={event.category} />
      <h2 className="font-bold text-navy text-lg mt-2 mb-4 leading-snug tracking-tight">{event.title}</h2>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-start gap-2.5">
          <Calendar size={14} className="mt-0.5 flex-shrink-0 text-gold" />
          <div>
            <div className="font-medium">{formatDateFilipino(event.date)}</div>
            {event.endDate && (
              <div className="text-xs text-slate-400 mt-0.5">
                until {formatDateFilipino(event.endDate)}
              </div>
            )}
          </div>
        </div>

        {event.startTime && (
          <div className="flex items-center gap-2.5">
            <Clock size={14} className="flex-shrink-0 text-gold" />
            <span>
              {formatTime12(event.startTime)}
              {event.endTime ? ` – ${formatTime12(event.endTime)}` : ''}
            </span>
          </div>
        )}

        <div className="flex items-start gap-2.5">
          <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gold" />
          <span>{event.location}</span>
        </div>

        {event.organizer && (
          <div className="flex items-center gap-2.5">
            <User size={14} className="flex-shrink-0 text-gold" />
            <span>{event.organizer}</span>
          </div>
        )}

        {event.contactInfo && (
          <div className="flex items-center gap-2.5">
            <Phone size={14} className="flex-shrink-0 text-gold" />
            <span>{event.contactInfo}</span>
          </div>
        )}
      </div>

      {event.description && (
        <div className="mt-4 pt-4 border-t border-stone-100">
          <p className="text-sm text-slate-500 leading-relaxed">{event.description}</p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        {!confirmDel ? (
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={() => { setConfirmDel(false); onEdit(); }}
                className="flex items-center gap-1.5 bg-navy text-white rounded-lg px-4 py-2 text-xs font-semibold hover:bg-navy/90"
              >
                <Pencil size={13} />
                Edit
              </button>
            )}
            {onDuplicate && (
              <button
                onClick={() => onDuplicate(event)}
                className="flex items-center gap-1.5 bg-royal/10 text-royal rounded-lg px-4 py-2 text-xs font-semibold hover:bg-royal/20"
              >
                <Copy size={13} />
                Duplicate
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => setConfirmDel(true)}
                className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg px-4 py-2 text-xs font-semibold hover:bg-red-100"
              >
                <Trash2 size={13} />
                Delete
              </button>
            )}
            <button
              onClick={handleClose}
              className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-xs text-red-600 flex-1 font-medium">Are you sure you want to delete this?</p>
            <button
              onClick={() => { onDelete(event.id); setConfirmDel(false); }}
              className="bg-ember text-white rounded-lg px-3 py-2 text-xs font-semibold hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDel(false)}
              className="bg-stone-100 text-slate-600 rounded-lg px-3 py-2 text-xs font-semibold hover:bg-stone-200"
            >
              No
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
