import React, { useEffect, useState } from 'react'
import { CompanyForm } from '../../model/types'

interface CompanyModalProps {
  open: boolean
  initialData?: CompanyForm
  onClose: () => void
  onSave: (data: CompanyForm) => Promise<void>
}

export function CompanyModal({ open, initialData, onClose, onSave }: CompanyModalProps) {
  const [form, setForm] = useState<CompanyForm>({
    name: '',
    address: '',
    work_hours: '',
    website: ''
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ name: '', address: '', work_hours: '', website: '' })
    }
  }, [initialData])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md p-6 bg-white border rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-800 dark:text-white ">
        <h3 className="mb-4 text-lg text-gray-900 dark:text-white">
          {initialData ? 'Редактировать компанию' : 'Добавить компанию'}
        </h3>

        <div className="space-y-3">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Название компании"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            placeholder="Адрес"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            value={form.work_hours}
            onChange={e => setForm({ ...form, work_hours: e.target.value })}
            placeholder="Часы работы"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />

          <input
            value={form.website}
            onChange={e => setForm({ ...form, website: e.target.value })}
            placeholder="Сайт"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg dark:border-gray-700">
            Отмена
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyModal
