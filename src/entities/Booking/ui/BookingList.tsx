import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../../../shared/ui/ImageWithFallback';
import {
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Trash2,
} from 'lucide-react';
import { Booking as BookingType } from '../model/type';
import { optimizeImageUrl } from '../../../shared/utils/imageRenderingOptimizator';
import BookingSkeleton from '../../../shared/ui/skeletons/BookingSkeleton';

type Props = {
  bookings: BookingType[];
  toursMap: Record<string, any>;
  onEdit?: (booking: BookingType) => void;
  onDelete?: (id: string | number) => void;
  loading?: boolean;
};

const BookingList: React.FC<Props> = ({
  bookings,
  toursMap,
  onEdit,
  onDelete,
  loading,
}) => {
  const [menuState, setMenuState] = useState<{
    x: number;
    y: number;
    booking: BookingType;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => setMenuState(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4 max-h-[600px] overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookingSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-h-full overflow-y-auto">
      {bookings.map((booking) => {
        const tourId = String(
          (booking as any).tour_id ?? (booking as any).tourId ?? ''
        );
        const tour = toursMap[tourId] ?? {};

        const imageSrc =
          optimizeImageUrl(tour.image_url ?? tour.image, 800, 300) ?? '';

        const bookingDate = booking.date
          ? new Date(booking.date).toLocaleString('ru-RU')
          : '—';

        return (
          <div
            key={booking.id}
            onContextMenu={(e) => {
              e.preventDefault();
              setMenuState({ x: e.clientX, y: e.clientY, booking });
            }}
            onClick={() => navigate(`/bookings/${booking.id}`)}
            role="group"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/bookings/${booking.id}`); } }}
            className="cursor-pointer flex flex-col md:flex-row gap-4 p-4 border border-gray-200 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md group dark:border-gray-700"
          >
            <div className="w-full h-40 md:w-24 md:h-24 overflow-hidden rounded-lg shadow-md flex-shrink-0">
              <ImageWithFallback
                src={imageSrc}
                alt={tour.name ?? tour.title ?? 'Tour'}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:justify-between mb-2 gap-2">
                <h3 className="text-gray-900 truncate dark:text-white">
                  {tour.name ?? tour.title ?? 'N/A'}
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-gray-900 dark:text-white">
                      {
                        (() => {
                          const pricePerGuest = Number(tour?.price ?? (booking as any).amount ?? 0);
                          const guestsCount = Number((booking as any).participants_count ?? (booking as any).guests ?? 1);
                          const totalPrice = pricePerGuest * (guestsCount || 1);
                          return (
                            <span className="text-gray-900 dark:text-white">
                              {totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </span>
                          );
                        })()
                      }
                  </span>

                  <button
                    onClick={(e) => { e.stopPropagation(); onEdit?.(booking); }}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Редактировать"
                  >
                    <Edit className="w-4 h-4 dark:text-gray-400" />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete?.(booking.id); }}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                    title="Удалить"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  {tour.company_id ?? 'N/A'}
                </span>

                <span className="px-2 py-1 rounded-full flex items-center gap-1 dark:bg-gray-700 bg-gray-200 text-gray-800 dark:text-gray-300">
                  {(booking as any).status === 'Подтверждено' && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                  {(booking as any).status === 'В ожидании' && (
                    <Clock className="w-3 h-3" />
                  )}
                  {(booking as any).status === 'Отменено' && (
                    <XCircle className="w-3 h-3" />
                  )}
                  {(booking as any).status ?? 'В ожидании'}
                </span>

                <span className="px-2 py-1 rounded-full flex items-center gap-1 dark:bg-gray-700 bg-gray-200 text-gray-800 dark:text-gray-300">
                  <DollarSign className="w-3 h-3" />
                  {(booking as any).payment_status ??
                    (booking as any).paymentStatus ??
                    'Ожидает оплаты'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{bookingDate}</span>
                <span>•</span>
                <span>
                  {(booking as any).participants_count ??
                    (booking as any).guests ??
                    1}{' '}
                  гостей
                </span>
                <span>•</span>
                <span className="truncate">
                  {(booking as any).email ?? ''}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingList;
