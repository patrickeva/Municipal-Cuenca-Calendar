export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold text-white min-w-[200px] shadow-lg
            ${t.type === 'success' ? 'bg-emerald-600' :
              t.type === 'info'    ? 'bg-slate-700'   : 'bg-ember'}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
