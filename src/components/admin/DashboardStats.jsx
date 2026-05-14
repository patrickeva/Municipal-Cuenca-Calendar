export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(({ label, value, color = 'text-navy', bg = 'bg-navy/8', icon: Icon }) => (
        <div key={label} className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col gap-3">
          {Icon && (
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={17} className={color} />
            </div>
          )}
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
            <p className={`text-3xl font-extrabold mt-0.5 tracking-tight ${color}`}>{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
