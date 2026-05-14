import { createPortal } from 'react-dom';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-stone-200 overflow-hidden">
        {/* Red top accent */}
        <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-400" />

        <div className="p-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>

          {/* Text */}
          <h3 className="text-center font-extrabold text-navy text-lg tracking-tight mb-2 font-display">
            {title || 'Delete Event?'}
          </h3>
          <p className="text-center text-slate-400 text-sm font-medium leading-relaxed mb-6">
            {message || 'This action cannot be undone. The event will be permanently removed from the database.'}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-stone-100 text-slate-600 rounded-xl py-3 text-sm font-bold hover:bg-stone-200 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white rounded-xl py-3 text-sm font-bold hover:bg-red-700 transition-all disabled:opacity-50 shadow-sm"
            >
              <Trash2 size={14} />
              {loading ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
