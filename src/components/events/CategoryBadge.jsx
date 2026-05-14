import { CATEGORIES } from '../../lib/constants';

export default function CategoryBadge({ category, small = false }) {
  const cat = CATEGORIES[category] || CATEGORIES.others;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md font-semibold ${small ? 'px-1.5 py-0.5 text-[10px] mt-1' : 'px-2 py-1 text-[11px]'}`}
      style={{ backgroundColor: cat.light, color: cat.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: cat.color }}
      />
      {cat.label}
    </span>
  );
}
