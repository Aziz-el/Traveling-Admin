import React from 'react'
import applications from "../entities/Applications/model/fakeData.json"
import ApplicationCard from '../entities/Applications/ui/ApplicationsCard/ApplicationCard'
import { ApplicationType } from '../entities/Applications/model/types'
export default function Applications() {
  return (
    <div className="p-full 6 h- sm:p-8 dark:bg-gray-950">
      <div className="flex flex-col justify-between mb-8 sm:flex-row sm:items-center">
        <div className="w-full sm:w-auto">
          <h1 className="mb-1 text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white">Заявки</h1>
          <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Приняти или отклонения заявок на становления компанией </p>
        </div>
    </div>
    <div className="grid body grid-cols-4 gap-4" >
      {
        applications.applications.map(el=><ApplicationCard application={el as ApplicationType} />)
      }
    </div>
</div>
        
  )
}
