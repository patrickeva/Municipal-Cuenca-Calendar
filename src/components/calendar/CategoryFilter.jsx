import { CATEGORIES } from '../../lib/constants';

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category Filter">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
          activeCategory === 'all'
            ? 'bg-navy text-white'
            : 'bg-white text-slate-500 border border-stone-200 hover:border-slate-300 hover:text-slate-700'
        }`}
      >
        All
      </button>

      {Object.entries(CATEGORIES).map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border"
          style={
            activeCategory === key
              ? { backgroundColor: cat.color, color: '#fff', borderColor: cat.color }
              : { backgroundColor: '#fff', color: cat.text, borderColor: '#e7e5e4' }
          }
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
