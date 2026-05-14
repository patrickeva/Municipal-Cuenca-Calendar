import { Download } from 'lucide-react';

function eventsToCSV(events) {
  const headers = ['ID','Title','Date','End Date','Start Time','End Time',
    'Location','Category','Organizer','Contact','Status','Public'];
  const rows = events.map((e) => [
    e.id, e.title, e.date, e.endDate || '', e.startTime || '', e.endTime || '',
    e.location, e.category, e.organizer || '', e.contactInfo || '', e.status,
    e.isPublic ? 'Yes' : 'No',
  ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export default function DataExport({ events }) {
  const handleExport = () => {
    const csv  = eventsToCSV(events);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `cuenca-events-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="flex items-center gap-2 bg-white text-slate-600 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-stone-50 hover:border-stone-300 transition-all shadow-card"
    >
      <Download size={14} />
      Export CSV
    </button>
  );
}
