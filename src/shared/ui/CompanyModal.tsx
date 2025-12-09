import React, { useState, useEffect } from 'react';

interface CompanyModalProps {
  open: boolean;
  initialName?: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function CompanyModal({ open, initialName = '', onClose, onSave }: CompanyModalProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{initialName ? 'Редактировать компанию' : 'Добавить компанию'}</h3>

        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">Название компании</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">Отмена</button>
          <button
            onClick={() => { if (name.trim()) onSave(name.trim()); }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyModal;
