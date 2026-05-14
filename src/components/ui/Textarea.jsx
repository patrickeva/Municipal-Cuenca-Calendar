import { forwardRef } from 'react';

const base =
  'w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm resize-none ' +
  'focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none ' +
  'disabled:bg-stone-50 disabled:text-slate-400';

const Textarea = forwardRef(function Textarea({ label, error, rows = 4, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${base} ${error ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
});

export default Textarea;
