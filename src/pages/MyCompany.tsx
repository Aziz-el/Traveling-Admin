import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useTourStore } from '../entities/Tour/model/useTourStore'
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull'
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore'
import TourCardSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardSkeleton'
import { Building2, Clock, Globe, MapPin } from 'lucide-react'
import CustomInput from '../shared/ui/input'
import { useDebounce } from '../shared/hooks/useDebounce'
import { useCustomSearchParams } from '../shared/hooks/useCustomSearchParams'
import checkAuth from '../features/Auth/model/services/checkAuth'
import { MyCompanyType } from '../entities/Companies/model/types'

export default function MyCompany() {
    const { getMyCompany,isLoading } = useCompaniesStore()
    let [search,setSearch] = useState("")
    let [company,setCompany] = useState<MyCompanyType>()
    useEffect(()=>{
        getMyCompany().then(el=>{
        setCompany(el)
    })
    },[])
    


  return (
    <div className="min-h-screen p-4 space-y-8 md:p-8 dark:bg-gray-950">
      <div className="relative overflow-hidden shadow-md rounded-xl max-md:mt-14">
        <div className="h-56 sm:h-72 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute text-white bottom-4 left-4 right-4">
          <h1 className="text-2xl font-semibold sm:text-3xl" style={{ textShadow: '0 6px 18px rgba(0,0,0,.6)' }}>
            {company?.name ?? <div className="w-64 h-6 border rounded-2xl bg-white/20 backdrop-blur-sm border-white/10" />}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-sm border-white/10">
              <Building2 className="w-4 h-4" /> Туроператор
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-sm border-white/10">
              <MapPin className="w-4 h-4" /> {company?.address ?? '...'}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-sm border-white/10">
              <Clock className="w-4 h-4" /> {company?.work_hours ?? '...'}
            </span>
            {company?.website && (
              <a href={company.website} target="_blank" className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10 backdrop-blur-sm border-white/10 hover:bg-white/20" onClick={e => e.stopPropagation()}>
                <Globe className="w-4 h-4" /> Сайт
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="mb-2 text-xl font-semibold dark:text-white sm:mb-0">Туры компании</h2>
        <CustomInput 
          value={search} 
          name='search' 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Поиск' 
          className='sm:max-w-[200px]' 
        />
      </div>

      {isLoading && (company?.tours?.length ?? 0) === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          {(company?.tours?.length ?? 0) > 0 || (isLoading) ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {company?.tours.map((pageTours, pageIndex) =>
                pageTours.map(tour => (
                  <TourCardFull
                    key={`${pageIndex}-${tour.id}`}
                    tour={tour}
                  />
                ))
              )}

              {(isLoading) && (company?.tours?.length ?? 0) > 0 &&
                Array.from({ length: 6 }).map((_, i) => (
                  <TourCardSkeleton key={`loading-${i}`} />
                ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              Пока что туров нет
            </div>
          )}
        </>
      )}
    </div>
  )
}