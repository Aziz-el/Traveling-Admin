import React, { useState } from 'react'
import { ApplicationType } from '../../model/types'
import { Check, X, RotateCcw } from 'lucide-react'

interface ApplicationCardProps {
  application: ApplicationType
  onChangeStatus?: (
    id: number,
    status: 'подтвержден' | 'отклонен' | 'ожидает'
  ) => void
}

export default function ApplicationCard({ application, onChangeStatus }: ApplicationCardProps) {
  const [status, setStatus] = useState<ApplicationType['status']>(application.status)

  const handleApprove = () => {
    setStatus('подтвержден')
    onChangeStatus?.(application.id, 'подтвержден')
  }

  const handleReject = () => {
    setStatus('отклонен')
    onChangeStatus?.(application.id, 'отклонен')
  }

  const handleBack = () => {
    setStatus('ожидает')
    onChangeStatus?.(application.id, 'ожидает')
  }

  return (
    <div
      className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-md border overflow-hidden transition-all duration-300
        ${status === 'подтвержден'
          ? 'border-green-500 ring-2 ring-green-100 dark:ring-green-900'
          : status === 'отклонен'
          ? 'border-red-500 ring-2 ring-red-100 dark:ring-red-900'
          : status === 'ожидает'
          ? 'border-yellow-500 ring-2 ring-yellow-100 dark:ring-yellow-900'
          : 'border-gray-200 dark:border-gray-800'}`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {application.sender}
          </h3>

          {status !== 'ожидает' && (
            <span
              className={`px-2.5 py-1 text-xs font-semibold rounded-full
                ${status === 'подтвержден'
                  ? 'bg-green-500 text-white'
                  : status === 'отклонен'
                  ? 'bg-red-500 text-white'
                  : 'bg-yellow-500 text-white'}`}
            >
              {status}
            </span>
          )}
        </div>

        {status === 'ожидает' ? (
          <div className="flex flex-col gap-2">
            <button
              onClick={handleApprove}
              className="flex items-center justify-center gap-2 px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              <Check className="w-4 h-4" />
              Подтвердить
            </button>

            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 px-3 py-2 text-yellow-700 bg-yellow-200 rounded-lg hover:bg-yellow-300 dark:bg-yellow-950 dark:text-yellow-400"
            >
              <RotateCcw className="w-4 h-4" />
              На доработку
            </button>

            <button
              onClick={handleReject}
              className="flex items-center justify-center gap-2 px-3 py-2 text-red-600 bg-red-200 rounded-lg hover:bg-red-300 dark:bg-red-950 dark:text-red-400"
            >
              <X className="w-4 h-4" />
              Отклонить
            </button>
          </div>
        ) : (
          <div
            className={`flex items-center gap-2 py-3 px-4 rounded-lg
              ${status === 'подтвержден'
                ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900'
                : status === 'отклонен'
                ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900'
                : 'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900'}`}
          >
            {status === 'подтвержден' && <Check className="w-5 h-5 text-green-600" />}
            {status === 'отклонен' && <X className="w-5 h-5 text-red-600" />}
            {status === 'ожидает' && <RotateCcw className="w-5 h-5 text-yellow-600" />}

            <span
              className={`text-base font-semibold
                ${status === 'подтвержден'
                  ? 'text-green-700'
                  : status === 'отклонен'
                  ? 'text-red-700'
                  : 'text-yellow-700'}`}
            >
              {status === 'подтвержден'
                ? 'Подтверждено'
                : status === 'отклонен'
                ? 'Отклонено'
                : 'ожидает'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
