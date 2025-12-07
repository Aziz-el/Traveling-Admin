import { Tour } from '../app/App';
import { Calendar, DollarSign, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';

interface BookingsProps {
  tours: Tour[];
}

interface Booking {
  id: string;
  tourId: string;
  customerName: string;
  email: string;
  date: string;
  status: 'Подтверждено' | 'В ожидании' | 'Отменено';
  paymentStatus: 'Оплачено' | 'Ожидает оплаты' | 'Возврат';
  amount: number;
  guests: number;
}

export function Bookings({ tours }: BookingsProps) {
  // Моковые данные бронирований
  const bookings: Booking[] = [
    {
      id: '1',
      tourId: '1',
      customerName: 'Иван Петров',
      email: 'ivan@example.com',
      date: '2025-01-15',
      status: 'Подтверждено',
      paymentStatus: 'Оплачено',
      amount: 1500,
      guests: 2,
    },
    {
      id: '2',
      tourId: '2',
      customerName: 'Мария Сидорова',
      email: 'maria@example.com',
      date: '2025-01-20',
      status: 'В ожидании',
      paymentStatus: 'Ожидает оплаты',
      amount: 2200,
      guests: 1,
    },
    {
      id: '3',
      tourId: '3',
      customerName: 'Алексей Иванов',
      email: 'alexey@example.com',
      date: '2025-02-01',
      status: 'Подтверждено',
      paymentStatus: 'Оплачено',
      amount: 3000,
      guests: 3,
    },
    {
      id: '4',
      tourId: '4',
      customerName: 'Ольга Смирнова',
      email: 'olga@example.com',
      date: '2025-02-10',
      status: 'Отменено',
      paymentStatus: 'Возврат',
      amount: 1500,
      guests: 2,
    },
    {
      id: '5',
      tourId: '5',
      customerName: 'Дмитрий Козлов',
      email: 'dmitry@example.com',
      date: '2025-02-15',
      status: 'В ожидании',
      paymentStatus: 'Ожидает оплаты',
      amount: 3500,
      guests: 4,
    },
    {
      id: '6',
      tourId: '6',
      customerName: 'Елена Васильева',
      email: 'elena@example.com',
      date: '2025-02-20',
      status: 'Подтверждено',
      paymentStatus: 'Оплачено',
      amount: 1800,
      guests: 2,
    },
    {
      id: '7',
      tourId: '7',
      customerName: 'Сергей Николаев',
      email: 'sergey@example.com',
      date: '2025-03-01',
      status: 'Подтверждено',
      paymentStatus: 'Оплачено',
      amount: 2500,
      guests: 2,
    },
    {
      id: '8',
      tourId: '10',
      customerName: 'Анна Михайлова',
      email: 'anna@example.com',
      date: '2025-03-10',
      status: 'В ожидании',
      paymentStatus: 'Ожидает оплаты',
      amount: 4500,
      guests: 2,
    },
  ];

  const getTourById = (id: string) => {
    return tours.find(t => t.id === id);
  };

  const confirmedBookings = bookings.filter(b => b.status === 'Подтверждено').length;
  const pendingBookings = bookings.filter(b => b.status === 'В ожидании').length;
  const paidBookings = bookings.filter(b => b.paymentStatus === 'Оплачено').length;
  const totalRevenue = bookings
    .filter(b => b.paymentStatus === 'Оплачено')
    .reduce((sum, b) => sum + b.amount, 0);
  const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);

  return (
    <div className="p-8 dark:bg-gray-950 min-h-screen">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-white mb-2">Бронирования</h1>
        <p className="text-gray-600 dark:text-gray-400">Управление бронированиями туров</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800 hover:shadow-lg transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+5%</span>
          </div>
          <h3 className="text-green-700 dark:text-green-300 mb-1">Подтверждено</h3>
          <p className="text-green-900 dark:text-white">{confirmedBookings}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-xl p-6 shadow-sm border border-yellow-200 dark:border-yellow-800 hover:shadow-lg transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-yellow-600 dark:text-yellow-400">+12%</span>
          </div>
          <h3 className="text-yellow-700 dark:text-yellow-300 mb-1">В ожидании</h3>
          <p className="text-yellow-900 dark:text-white">{pendingBookings}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl p-6 shadow-sm border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+8%</span>
          </div>
          <h3 className="text-blue-700 dark:text-blue-300 mb-1">Оплачено</h3>
          <p className="text-blue-900 dark:text-white">{paidBookings}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-green-600 dark:text-green-400">+15%</span>
          </div>
          <h3 className="text-purple-700 dark:text-purple-300 mb-1">Общая выручка</h3>
          <p className="text-purple-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <h2 className="text-gray-900 dark:text-white">Все бронирования</h2>
              <p className="text-gray-600 dark:text-gray-400">Полный список бронирований</p>
            </div>

            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {bookings.map((booking) => {
                const tour = getTourById(booking.tourId);
                
                return (
                  <div 
                    key={booking.id} 
                    className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-all hover:shadow-md group border border-gray-200 dark:border-gray-700"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                      <ImageWithFallback
                        src={tour?.image || ''}
                        alt={tour?.name || 'Tour'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 dark:text-white truncate">{tour?.name || 'N/A'}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{booking.customerName}</p>
                        </div>
                        <span className="text-gray-900 dark:text-white ml-4">${booking.amount}</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                          {tour?.category}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                          booking.status === 'Подтверждено'
                            ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400'
                            : booking.status === 'В ожидании'
                            ? 'bg-yellow-50 dark:bg-yellow-950 text-yellow-600 dark:text-yellow-400'
                            : 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                        }`}>
                          {booking.status === 'Подтверждено' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {booking.status === 'В ожидании' && <Clock className="w-3 h-3 mr-1" />}
                          {booking.status === 'Отменено' && <XCircle className="w-3 h-3 mr-1" />}
                          {booking.status}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                          booking.paymentStatus === 'Оплачено'
                            ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                            : booking.paymentStatus === 'Ожидает оплаты'
                            ? 'bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400'
                            : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          <DollarSign className="w-3 h-3 mr-1" />
                          {booking.paymentStatus}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <span>•</span>
                        <span>{booking.guests} гост{booking.guests === 1 ? 'ь' : booking.guests < 5 ? 'я' : 'ей'}</span>
                        <span>•</span>
                        <span className="truncate">{booking.email}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
              <h2 className="text-gray-900 dark:text-white">Статистика</h2>
              <p className="text-gray-600 dark:text-gray-400">Ключевые показатели</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-700 dark:text-blue-300">Всего бронирований</span>
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-blue-900 dark:text-white">{bookings.length}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-700 dark:text-green-300">Всего гостей</span>
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-900 dark:text-white">{totalGuests}</p>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-700 dark:text-purple-300">Средний чек</span>
                  <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-purple-900 dark:text-white">
                  ${Math.round(totalRevenue / paidBookings || 0)}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-700 dark:text-orange-300">Коэффициент конверсии</span>
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <p className="text-orange-900 dark:text-white">
                  {Math.round((confirmedBookings / bookings.length) * 100)}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
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
                  <div key={tour.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white truncate">{tour.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{count} бронирований</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
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
