import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { useBookingStore } from '../entities/Booking/model/useBookingStore';

export default function TourDetails() {
  let toursStore = useTourStore();
  let tours = toursStore.tours;

  useEffect(() => {
    toursStore.fetchTours();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const tour = tours.find(t => t.id == id);

  const bookingStore = useBookingStore();
  const [createOpen, setCreateOpen] = useState(false);
  const toLocalInput = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    const YYYY = d.getFullYear();
    const MM = pad(d.getMonth() + 1);
    const DD = pad(d.getDate());
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
  };

  const [bookingData, setBookingData] = useState({
    customerName: '',
    email: '',
    date: toLocalInput(new Date().toISOString()),
    guests: 1,
    paymentStatus: 'Ожидает оплаты',
    amount: tour?.price || 0,
  });

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'guests' || name === 'amount' ? Number(value) : value
    }));
  };

  const handleSaveBooking = async () => {
    if (!bookingData.customerName || !bookingData.email || !bookingData.date) {
      alert('Пожалуйста, заполните имя клиента, email и дату');
      return;
    }

    try {
      const isoDate = new Date(bookingData.date).toISOString();
      await bookingStore.addBooking({
        tour_id: Number(tour!.id),
        participants_count: Number(bookingData.guests),
        date: isoDate,
        amount: Number(bookingData.amount),
        customer_name: bookingData.customerName,
        email: bookingData.email,
      } as any);

      setCreateOpen(false);
      alert('Бронирование создано');
      navigate('/bookings');
    } catch (err) {
      console.error('Failed to create booking', err);
      alert('Ошибка при создании бронирования');
    }
  };

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
      <div className="p-8 h-full dark:bg-gray-950">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="p-6 bg-white border border-gray-200 shadow-sm lg:col-span-2 dark:bg-gray-900 rounded-xl dark:border-gray-800">
            <h1 className="mb-2 text-2xl font-semibold dark:text-white">{tour.title}</h1>

            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Компания ID: {tour.company_id}
            </p>

            <div className="flex justify-end mb-4">
              <button onClick={() => setCreateOpen(true)} className="px-4 py-2 text-white bg-blue-600 rounded-lg">
                Забронировать
              </button>
            </div>

            <div className="mb-4">
              <ImageWithFallback
                src={tour.image_url}
                alt={tour.title}
                className="object-cover w-full h-64 rounded"
              />
            </div>

            <div className="mb-4 text-gray-700 dark:text-gray-300">{tour.description}</div>

            <div className="flex flex-col gap-3 mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Цена: <span className="text-gray-900 dark:text-white">${tour.price}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Длительность: <span className="text-gray-900 dark:text-white">{tour.duration}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Мест: <span className="text-gray-900 dark:text-white">{tour.capacity}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Рейтинг: <span className="text-gray-900 dark:text-white">{tour.rating}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Локация: <span className="text-gray-900 dark:text-white">{tour.location}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Статус: <span className="text-gray-900 dark:text-white">{tour.is_active ? 'Активный' : 'Неактивный'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-900 rounded-xl dark:border-gray-800">
            <h3 className="mb-4 dark:text-white">Карта</h3>
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              Нет координат для отображения
            </div>
          </div>
        </div>
      </div>

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 bg-opacity-40 ">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg dark:bg-gray-900  max-h-full">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Создать бронирование</h3>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Имя клиента</label>
                <input name="customerName" value={bookingData.customerName} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800" />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input name="email" value={bookingData.email} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800" />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Дата и время</label>
                <input name="date" type="datetime-local" value={bookingData.date} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Гостей</label>
                  <input name="guests" type="number" min={1} value={bookingData.guests} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800" />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Сумма</label>
                  <input name="amount" type="number" value={bookingData.amount} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800" />
                </div>
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Статус оплаты</label>
                <select name="paymentStatus" value={bookingData.paymentStatus} onChange={handleBookingChange} className="w-full px-3 py-2 bg-white border rounded dark:bg-gray-800">
                  <option>Ожидает оплаты</option>
                  <option>Оплачено</option>
                  <option>Возврат</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setCreateOpen(false)} className="px-4 py-2 border rounded dark:border-gray-700 dark:text-gray-300">Отмена</button>
              <button onClick={handleSaveBooking} className="px-4 py-2 text-white bg-blue-600 rounded">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
