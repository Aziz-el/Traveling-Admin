import React from 'react';

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }: Props) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6">
        {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>}
        {message && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-700 dark:border-gray-700 dark:text-gray-300">Отмена</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">Удалить</button>
        </div>
      </div>
    </div>
  );
}
