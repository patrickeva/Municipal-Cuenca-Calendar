import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'lucide-react';
import Modal from '../ui/Modal';
import { shiftYear } from '../../lib/dateHelpers';

export default function DuplicateEventModal({ event, isOpen, onClose }) {
  const navigate = useNavigate();
  const eventYear = event ? Number(event.date.slice(0, 4)) : new Date().getFullYear();
  const [targetYear, setTargetYear] = useState(eventYear + 1);

  if (!event) return null;

  const handleDuplicate = () => {
    const deltaYears = targetYear - eventYear;
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = event;
    navigate('/admin/events/new', {
      state: {
        duplicateFrom: {
          ...rest,
          date:    shiftYear(event.date, deltaYears),
          endDate: event.endDate ? shiftYear(event.endDate, deltaYears) : '',
          status:  'draft',
        },
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Duplicate Event" size="sm">
      <p className="text-sm text-slate-500 font-medium mb-4">
        Copy <span className="font-bold text-navy">"{event.title}"</span> to a different year. You'll be able to review and edit every detail before saving.
      </p>

      <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        Target Year
      </label>
      <input
        type="number"
        value={targetYear}
        onChange={(e) => setTargetYear(Number(e.target.value))}
        className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm focus:ring-2 focus:ring-navy/20 focus:border-navy/30 outline-none font-medium"
        min={eventYear}
      />

      <div className="flex gap-2 justify-end pt-5 mt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="bg-stone-100 text-slate-600 rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-stone-200"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDuplicate}
          className="flex items-center gap-1.5 bg-navy text-white rounded-lg px-5 py-2.5 text-sm font-bold hover:bg-navy/90"
        >
          <Copy size={14} />
          Duplicate
        </button>
      </div>
    </Modal>
  );
}
