import { forwardRef } from 'react';

const base =
  'w-full rounded-lg border border-stone-300 px-3 py-2.5 text-sm bg-white ' +
  'focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none ' +
  'disabled:bg-stone-50 disabled:text-slate-400';

const Select = forwardRef(function Select({ label, error, options = [], placeholder, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      )}
      <select ref={ref} className={`${base} ${error ? 'border-red-400' : ''} ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(({ value, label: lbl }) => (
          <option key={value} value={value}>{lbl}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
});

export default Select;
