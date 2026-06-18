import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Info, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import EventForm from '../../components/events/EventForm';

export default function EventEdit() {
  const { id }         = useParams();
  const navigate       = useNavigate();
  const location       = useLocation();
  const { addEvent, updateEvent, getEventById } = useEvents();
  const event = id ? getEventById(id) : null;
  const isNew = !id;
  const duplicateFrom = isNew ? location.state?.duplicateFrom : null;

  const handleSubmit = (data) => {
    if (isNew) addEvent(data);
    else updateEvent(id, data);
    navigate('/admin/events');
  };

  if (!isNew && !event) {
    return (
      <div className="p-6">
        <p className="text-slate-500">Event not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">
      <div>
        <button
          onClick={() => navigate('/admin/events')}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy mb-4 transition-colors font-medium"
        >
          <ArrowLeft size={15} /> Back to List
        </button>
        <h1 className="font-extrabold text-2xl text-navy tracking-tight">
          {isNew ? 'New Event' : 'Edit Event'}
        </h1>
        <p className="text-slate-400 text-sm font-medium mt-0.5">
          {isNew ? 'Fill in the details below to add a new event.' : 'Update the event information below.'}
        </p>
        {duplicateFrom && (
          <div className="flex items-center gap-2 mt-3 bg-royal/5 border border-royal/15 rounded-xl px-4 py-2.5 text-xs font-semibold text-royal">
            <Copy size={13} />
            Duplicated from "{duplicateFrom.title}" — review and edit the details below before saving.
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Form — takes 2/3 */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-card p-6">
          <EventForm
            event={event}
            initialData={duplicateFrom}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/admin/events')}
          />
        </div>

        {/* Info sidebar — takes 1/3 */}
        <div className="space-y-4">

          {/* Status guide */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-5">
            <h2 className="font-extrabold text-xs text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <Info size={13} className="text-gold" />
              Status Guide
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-navy">Published</p>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Visible to all visitors on the public calendar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-navy">Draft</p>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Saved but hidden from public view.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-navy">Cancelled</p>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Marked as cancelled and hidden from public.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-5">
            <h2 className="font-extrabold text-xs text-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <CheckCircle2 size={13} className="text-royal" />
              Quick Tips
            </h2>
            <ul className="space-y-2.5">
              {[
                'Use a clear, descriptive title so residents know what the event is.',
                'Always fill in the location — even if it\'s "Online" or "TBA".',
                'Add an end date for multi-day events like fiestas or sports meets.',
                'Set status to Draft while still planning, then publish when ready.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-slate-500 font-medium leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-royal/10 text-royal font-extrabold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
              Published events are immediately visible to the public. Double-check the details before saving.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
