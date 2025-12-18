import { useEffect } from 'react';

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm?: (e?: React.MouseEvent) => void;
  onCancel?: (e?: React.MouseEvent) => void;
};

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40"
      onMouseDown={(e) => { if (e.target === e.currentTarget) { onCancel && onCancel(e as any); } }}
    >
      <div role="dialog" aria-modal="true" className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>}
        {message && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 border rounded-md dark:border-gray-700 dark:text-gray-300">Отмена</button>
          <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 rounded-md">Удалить</button>
        </div>
      </div>
    </div>
  );
}
