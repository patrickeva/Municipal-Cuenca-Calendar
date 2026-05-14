import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, Calendar, MapPin, Clock, Filter } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { useAuth } from '../../contexts/AuthContext';
import { CATEGORIES } from '../../lib/constants';
import { formatDateFilipino, formatTime12 } from '../../lib/dateHelpers';

export default function Search() {
  const { events } = useEvents();
  const { user } = useAuth();
  const isAdmin = !!user;
  const [query, setQuery]       = useState('');
  const [category, setCategory] = useState('all');

  const lower = query.toLowerCase();
  const results = events
    .filter((e) => e.status === 'published' && (isAdmin || e.isPublic !== false))
    .filter((e) => category === 'all' || e.category === category)
    .filter((e) =>
      !query ||
      e.title.toLowerCase().includes(lower) ||
      e.description?.toLowerCase().includes(lower) ||
      e.location?.toLowerCase().includes(lower)
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="min-h-screen">
      {/* Search hero */}
      <div className="bg-navy py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Find Events</p>
          <h1 className="font-extrabold text-3xl text-white tracking-tight font-display mb-6">Search Events</h1>

          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <SearchIcon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm font-medium text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:bg-white/15 transition-all"
                placeholder="Search by title, location, or description..."
                autoFocus
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-gold/40"
            >
              <option value="all" className="text-navy bg-white">All Categories</option>
              {Object.entries(CATEGORIES).map(([k, c]) => (
                <option key={k} value={k} className="text-navy bg-white">{c.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-5 py-8">
        {results.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={28} className="text-slate-300" />
            </div>
            <p className="font-extrabold text-lg text-slate-500">No events found</p>
            <p className="text-sm text-slate-400 mt-1">Try different keywords or select another category.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-bold text-slate-500">
                <span className="text-navy font-extrabold text-lg">{results.length}</span>
                {' '}result{results.length !== 1 ? 's' : ''} found
              </p>
              {query && (
                <p className="text-sm text-slate-400 font-medium">
                  for "<span className="text-navy font-bold">{query}</span>"
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((e) => {
                const cat = CATEGORIES[e.category] || CATEGORIES.others;
                return (
                  <Link to={`/events/${e.id}`} key={e.id}>
                    <article className="bg-white rounded-2xl border border-stone-200 hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 overflow-hidden h-full flex flex-col">
                      {/* Color top bar */}
                      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)` }} />

                      <div className="p-5 flex-1 flex flex-col">
                        {/* Category + date */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold flex-shrink-0"
                            style={{ backgroundColor: cat.light, color: cat.text }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                            {cat.label}
                          </span>
                          <div
                            className="w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-white shadow-sm"
                            style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)` }}
                          >
                            <span className="text-[8px] font-bold uppercase leading-none opacity-80">
                              {new Date(e.date + 'T00:00:00').toLocaleDateString('en-PH', { month: 'short' })}
                            </span>
                            <span className="text-sm font-extrabold leading-tight">
                              {new Date(e.date + 'T00:00:00').getDate()}
                            </span>
                          </div>
                        </div>

                        <h2 className="font-extrabold text-navy text-base leading-snug mb-3 flex-1">{e.title}</h2>

                        <div className="space-y-1.5 text-xs text-slate-400 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={11} className="text-gold flex-shrink-0" />
                            <span>{formatDateFilipino(e.date)}</span>
                          </div>
                          {e.startTime && (
                            <div className="flex items-center gap-1.5">
                              <Clock size={11} className="text-gold flex-shrink-0" />
                              <span>{formatTime12(e.startTime)}{e.endTime ? ` – ${formatTime12(e.endTime)}` : ''}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5">
                            <MapPin size={11} className="text-gold flex-shrink-0" />
                            <span className="truncate">{e.location}</span>
                          </div>
                        </div>

                        {e.description && (
                          <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-stone-100 line-clamp-2 leading-relaxed">
                            {e.description}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
