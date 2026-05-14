const variants = {
  primary:   'bg-navy text-white hover:bg-navy/90 rounded-full',
  secondary: 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 rounded-lg',
  danger:    'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-lg',
  ghost:     'text-slate-500 hover:text-slate-700 hover:bg-stone-100 rounded-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm', lg: 'px-6 py-3 text-base' };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
