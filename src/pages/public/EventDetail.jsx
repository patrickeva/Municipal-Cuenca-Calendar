import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone, Lock } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { useAuth } from '../../contexts/AuthContext';
import { CATEGORIES } from '../../lib/constants';
import { formatDateFilipino, formatTime12 } from '../../lib/dateHelpers';

export default function EventDetail() {
  const { id } = useParams();
  const { getEventById } = useEvents();
  const { user } = useAuth();
  const isAdmin = !!user;
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="font-extrabold text-2xl text-navy mb-4">Event not found.</p>
        <Link to="/calendar" className="text-gold hover:text-gold/80 font-semibold">← Back to Calendar</Link>
      </div>
    );
  }

  // Block public access to private events
  if (event.isPublic === false && !isAdmin) {
    return (
      <div className="max-w-6xl mx-auto px-5 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Lock size={28} className="text-slate-400" />
        </div>
        <p className="font-extrabold text-2xl text-navy mb-2">Private Event</p>
        <p className="text-slate-400 text-sm font-medium mb-6">This event is for internal use only.</p>
        <Link to="/calendar" className="text-gold hover:text-gold/80 font-semibold">← Back to Calendar</Link>
      </div>
    );
  }

  const cat = CATEGORIES[event.category] || CATEGORIES.others;

  const details = [
    { Icon: Calendar, label: 'Date',      value: formatDateFilipino(event.date) + (event.endDate ? ` – ${formatDateFilipino(event.endDate)}` : '') },
    event.startTime && { Icon: Clock,    label: 'Time',      value: formatTime12(event.startTime) + (event.endTime ? ` – ${formatTime12(event.endTime)}` : '') },
    { Icon: MapPin,   label: 'Location', value: event.location },
    event.organizer  && { Icon: User,    label: 'Organizer', value: event.organizer },
    event.contactInfo && { Icon: Phone,  label: 'Contact',   value: event.contactInfo },
  ].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Color hero bar */}
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88, transparent)` }} />

      <div className="max-w-6xl mx-auto px-5 py-8">
        <Link
          to="/calendar"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-navy transition-colors mb-8"
        >
          <ArrowLeft size={15} /> Back to Calendar
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-7">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold mb-4"
                style={{ backgroundColor: cat.light, color: cat.text }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.label}
              </span>

              <h1 className="font-extrabold text-3xl text-navy leading-snug tracking-tight font-display mb-6">
                {event.title}
              </h1>

              {event.description && (
                <div className="border-t border-stone-100 pt-5">
                  <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Description</h2>
                  <p className="text-slate-600 leading-relaxed text-sm">{event.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Event Details card */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-5">
              <h2 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest mb-4">Event Details</h2>
              <div className="space-y-4">
                {details.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: cat.light }}
                    >
                      <Icon size={14} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{label}</p>
                      <p className="text-sm font-bold text-navy mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-5">
              <h2 className="font-extrabold text-xs text-slate-400 uppercase tracking-widest mb-3">Status</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                event.status === 'published' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                event.status === 'cancelled' ? 'bg-red-100 text-red-600 border border-red-200' :
                'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  event.status === 'published' ? 'bg-emerald-500' :
                  event.status === 'cancelled' ? 'bg-red-500' : 'bg-amber-500'
                }`} />
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>

            <Link
              to="/calendar"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #0c1f3f, #1a3a6b)' }}
            >
              <Calendar size={14} />
              View Full Calendar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
