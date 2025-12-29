import React, { useState } from 'react'
import { ApplicationType } from '../../model/types'
import { Check, X, Clock, Trash2 } from 'lucide-react'
import useAuthStore from '../../../../features/Auth/model/services/checkAuth'
import { useApplicationStore } from '../../model/useApplicationStore'

interface Props {
  application: ApplicationType
  onRejectClick?: (app: ApplicationType) => void
}

export default function ApplicationCard({ application, onRejectClick }: Props) {
  const { role } = useAuthStore()
  const { approveApplication, deleteApplication } = useApplicationStore()
  const [status, setStatus] = useState<ApplicationType['status']>(application.status)

  const isAdmin = role === 'admin'
  const isClient = role === 'client'

  const approve = () => {
    setStatus('approved')
    approveApplication(application.id)
  }

  const remove = () => {
    deleteApplication(application.id)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5  transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words">
          {application.company_name}
        </h3>

        {(isClient || status !== 'pending') && (
          <button
            onClick={remove}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="mt-3">
        {status === 'pending' && (
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-sm sm:text-base">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            Ожидает
          </div>
        )}

        {status === 'approved' && (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm sm:text-base">
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            Подтверждено
          </div>
        )}

        {status === 'rejected' && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm sm:text-base">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            Отклонено
          </div>
        )}
      </div>

      {isAdmin && status === 'pending' && (
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={approve}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-[14px] bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            Подтвердить
          </button>

          <button
            onClick={() => onRejectClick?.(application)}
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-[14px] bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Отклонить
          </button>
        </div>
      )}
    </div>
  )
}
