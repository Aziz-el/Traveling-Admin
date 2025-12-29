import { useEffect, useState } from 'react'
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore'
import { useTourStore } from '../entities/Tour/model/useTourStore'
import { Plus } from 'lucide-react'
import CompanyModal from '../entities/Companies/ui/CompanyModalForms/CompanyModal'
import ConfirmModal from '../shared/ui/ConfirmModal';
import CompanyCard from '../entities/Companies/ui/CompanyCards/CompanyCard'
import { CompanyCardSkeleton } from '../entities/Companies/ui/CompanyCards/CompanySkeletonCard'
import { CompanyForm } from '../entities/Companies/model/types'
import { useApplicationStore } from '../entities/Applications/model/useApplicationStore'

export function Companies() {
  const tours = useTourStore(state => state.tours)
  const { companies, fetchCompanies, updateCompany, isLoading } = useCompaniesStore()
  const {createApplication} = useApplicationStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null | undefined>(null)
  const [editingCompany, setEditingCompany] = useState<CompanyForm>({
    company_name: '',
    company_address: '',
    work_hours: '',
    company_website: ''
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  const getCompanyStats = (companyId: number) => {
    const companyTours = tours.filter(t => t.company_id === companyId)
    const activeTours = companyTours.filter(t => t.is_active)
    const revenue = companyTours.reduce((s, t) => s + t.price, 0)
    const avgPrice = companyTours.length ? revenue / companyTours.length : 0

    return {
      total: companyTours.length,
      active: activeTours.length,
      revenue,
      avgPrice,
      tours: companyTours
    }
  }

  const handleAdd = () => {
    setEditingId(null)
    setEditingCompany({ company_name: '', company_address: '', work_hours: '', company_website: '' })
    setModalOpen(true)
  }

  const handleSave = async (data: CompanyForm) => {
    if (editingId !== null) {
      await updateCompany(editingId, data)
    } else {
      await createApplication(data)
    }
    setModalOpen(false)
    setConfirmMsg(editingId !== null ? 'Компания обновлена' : 'Компания создана')
    setConfirmOpen(true)
  }

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState('')

  return (
    <div className="min-h-screen p-6 sm:p-8 dark:bg-gray-950">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div className="w-full sm:w-auto mt-6 sm:mb-0">
          <h1 className="mb-1 text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Компании</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Туроператоры и их статистика</p>
        </div>
        <button onClick={handleAdd} className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 mt-4 text-sm text-white bg-blue-600 rounded-md sm:w-auto sm:mt-0 sm:px-4 sm:py-2 sm:text-base sm:rounded-lg">
          <Plus className="w-4 h-4" />
          Добавить компанию
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <CompanyCardSkeleton key={i} />)
          : companies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                stats={getCompanyStats(company.id)}
                setEditingId={setEditingId}
                setEditingCompany={setEditingCompany}
                setModalOpen={setModalOpen}
              />
            ))
        }
      </div>
      {
        !isLoading && companies.length ===0 && <div className="relative flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
  <h1 className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center px-4">
    Пока что пусто
  </h1>
</div>

      }
      <CompanyModal
        open={modalOpen}
        initialData={editingCompany}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => setConfirmOpen(false)} />
    </div>
  )
}
