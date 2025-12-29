import ApplicationCard from '../entities/Applications/ui/ApplicationsCard/ApplicationCard'
import { ApplicationType } from '../entities/Applications/model/types'
import { useApplicationStore } from '../entities/Applications/model/useApplicationStore'
import { useEffect, useState } from 'react'
import ApplicationCardSkeleton from '../entities/Applications/ui/ApplicationsCard/ApplicationSkeletonCard'
import { X } from 'lucide-react'

export default function Applications() {
  const { applications, fetchApplications, loading,rejectApplication } = useApplicationStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const openRejectModal = (app: ApplicationType) => {
    setSelectedApp(app)
    setRejectReason('')
    setModalOpen(true)
  }

  const reject = () => {
    if (!selectedApp || !rejectReason.trim()) return
    rejectApplication(selectedApp.id, rejectReason)
    console.log('Reject:', selectedApp.id, rejectReason)
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 dark:bg-gray-950">
      <div className="flex flex-col justify-between mb-6 sm:mb-8 max-md:mt-14">
        <div className="w-full">
          <h1 className="mb-1 text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
            Заявки
          </h1>
          <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Принятие или отклонение заявок на становление компанией
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5 md:gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ApplicationCardSkeleton key={i} />
            ))
          : applications.map(el => (
              <ApplicationCard
                key={el.id}
                application={el as ApplicationType}
                onRejectClick={openRejectModal} 
              />
            ))}
      </div>

      {applications.length === 0 && !loading && (
        <div className="relative flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
          <h1 className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center px-4">
            Пока что пусто
          </h1>
        </div>
      )}

      {/* Модальное окно централизованное */}
      {modalOpen && selectedApp && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Причина отказа
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full h-24 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите причину отказа..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Отмена
              </button>
              <button
                onClick={reject}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
