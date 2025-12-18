import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose?: (e?: React.MouseEvent) => void;
  autoCloseMs?: number;
}

export default function ConfirmModal({ open, title, message, onClose, autoCloseMs = 3000 }: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      onClose && onClose();
    }, autoCloseMs);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40"
      onMouseDown={(e) => { if (e.target === e.currentTarget) { onClose && onClose(e as any); } }}
    >
      <div role="dialog" aria-modal="true" className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          {title && <div className="font-semibold text-gray-900 dark:text-white">{title}</div>}
          {message && <div className="text-sm text-gray-600 dark:text-gray-400">{message}</div>}
        </div>
      </div>
    </div>
  );
}
