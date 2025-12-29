
import ApplicationCard from '../entities/Applications/ui/ApplicationsCard/ApplicationCard'
import { ApplicationType } from '../entities/Applications/model/types'
import { useApplicationStore } from '../entities/Applications/model/useApplicationStore'
import { useEffect } from 'react'

export default function Applications() {
  let {applications,fetchApplications} = useApplicationStore()
  useEffect(()=>{
    fetchApplications()
  },[])
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
        {applications.map(el => (
          <ApplicationCard 
            key={el.id} 
            application={el as ApplicationType} 
          />
        ))}
      </div>
    </div>
  )
}