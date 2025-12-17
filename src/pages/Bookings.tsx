import { useState, useEffect } from 'react';
import {DollarSign, CheckCircle, Clock, CheckCircle2, TrendingUp, XCircle } from 'lucide-react';
import { useCompaniesStore } from '../entities/Companies/model/useCompanyStore';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { useTourStore } from '../entities/Tour/model/useTourStore';

import { useBookingStore } from '../entities/Booking/model/useBookingStore';
import BookingList from '../entities/Booking/ui/BookingList';
import BookingFormModal from '../features/Booking/ui/BookingFormModal';
import BookingEditModal from '../features/Booking/ui/BookingEditModal';
import ConfirmModal from '../shared/ui/ConfirmModal';
import ConfirmDialog from '../shared/ui/ConfirmDialog';
import { useToast } from '../shared/ui/Toast';
import { optimizeImageUrl } from '../shared/utils/imageRenderingOptimizator';
import { useNavigate } from 'react-router';


export function Bookings() {
  const tours = useTourStore().tours;
  const { companies } = useCompaniesStore();
  const bookingStore = useBookingStore();
  const [loadingBookings, setLoadingBookings] = useState(true);
  const bookingsRaw = bookingStore.bookings; 
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      setLoadingBookings(true);
      try {
        await bookingStore.fetchBookings();
      } finally {
        setLoadingBookings(false);
      }
    })();
  }, []);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  const { showToast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const [newBooking, setNewBooking] = useState<any>({
    tourId: tours[0]?.id ?? '',
    date: '',
    status: 'В ожидании',
    paymentStatus: 'Ожидает оплаты',
    amount: 0,
    guests: 1,
  });

  const bookings = bookingsRaw.map(b => ({
    id: String(b.id),
    tourId: String((b as any).tour_id ?? (b as any).tourId ?? ''),
    title: (b as any).title ?? '',
    image_url: (b as any).image_url ?? '',
    date: b.date,
    status: (b as any).status ? String((b as any).status) : 'В ожидании',
    paymentStatus: (b as any).payment_status ?? 'Ожидает оплаты',
    amount: (b as any).amount ?? 0,
    guests: (b as any).participants_count ?? (b as any).guests ?? 1,
  }));

  const toursMap: Record<string, any> = {};
  tours.forEach(t => { toursMap[String(t.id)] = t; });

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBooking((prev: any) => ({ ...prev, [name]: name === 'amount' || name === 'guests' ? Number(value) : value }));
  };

  const handleNavigateToTour = (tourId: string) => {
    const tour = tours.find(t => String(t.id) === String(tourId));
    if (tour) {
      navigate(`/tours/${tour.id}`);
    }
  };



  const handleCreateSave = async () => {
    if (!newBooking.tourId || !newBooking.date) {
      showToast('Пожалуйста, заполните обязательные поля: тур и дата', 'error');
      return;
    }

    try {
      await bookingStore.addBooking({
        tour_id: Number(newBooking.tourId),
        participants_count: Number(newBooking.guests || 1),
        date: newBooking.date,
      });
      setCreateOpen(false);
      setConfirmMsg('Бронирование успешно создано');
      setConfirmOpen(true);
    } catch (err) {
      console.debug('Create booking failed', err);
      showToast('Не удалось создать бронирование', 'error');
    }
  };

  const getTourById = (id: string) => {
    return tours.find(t => String(t.id) === String(id));
  };

const totalBookings = bookings.length;

const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
const pendingCount = bookings.filter(b => b.status === 'pending').length;
const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

const totalGuests = bookings.reduce(
  (sum, b) => sum + Number(b.guests || 0),
  0
);

const totalRevenue = bookings
  .filter(b => b.status === 'confirmed')
  .reduce((sum, b) => sum + Number(b.amount || 0), 0);

const averageCheck =
  confirmedCount > 0
    ? Math.round(totalRevenue / confirmedCount)
    : 0;

const conversionRate =
  totalBookings > 0
    ? Math.round((confirmedCount / totalBookings) * 100)
    : 0;


  return (
    <div className="min-h-screen p-8 dark:bg-gray-950">
       <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
      Бронирования
    </h1>
    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
     Управление бронированиями туров
    </p>
  </div>
</div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 transition-all border border-green-200 shadow-sm bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl dark:border-green-800 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">{confirmedCount}%</span>
          </div>
          <h3 className="mb-1 text-green-700 dark:text-green-300">Подтверждено</h3>
          <p className="text-green-900 dark:text-white">{confirmedCount}</p>
        </div>

        <div className="p-6 transition-all border border-yellow-200 shadow-sm bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl dark:border-yellow-800 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-yellow-600 dark:text-yellow-400">{pendingCount}%</span>
          </div>
          <h3 className="mb-1 text-yellow-700 dark:text-yellow-300">В ожидании</h3>
          <p className="text-yellow-900 dark:text-white">{pendingCount}</p>
        </div>

        <div className="p-6 transition-all border border-blue-200 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl dark:border-blue-800 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
              <XCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+8%</span>
          </div>
          <h3 className="mb-1 text-blue-700 dark:text-blue-300">Успешные бронирования</h3>
          <p className="text-blue-900 dark:text-white">{cancelledCount}</p>
        </div>

        <div className="p-6 transition-all border border-purple-200 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl dark:border-purple-800 hover:shadow-lg hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white shadow-sm dark:bg-gray-800 rounded-xl">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+15%</span>
          </div>
          <h3 className="mb-1 text-purple-700 dark:text-purple-300">Общая выручка</h3>
          <p className="text-purple-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <div className="bg-white h-full border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
            <div className="p-6 rounded-xl dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <h2 className="text-gray-900 dark:text-white">Все бронирования</h2>
              <p className="text-gray-600 dark:text-gray-400">Полный список бронирований</p>
            </div>
            <BookingList loading={loadingBookings} bookings={bookingsRaw} toursMap={toursMap} onEdit={(b: any)=>{ setEditingBooking(b); setEditOpen(true); }} onDelete={(id: any)=>{ setPendingDelete(Number(id)); setDialogOpen(true); }} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-end">
            <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Создать бронирование
            </button>
          </div>
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <h2 className="text-gray-900 dark:text-white">Статистика</h2>
              <p className="text-gray-600 dark:text-gray-400">Ключевые показатели</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-700 dark:text-blue-300">Всего бронирований</span>
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-blue-900 dark:text-white">{bookings.length}</p>
              </div>

              <div className="p-4 border border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-700 dark:text-green-300">Всего гостей</span>
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-900 dark:text-white">{totalGuests}</p>
              </div>

              <div className="p-4 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-700 dark:text-purple-300">Средний чек</span>
                  <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-purple-900 dark:text-white">
                  ${averageCheck.toLocaleString()}
                </p>
              </div>

              <div className="p-4 border border-orange-200 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-700 dark:text-orange-300">Коэффициент конверсии</span>
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-orange-900 dark:text-white">
                  {conversionRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <h2 className="text-gray-900 dark:text-white">Популярные туры</h2>
              <p className="text-gray-600 dark:text-gray-400">По числу бронирований</p>
            </div>
            
            <div className="p-6 space-y-3">
              {Array.from(new Set(bookings.map(b => b.tourId)))
                .map(tourId => ({
                  tour: getTourById(tourId),
                  count: bookings.filter(b => b.tourId === tourId).length,
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .map(({ tour, count }) => tour && (
                  <div key={tour.id} onClick={() => handleNavigateToTour(tour.id)} className="flex items-center gap-3 p-3 transition-colors cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750">
                    <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={optimizeImageUrl(tour.image_url, 300, 90) ?? ''}
                        alt={tour.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate dark:text-white">{tour.title}</p>
                      <p className="text-gray-600 dark:text-gray-400">{count} бронирований</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <BookingFormModal open={createOpen} onClose={() => { setCreateOpen(false); }} tours={tours} onSuccess={(m) => { setConfirmMsg(m ?? 'Бронирование успешно создано'); setConfirmOpen(true); }} />
      <BookingEditModal open={editOpen} booking={editingBooking} onClose={() => { setEditOpen(false); setEditingBooking(null); }} onSuccess={(m) => { setConfirmMsg(m ?? 'Бронирование обновлено'); setConfirmOpen(true); }} />
      <ConfirmDialog open={dialogOpen} title="Подтвердите удаление" message={pendingDelete ? 'Вы действительно хотите удалить это бронирование? Это действие нельзя отменить.' : ''} onConfirm={async () => {
        if (!pendingDelete) return;
        try {
          await bookingStore.removeBooking(Number(pendingDelete));
          setConfirmMsg('Бронирование удалено');
          setConfirmOpen(true);
        } catch (err) {
          console.debug('Remove failed', err);
          showToast('Не удалось удалить бронирование', 'error');
        } finally {
          setDialogOpen(false);
          setPendingDelete(null);
        }
      }} onCancel={() => { setDialogOpen(false); setPendingDelete(null); }} />
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={(e) => { e?.stopPropagation?.(); setConfirmOpen(false); }} />
    </div>
  );
}

function Users(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
