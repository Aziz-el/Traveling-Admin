import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useBookingStore } from '../entities/Booking/model/useBookingStore';
import { Calendar, DollarSign, Users } from 'lucide-react';
import BookingDetailsSkeleton from '../shared/ui/skeletons/BookingDetailsSkeleton';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { optimizeImageUrl } from '../shared/utils/imageRenderingOptimizator';

export default function BookingDetails() {
  const toursStore = useTourStore();
  const tours = toursStore.tours;

  const { id } = useParams();
  const navigate = useNavigate();
  const bookingStore = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any | null>(null);

  const tour = tours.find(t => String(t.id) === String(booking?.tour_id));

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const existing = bookingStore.bookings.find(b => String(b.id) === String(id));
      if (existing) {
        setBooking(existing);
        setLoading(false);
        return;
      }
      const fetched = await bookingStore.fetchBooking(Number(id));
      setBooking(fetched ?? null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <BookingDetailsSkeleton />;
  if (!booking) return <div className="p-6">Бронирование не найдено</div>;

  const guests = Number(booking.participants_count ?? booking.guests ?? 1);
  const tourPrice = Number(tour?.price ?? 0);
  const totalAmount = tourPrice * guests;

  return (
    <div className="min-h-[697px] p-6 overflow-x-hidden">
      <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Детали бронирования
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            ID: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{booking.id}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={() => navigate(-1)} className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm w-full sm:w-auto">
            Назад
          </button>
          <Link to="/bookings" className="px-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-center w-full sm:w-auto">
            Все бронирования
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-56 h-40 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                {tour?.image_url || booking.tour?.image_url ? (
                  <img
                    src={optimizeImageUrl(tour?.image_url ?? booking.tour?.image_url, 800)}
                    alt={tour?.title ?? booking.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white truncate">{tour?.title}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 break-words">{tour?.description ?? 'Нет дополнительных заметок'}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <InfoCard label="Дата и время" icon={<Calendar className="w-4 h-4 text-gray-500" />} value={booking.date ? new Date(booking.date).toLocaleString('ru-RU') : '—'} />
                  <InfoCard label="Гости" icon={<Users className="w-4 h-4 text-gray-500" />} value={guests} />
                  <InfoCard label="Сумма" icon={<DollarSign className="w-4 h-4 text-gray-500" />} value={totalAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})} />
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Дополнительная информация</h3>
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div><span className="font-semibold">Статус:</span> {booking.status}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-800 rounded-2xl p-6 shadow-lg border border-green-200 dark:border-green-800">
            <h4 className="text-sm font-medium text-green-800 dark:text-green-200">Контакты</h4>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">{booking.user_id ?? booking.name ?? '—'}</p>
            <p className="text-sm text-gray-600 dark:text-gray-200">{booking.status ?? '—'}</p>
            <p className="text-sm text-gray-600 dark:text-gray-200">{booking.created_at ?? '—'}</p>

            {booking.tour_id && (
              <Link to={`/tours/${booking.tour_id}`} className="mt-4 inline-block w-full text-center px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-blue-600 dark:text-blue-300">
                Перейти к туру
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoCard({ label, icon, value }: any) {
  return (
    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-1 font-medium text-gray-900 dark:text-white flex items-center gap-2">
        {icon}
        {value}
      </div>
    </div>
  );
}
