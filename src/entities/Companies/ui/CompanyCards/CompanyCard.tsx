import { Building2, DollarSign, Edit2, MapPin, Trash2, TrendingUp } from "lucide-react";
import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";
import ConfirmModal from "../../../../shared/ui/ConfirmModal";
import { CompanyForm } from "../../model/types";
import { TourType } from "../../../Tour/model/type";
import { useCompaniesStore } from "../../model/useCompanyStore";
import { useToast } from "../../../../shared/ui/Toast";
import { useState } from "react";

export default function CompanyCard({ company, stats, setEditingId, setEditingCompany, setModalOpen }: {
  company: CompanyForm,
  stats: { tours: TourType[], total: number, active: number, revenue: number, avgPrice: number },
  setEditingId: React.Dispatch<React.SetStateAction<number | null | undefined>>,
  setEditingCompany: React.Dispatch<React.SetStateAction<CompanyForm>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { deleteCompany } = useCompaniesStore()
  const { showToast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')

  // display name limited to 15 chars with ellipsis for small screens
  const displayName = company?.name ? (company.name.length > 15 ? company.name.slice(0, 15) + '…' : company.name) : ''
  const nameTooLong = company?.name ? company.name.length > 15 : false

  const handleEdit = (company: CompanyForm) => {
    setEditingId(company.id)
    setEditingCompany(company)
    setModalOpen(true)
  }

  const handleDelete = (id: number | undefined, name: string) => {
    setDialogOpen(true)
  }

  return (
    <div className="bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b dark:border-gray-800">
        <div className="flex items-start sm:items-center gap-4 w-full">
          <div className="p-3 bg-gray-100 rounded-xl dark:bg-gray-800 flex-shrink-0">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="min-w-0">
            <h2
              title={company.name}
              aria-label={company.name}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white truncate"
            >
              {displayName}
            </h2>
            <p className="text-sm text-gray-500 truncate">Туроператор</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button type="button" onClick={() => handleEdit(company)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" title="Редактировать" aria-label="Редактировать компанию">
            <Edit2 className="w-3 h-3 dark:text-white" />
          </button>
          <button type="button" onClick={() => handleDelete(company?.id, company.name)} className="p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900" title="Удалить" aria-label="Удалить компанию">
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 dark:text-white">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-500">Туров</span>
            </div>
            <p className="font-medium">{stats.total}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">Активные</span>
            </div>
            <p className="font-medium">{stats.active}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-500">Выручка</span>
            </div>
            <p className="font-medium">${stats.revenue}</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-500">Средний чек</span>
            </div>
            <p className="font-medium">${Math.round(stats.avgPrice)}</p>
          </div>
        </div>

        <div className="space-y-2">
          {stats.tours.map(tour => (
            <div key={tour.id} className="flex flex-col sm:flex-row justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              <div>
                <p className="text-gray-900 dark:text-white truncate">{tour.title}</p>
                <span className="text-sm text-gray-500">{tour.is_active ? 'Активен' : 'Неактивен'}</span>
              </div>
              <span className="mt-2 sm:mt-0">${tour.price}</span>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        title="Подтвердите удаление"
        message={`Вы уверены, что хотите удалить компанию "${company.name}"?`}
        onCancel={() => setDialogOpen(false)}
        onConfirm={async () => {
          try {
            if (company.id != null) await deleteCompany(company.id)
            setConfirmMsg('Компания удалена')
            setConfirmOpen(true)
          } catch (err) {
            console.error('Delete company failed', err)
            showToast('Не удалось удалить компанию', 'error')
          } finally {
            setDialogOpen(false)
          }
        }}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Готово"
        message={confirmMsg}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}
