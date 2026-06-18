import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { useAuth } from '../../contexts/AuthContext';
import CalendarGrid from '../../components/calendar/CalendarGrid';
import CategoryFilter from '../../components/calendar/CategoryFilter';
import UpcomingList from '../../components/calendar/UpcomingList';
import DayEventsModal from '../../components/calendar/DayEventsModal';
import EventDetailModal from '../../components/events/EventDetailModal';
import EventForm from '../../components/events/EventForm';
import Modal from '../../components/ui/Modal';
import {
  formatMonthYear, addMonths, subMonths, format, todayStr,
} from '../../lib/dateHelpers';
import ConfirmModal from '../../components/ui/ConfirmModal';

export default function CalendarPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { user } = useAuth();
  const isAdmin = !!user;

  const today = new Date();
  const [currentDate, setCurrentDate]   = useState(today);
  const [activeCategory, setCategory]   = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelEvent]    = useState(null);
  const [showAdd, setShowAdd]           = useState(false);
  const [dayDate, setDayDate]           = useState(null);
  const [dayEvents, setDayEvents]       = useState([]);
  const [showDayEvents, setShowDayEvents] = useState(false);
  const [showDetail, setShowDetail]     = useState(false);
  const [showEdit, setShowEdit]         = useState(false);
  const [toDelete, setToDelete]         = useState(null);
  const [deleting, setDeleting]         = useState(false);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Admins see ALL published events; public users only see isPublic ones
  const published = events.filter((e) =>
    e.status === 'published' && (isAdmin || e.isPublic !== false)
  );

  const filtered = activeCategory === 'all'
    ? published
    : published.filter((e) => e.category === activeCategory);

  const upcomingEvents = published
    .filter((e) => e.date >= todayStr())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 10);

  const monthCount = filtered.filter((e) => {
    const d = new Date(e.date + 'T00:00:00');
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;

  const openAdd = (date) => {
    setSelectedDate(date ? format(date, 'yyyy-MM-dd') : null);
    setShowAdd(true);
  };

  const openDay = (date, evts) => {
    if (evts.length === 0 && isAdmin) { openAdd(date); return; }
    setDayDate(date);
    setDayEvents(evts);
    setShowDayEvents(true);
  };

  const openDetail = (evt) => {
    setSelEvent(evt);
    setShowDetail(true);
  };

  const openDetailFromDay = (evt) => {
    setShowDayEvents(false);
    openDetail(evt);
  };

  const openAddFromDay = () => {
    setShowDayEvents(false);
    openAdd(dayDate);
  };

  const handleEdit = () => {
    setShowDetail(false);
    setShowEdit(true);
  };

  const handleDelete = (id) => {
    const event = events.find((e) => e.id === id);
    setShowDetail(false);
    setToDelete(event || { id });
  };

  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    setDeleting(true);
    await deleteEvent(toDelete.id);
    setDeleting(false);
    setToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-3">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={setCategory} />
        </div>
        {isAdmin && (
          <button
            onClick={() => openAdd(null)}
            className="flex-shrink-0 flex items-center gap-1.5 bg-navy text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-navy/90"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-100">
              <div>
                <h2 className="font-bold text-navy text-lg tracking-tight">
                  {formatMonthYear(currentDate)}
                </h2>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  {monthCount} event{monthCount !== 1 ? 's' : ''} this month
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-slate-400 hover:text-slate-700"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  onClick={() => setCurrentDate(today)}
                  className="px-3 py-1 text-xs font-semibold bg-stone-100 text-navy rounded-lg hover:bg-stone-200"
                >
                  Today
                </button>
                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-slate-400 hover:text-slate-700"
                  aria-label="Next month"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            <CalendarGrid
              year={year}
              month={month}
              events={filtered}
              onDayClick={openDay}
              onEventClick={openDetail}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <UpcomingList events={upcomingEvents} onEventClick={openDetail} />
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        key={`add-${selectedDate}`}
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add Event"
        size="md"
      >
        <EventForm
          defaultDate={selectedDate}
          onSubmit={(data) => { addEvent(data); setShowAdd(false); }}
          onCancel={() => setShowAdd(false)}
        />
      </Modal>

      {/* Day Events Modal */}
      <DayEventsModal
        date={dayDate}
        events={dayEvents}
        isOpen={showDayEvents}
        onClose={() => setShowDayEvents(false)}
        onEventClick={openDetailFromDay}
        onAddEvent={isAdmin ? openAddFromDay : null}
      />

      {/* Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onEdit={isAdmin ? handleEdit : null}
        onDelete={isAdmin ? handleDelete : null}
      />

      {/* Edit Modal */}
      {selectedEvent && (
        <Modal
          key={`edit-${selectedEvent.id}`}
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          title="Edit Event"
          size="md"
        >
          <EventForm
            event={selectedEvent}
            onSubmit={(data) => { updateEvent(selectedEvent.id, data); setShowEdit(false); }}
            onCancel={() => setShowEdit(false)}
          />
        </Modal>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={!!toDelete}
        title="Delete Event?"
        message={toDelete?.title
          ? `"${toDelete.title}" will be permanently deleted from the database. This cannot be undone.`
          : 'This event will be permanently deleted. This cannot be undone.'
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setToDelete(null)}
        loading={deleting}
      />
    </div>
  );
}
