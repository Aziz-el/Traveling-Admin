import { Building2, DollarSign, Edit2, MapPin, Trash2, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Company, CompanyForm } from '../../model/types'
import { TourType } from '../../../Tour/model/type'
import { useCompaniesStore } from '../../model/useCompanyStore'
export default function CompanyCard({company,stats,setEditingId,setEditingCompany,setModalOpen}:{company:CompanyForm ,stats:{tours:TourType[],total:number,active:number,revenue:number,avgPrice:number},setEditingId:React.Dispatch<React.SetStateAction<number | null|undefined>>,setEditingCompany:React.Dispatch<React.SetStateAction<CompanyForm>>,setModalOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
    
    const {
        deleteCompany
      } = useCompaniesStore()
  const handleEdit = (company: CompanyForm ) => {
    setEditingId(company?.id)
    setEditingCompany(company)
    setModalOpen(true)
  }

  const handleDelete = (id: number|undefined, name: string) => {
    if (!confirm(`Удалить компанию "${name}"?`)) return
    deleteCompany(id ? id : 0)
  }
 
  return (
    <div key={company.id} className="bg-white border rounded-xl dark:bg-gray-900 dark:border-gray-800">
              <div className="flex justify-between p-6 border-b dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-xl dark:bg-gray-800">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-gray-900 dark:text-white">{company.name}</h2>
                    <p className="text-gray-500">Туроператор</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(company)} className='cursor-pointer'>
                    <Edit2 className="w-4 h-4 dark:text-white" />
                  </button>
                  <button onClick={() => handleDelete(company?.id,company.name)} className='cursor-pointer'>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 dark:text-white">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <p>{stats.total}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <p>{stats.active}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <p>${stats.revenue}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <p>${Math.round(stats.avgPrice)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {stats.tours.map(tour => (
                    <div key={tour.id} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                      <div>
                        <p className="text-gray-900 dark:text-white">{tour.title}</p>
                        <span>{tour.is_active}</span>
                      </div>
                      <span>${tour.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
  )
}
