import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { CATEGORIES } from '../../lib/constants';
import EventTable from '../../components/admin/EventTable';
import DataExport from '../../components/admin/DataExport';
import EventDetailModal from '../../components/events/EventDetailModal';
import ConfirmModal from '../../components/ui/ConfirmModal';

const PAGE_SIZE = 10;

export default function EventsList() {
  const { events, deleteEvent } = useEvents();
  const [query,        setQuery]   = useState('');
  const [catFilter,    setCat]     = useState('all');
  const [statusFilter, setStatus]  = useState('all');
  const [page,         setPage]    = useState(1);
  const [selected,     setSelected]    = useState(null);
  const [showDetail,   setShowDetail]  = useState(false);
  const [toDelete,     setToDelete]    = useState(null);
  const [deleting,     setDeleting]    = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return [...events]
      .filter((e) => catFilter    === 'all' || e.category === catFilter)
      .filter((e) => statusFilter === 'all' || e.status   === statusFilter)
      .filter((e) => !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [events, query, catFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const resetPage  = () => setPage(1);

  const handleDeleteClick = (id) => {
    const event = events.find((e) => e.id === id);
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
    <div className="p-6 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-extrabold text-2xl text-navy tracking-tight font-display">Events</h1>
          <p className="text-slate-400 text-sm font-medium mt-0.5">{filtered.length} event{filtered.length !== 1 ? 's' : ''} found</p>
        </div>
        <div className="flex items-center gap-2.5">
          <DataExport events={filtered} />
          <Link
            to="/admin/events/new"
            className="flex items-center gap-2 text-white rounded-xl px-5 py-2.5 text-sm font-bold transition-all shadow-sm hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #0c1f3f, #1a3a6b)' }}
          >
            <Plus size={15} />
            Add Event
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card p-4 flex flex-wrap gap-3 items-center">
        <Filter size={14} className="text-slate-400 flex-shrink-0" />

        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); resetPage(); }}
            placeholder="Search events..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-sm font-medium focus:ring-2 focus:ring-navy/15 focus:border-navy/30 outline-none bg-stone-50 text-navy placeholder:text-slate-400"
          />
        </div>

        {/* Category */}
        <select
          value={catFilter}
          onChange={(e) => { setCat(e.target.value); resetPage(); }}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm font-semibold bg-stone-50 text-navy focus:ring-2 focus:ring-navy/15 outline-none"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORIES).map(([k, c]) => (
            <option key={k} value={k}>{c.label}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => { setStatus(e.target.value); resetPage(); }}
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm font-semibold bg-stone-50 text-navy focus:ring-2 focus:ring-navy/15 outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <EventTable
        events={paginated}
        onView={(e) => { setSelected(e); setShowDetail(true); }}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 text-sm font-bold rounded-xl border border-stone-200 bg-white disabled:opacity-40 hover:bg-stone-50 transition-all"
          >
            ← Prev
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm font-extrabold rounded-xl transition-all ${
                  p === page
                    ? 'text-white shadow-sm'
                    : 'text-slate-500 hover:bg-stone-100 border border-stone-200 bg-white'
                }`}
                style={p === page ? { background: 'linear-gradient(135deg, #0c1f3f, #1a3a6b)' } : {}}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm font-bold rounded-xl border border-stone-200 bg-white disabled:opacity-40 hover:bg-stone-50 transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {/* Detail modal */}
      <EventDetailModal
        event={selected}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        onEdit={() => setShowDetail(false)}
        onDelete={(id) => { setShowDetail(false); handleDeleteClick(id); }}
      />

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
