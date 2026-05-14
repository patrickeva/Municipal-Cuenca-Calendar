import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Dialog'}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-xl shadow-xl w-full ${widths[size]} max-h-[92vh] flex flex-col border border-stone-200`}
      >
        {title && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 flex-shrink-0">
            <h3 className="font-bold text-navy text-base tracking-tight">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-100 text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
