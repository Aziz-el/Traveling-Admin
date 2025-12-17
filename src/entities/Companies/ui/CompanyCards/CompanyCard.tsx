
import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";
import { useState } from "react"
import { useToast } from "../../../../shared/ui/Toast"
import { useCompaniesStore } from "../../model/useCompanyStore"
import { Building2, Edit2, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router";
export default function CompanyCard({
  company,
  stats,
  setEditingId,
  setEditingCompany,
  setModalOpen
}: any) {
  const { deleteCompany } = useCompaniesStore()
  const { showToast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  let navigate = useNavigate()
  return (
    <div className="p-5 transition-shadow bg-white border cursor-pointer dark:bg-gray-900 dark:border-gray-800 rounded-xl hover:shadow-md" onClick={(e)=>navigate(`${company.id}/tours/`)}>
      
      <div className="flex items-center justify-between" >
        <div className="flex items-center min-w-0 gap-3">
          <div className="p-3 bg-blue-50 dark:bg-gray-800 rounded-xl">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate dark:text-white">
              {company.name}
            </h3>
            <span className="text-sm text-gray-500">
              Туроператор
            </span>
          </div>
        </div>

        <div className="flex gap-2" onClick={(e)=>e.stopPropagation()}>
          <button
            onClick={() => {
              setEditingId(company.id)
              setEditingCompany(company)
              setModalOpen(true)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit2 className="w-4 h-4 dark:text-white " />
          </button>

          <button
            onClick={() => setDialogOpen(true)}
            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4" >
        <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Туров</p>
          <p className="font-semibold dark:text-white">{stats.total}</p>
        </div>

        <div className="p-3 text-center rounded-lg bg-gray-50 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Активные</p>
          <p className="font-semibold text-green-600">
            {stats.active}
          </p>
        </div>
      </div>

      <ConfirmDialog
        open={dialogOpen}
        title="Удалить компанию?"
        message={`Компания "${company.name}" будет удалена`}
        onCancel={() => setDialogOpen(false)}
        onConfirm={async () => {
          try {
            await deleteCompany(company.id)
          } catch {
            showToast('Ошибка удаления', 'error')
          } finally {
            setDialogOpen(false)
          }
        }}
      />
    </div>
  )
}
