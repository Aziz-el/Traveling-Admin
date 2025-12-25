import { useEffect, useRef, useState } from 'react'
import { TourProps, TourType } from '../entities/Tour/model/type'
import TourCardFull from '../entities/Tour/UI/TourCards/TourCardFull'
import { useTourStore } from '../entities/Tour/model/useTourStore'
import TourCardSkeleton from '../entities/Tour/UI/TourSkeletons/TourCardSkeleton'
import { useDebounce } from '../shared/hooks/useDebounce'
import CustomInput from '../shared/ui/input'
import { useCustomSearchParams } from '../shared/hooks/useCustomSearchParams'
export function ToursList({ onSelectTour, selectedTourId }: TourProps) {
  const toursStore = useTourStore()
  const { loading } = toursStore
  const { update } = useCustomSearchParams()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [allTours, setAllTours] = useState<TourType[][]>([])
  const [isFetching, setIsFetching] = useState(false)

  const debouncedQuery = useDebounce(search, 800)
  const bottomRef = useRef<HTMLDivElement>(null)  
  useEffect(() => {
    setPage(1)
    setAllTours([])
  }, [debouncedQuery])
  console.log(page);
  
  useEffect(() => {
    setIsFetching(true)
    update('search', debouncedQuery)
    if(page != 0){
       toursStore
      .fetchTours({ search: debouncedQuery, page, per_page: 12 })
      .then(() => {
        setAllTours(prev =>
          page === 1
            ? [toursStore.tours]
            : [...prev, toursStore.tours]
        )
      })
      .finally(() => setIsFetching(false))
    }
  }, [debouncedQuery, page])

  useEffect(() => {
    if (!bottomRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !loading &&
          !isFetching &&
          toursStore.tours.length > 0
        ) {
          setTimeout(()=>{
            setPage(prev => prev + 1)
          },100)
        }
      },
      { 
        threshold: 0,
        rootMargin: '600px' 
      }
    )

    observer.observe(bottomRef.current)
    return () => observer.disconnect()
  }, [loading, isFetching, toursStore.tours.length])

  const [editingTour, setEditingTour] = useState<TourType | null>(null)
  const [formData, setFormData] = useState<TourType | null>(null)

  return (
    <div className="h-full p-8 dark:bg-gray-950">
      <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between max-lg:mt-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Туры
          </h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
            Управление всеми турами
          </p>
        </div>

        <div>
          <CustomInput
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск"
          />
        </div>
        </div>

      {loading && allTours.length === 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allTours.map((pageTours, pageIndex) =>
            pageTours.map(tour => (
              <TourCardFull
                key={`${pageIndex}-${tour.id}`}
                tour={tour}
                setFormData={setFormData}
                setEditingTour={setEditingTour}
                onSelectTour={onSelectTour}
                selectedTourId={selectedTourId}
              />
            ))
          )}

          {(loading || isFetching) && allTours.length > 0 &&
            Array.from({ length: 8 }).map((_, i) => (
              <TourCardSkeleton key={`loading-${i}`} />
            ))}
        </div>
      )}

      <div ref={bottomRef} className="h-4 mt-12" />
    </div>
  )
}