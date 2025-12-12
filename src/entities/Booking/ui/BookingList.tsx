import { useEffect, useState } from 'react';
import { ImageWithFallback } from '../../../shared/ui/ImageWithFallback';
import { Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Booking as BookingType } from '../model/type';

type Props = {
  bookings: BookingType[];
  toursMap: Record<string, any>;
  onEdit?: (booking: BookingType) => void;
  onDelete?: (id: string | number) => void;
};

export const BookingList: React.FC<Props> = ({ bookings, toursMap, onEdit, onDelete }) => {
  const [menuState, setMenuState] = useState<{ x: number; y: number; booking: BookingType } | null>(null);

  useEffect(() => {
    const handleClick = () => setMenuState(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
      {bookings.map((booking) => {
        const tourId = String((booking as any).tour_id ?? (booking as any).tourId ?? '');
        const tour = toursMap[tourId] ?? {};

        return (
          <div
            key={booking.id}
            onContextMenu={(e) => { e.preventDefault(); setMenuState({ x: e.clientX, y: e.clientY, booking }); }}
            className="flex gap-4 p-4 transition-all border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 hover:shadow-md group dark:border-gray-700"
          >
            <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg shadow-md">
              <ImageWithFallback
                src={tour.image ?? tour.image_url ?? ''}
                alt={tour.name ?? tour.title ?? 'Tour'}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-gray-900 truncate dark:text-white">{tour.name ?? tour.title ?? 'N/A'}</h3>
                </div>
                <span className="ml-4 text-gray-900 dark:text-white">${(tour?.price ?? (booking as any).amount ?? 0)} </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-1 text-blue-600 rounded-full bg-blue-50 dark:bg-blue-950 dark:text-blue-400">
                  {tour.company_id ?? 'N/A'}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                  (booking as any).status === 'Подтверждено'
                    ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                    : (booking as any).status === 'В ожидании'
                    ? 'bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400'
                    : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                }`}>
                  {(booking as any).status === 'Подтверждено' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {(booking as any).status === 'В ожидании' && <Clock className="w-3 h-3 mr-1" />}
                  {(booking as any).status === 'Отменено' && <XCircle className="w-3 h-3 mr-1" />}
                  {(booking as any).status ?? 'В ожидании'}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                  (booking as any).payment_status === 'Оплачено' || (booking as any).paymentStatus === 'Оплачено'
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
                }`}>
                  <DollarSign className="w-3 h-3 mr-1" />
                  {(booking as any).payment_status ?? (booking as any).paymentStatus ?? 'Ожидает оплаты'}
                </span>
              </div>

              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(booking.date).toLocaleString('ru-RU')}</span>
                </div>
                <span>•</span>
                <span>{(booking as any).participants_count ?? (booking as any).guests ?? 1} гост{((booking as any).participants_count ?? (booking as any).guests ?? 1) === 1 ? 'ь' : 'я'}</span>
                <span>•</span>
                <span className="truncate">{(booking as any).email ?? ''}</span>
              </div>
            </div>
          </div>
        );
      })}

      {menuState && (
        <div style={{ position: 'fixed', left: menuState.x, top: menuState.y, zIndex: 2000 }} className="bg-white rounded shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuState(null); onEdit?.(menuState.booking); }}
            className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
          >Изменить</button>
          <button
            onClick={(e) => { e.stopPropagation(); setMenuState(null); onDelete?.((menuState.booking as any).id); }}
            className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
          >Удалить</button>
        </div>
      )}
    </div>
  );
};

export default BookingList;
