import { useEffect, useMemo, useRef, useState } from 'react'
import { Building2, Clock, Globe, MapPin } from 'lucide-react'
import CustomInput from '../shared/ui/input'
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull'
import TourCardSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardSkeleton'
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore'
import { MyCompanyType } from '../entities/Companies/model/types'

const PAGE_SIZE = 12

export default function MyCompany() {
  const { getMyCompany, isLoading } = useCompaniesStore()

  const [company, setCompany] = useState<MyCompanyType | null>(null)
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMyCompany().then(setCompany)
  }, [])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [search])

  const filteredTours = useMemo(() => {
    if (!company) return []

    if (!search.trim()) return company.tours

    return company.tours.filter(t =>
      t.title?.toLowerCase().includes(search.toLowerCase())
    )
  }, [company, search])

  const visibleTours = filteredTours.slice(0, visibleCount)

  useEffect(() => {
    if (!bottomRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          visibleCount < filteredTours.length
        ) {
          setVisibleCount(v => v + PAGE_SIZE)
        }
      },
      { rootMargin: '600px' }
    )

    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [visibleCount, filteredTours.length])

  return (
    <div className="min-h-screen p-4 space-y-8 md:p-8 dark:bg-gray-950">
      <div className="relative overflow-hidden shadow-md rounded-xl max-md:mt-14">
        <div className="h-56 sm:h-72 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute text-white bottom-4 left-4 right-4">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {company?.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10">
              <Building2 className="w-4 h-4" /> Туроператор
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10">
              <MapPin className="w-4 h-4" /> {company?.address}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10">
              <Clock className="w-4 h-4" /> {company?.work_hours}
            </span>
            {company?.website && (
              <a
                href={company.website}
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-1 border rounded-full bg-white/10"
              >
                <Globe className="w-4 h-4" /> Сайт
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold dark:text-white">
          Туры компании ({company?.tours_count ?? 0})
        </h2>
        
      </div>

      {isLoading && !company ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      ) : visibleTours.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleTours.map(tour => (
            <TourCardFull key={tour.id} tour={tour} />
          ))}

          {visibleCount < filteredTours.length &&
            Array.from({ length: 3 }).map((_, i) => (
              <TourCardSkeleton key={`loading-${i}`} />
            ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">
          Ничего не найдено
        </div>
      )}

      <div ref={bottomRef} className="h-6" />
    </div>
  )
}
