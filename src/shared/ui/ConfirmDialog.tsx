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
    <div className="fixed inset-0 flex items-center justify-center p-4 z-60 bg-black/40"  onClick={(e)=>{
    e.stopPropagation()
    onCancel?onCancel():null
    }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-900">
        {title && <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
        {message && <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{message}</p>}
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 border rounded-md dark:border-gray-700 dark:text-gray-300">Отмена</button>
          <button onClick={onConfirm} className="px-4 py-2 text-white bg-red-600 rounded-md">Удалить</button>
        </div>
      </div>
    </div>
  );
}
