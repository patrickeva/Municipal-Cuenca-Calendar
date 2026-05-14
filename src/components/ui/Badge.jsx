export default function Badge({ children, color = '#475569', bgColor = '#e2e8f0' }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: bgColor, color }}
    >
      {children}
    </span>
  );
}
