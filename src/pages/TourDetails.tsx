import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { MapPin, Star, Users, Clock, DollarSign, CheckCircle, Book } from 'lucide-react';
import ConfirmModal from '../shared/ui/ConfirmModal';
import { BookingFormModal } from '../features/Booking/ui/BookingFormModal';
import { useCustomSearchParams } from '../shared/hooks/useCustomSearchParams';
import { TourType } from '../entities/Tour/model/type';

export default function TourDetails() {
  let toursStore = useTourStore();
  let tours = toursStore.tours;
  let [tour,setTour] = useState({} as TourType)
  const { id} = useParams();

  const navigate = useNavigate();
  console.log(tours);
  
 useEffect(()=>{
   toursStore.getTourById(id ? id : 0).then(el=>{
    setTour(el.data)
  }
  )
 },[])

  const [createOpen, setCreateOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);


  if (!tour) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-medium">Тур не найден</h2>
        <button onClick={() => navigate('/tours')} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded">
          Назад к турам
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 dark:bg-gray-950 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-md group">
              <ImageWithFallback src={tour.image_url} alt={tour.title} className="w-full h-64 sm:h-80 object-cover transform-gpu group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute -bottom-16 left-0 right-0 h-28 bg-gradient-to-t from-black/60 opacity-40 blur-2xl pointer-events-none" />
              <div className="absolute left-4 bottom-4 right-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold" style={{ textShadow: '0 6px 18px rgba(0,0,0,0.6)' }}>{tour.title}</h1>
                    <div className="mt-3 flex items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">{tour.is_active ? <CheckCircle className="w-4 h-4 text-green-400" /> : <CheckCircle className="w-4 h-4 text-red-400" />}{tour.is_active ? 'Активен' : 'Неактивен'}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/10"><Star className="w-4 h-4 text-yellow-300" /> <strong className="ml-1">{tour.rating?.toFixed(1) ?? '-'}</strong></span>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/10"><MapPin className="w-4 h-4" /> <span className="ml-1">{tour.location}</span></span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-white/80">Цена</div>
                      <div className="text-2xl font-bold">${tour.price}</div>
                    </div>
                    <button onClick={() => setCreateOpen(true)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white">Забронировать</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold dark:text-white mb-3">Описание тура</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{(tour.description || '').length > 400 && !descriptionExpanded ? ((tour.description || '').slice(0, 400) + '...') : (tour.description || '')}</p>
              {(tour.description || '').length > 400 && (
                <div className="mt-3">
                  <button className="text-sm text-blue-600 hover:underline" onClick={() => setDescriptionExpanded(!descriptionExpanded)}>{descriptionExpanded ? 'Свернуть' : 'Читать полностью'}</button>
                </div>
              )}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Длительность</div>
                    <div className="text-sm text-gray-900 dark:text-white">{tour.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Мест</div>
                    <div className="text-sm text-gray-900 dark:text-white">{tour.capacity}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
                    <DollarSign className="w-4 h-4" />
                  </div>  
                  <div>
                    <div className="text-xs text-gray-500">Цена</div>
                    <div className="text-sm text-gray-900 dark:text-white">${tour.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Локация</div>
                    <div className="text-sm text-gray-900 dark:text-white">{tour.location}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-gray-500">Цена от</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">${tour.price}</div>
                </div>  
                <div className="text-right">
                  <div className="text-xs text-gray-500">Рейтинг</div>
                  <div className="flex items-center gap-1"> <Star className="w-4 h-4 text-yellow-400" /> <span className="font-medium text-gray-900 dark:text-white">{tour.rating?.toFixed(1) ?? '-'}</span></div>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" /> {tour.duration}
                <span>•</span>
                <Users className="w-4 h-4" /> {tour.capacity}
              </div>
              <button className="w-full mb-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold" onClick={() => setCreateOpen(true)}>Забронировать</button>
              <button className="w-full mb-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50">Посмотреть на карте</button>
              <div className="text-xs text-gray-500 text-center mt-3">Быстрое бронирование · Гарантия лучшей цены</div>
            </div>
          </aside>
        </div>
      </div>
      <BookingFormModal open={createOpen} onClose={() => { setCreateOpen(false); }} tours={tours} onSuccess={(m) => { setConfirmMsg(m ?? 'Бронирование успешно создано'); setConfirmOpen(true); }} />
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => { setConfirmOpen(false); navigate('/bookings'); }} />
    </>
  );
}
