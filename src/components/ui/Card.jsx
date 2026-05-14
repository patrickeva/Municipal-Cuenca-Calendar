export default function Card({ children, className = '', as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
