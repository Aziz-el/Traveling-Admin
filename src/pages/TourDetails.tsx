import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Tour } from '../app/App';
import { ImageWithFallback } from '../shared/ui/ImageWithFallback';
import { InteractiveMap } from '../shared/components/InteractiveMap';
import { formatDateRange } from '../shared/utils/formatDate';

interface TourDetailsProps {
  tours: Tour[];
}

export default function TourDetails({ tours }: TourDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === id);
  const [createOpen, setCreateOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    customerName: '',
    email: '',
    date: tour?.startTime ? (tour.startTime.split(' ')[0]) : '',
    guests: 1,
    paymentStatus: 'Ожидает оплаты',
    amount: tour?.price || 0,
  });

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: name === 'guests' || name === 'amount' ? Number(value) : value }));
  };

  const handleSaveBooking = () => {
    if (!bookingData.customerName || !bookingData.email || !bookingData.date) {
      alert('Пожалуйста, заполните имя клиента, email и дату');
      return;
    }

    const stored = localStorage.getItem('bookings');
    let arr = [] as any[];
    try {
      if (stored) arr = JSON.parse(stored);
    } catch {}

    const newBooking = {
      id: Date.now().toString(),
      tourId: tour!.id,
      customerName: bookingData.customerName,
      email: bookingData.email,
      date: bookingData.date,
      status: 'В ожидании',
      paymentStatus: bookingData.paymentStatus,
      amount: bookingData.amount,
      guests: bookingData.guests,
    };

    arr.unshift(newBooking);
    try { localStorage.setItem('bookings', JSON.stringify(arr)); } catch {}

    setCreateOpen(false);
    alert('Бронирование создано');
    navigate('/bookings');
  };

  if (!tour) {
    return (
      <div className="p-8">
        <h2 className="text-lg font-medium">Тур не найден</h2>
        <button onClick={() => navigate('/tours')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Назад к турам</button>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 dark:bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-semibold mb-2">{tour.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{tour.company} • {tour.category}</p>
          <div className="flex justify-end mb-4">
            <button onClick={() => setCreateOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Забронировать</button>
          </div>
          <div className="mb-4">
            <ImageWithFallback src={tour.image} alt={tour.name} className="w-full h-64 object-cover rounded" />
          </div>
          <div className="mb-4 text-gray-700 dark:text-gray-300">{tour.description}</div>
          <div className="flex gap-4 mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Цена: <span className="text-gray-900 dark:text-white">${tour.price}</span></div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Статус: <span className="text-gray-900 dark:text-white">{tour.status}</span></div>
          </div>
          { (tour.startTime || tour.endTime) && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{formatDateRange(tour.startTime, tour.endTime)}</div>
          ) }
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="mb-4">Карта</h3>
          <div className="h-64">
            <InteractiveMap tours={[tour]} />
          </div>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Координаты: {tour.startLat.toFixed(4)}, {tour.startLng.toFixed(4)} → {tour.endLat.toFixed(4)}, {tour.endLng.toFixed(4)}
          </div>
        </div>
      </div>
      </div>
      {createOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Создать бронирование</h3>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Имя клиента</label>
              <input name="customerName" value={bookingData.customerName} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input name="email" value={bookingData.email} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Дата</label>
              <input name="date" type="date" value={bookingData.date} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Гостей</label>
                <input name="guests" type="number" min={1} value={bookingData.guests} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Сумма</label>
                <input name="amount" type="number" value={bookingData.amount} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">Статус оплаты</label>
              <select name="paymentStatus" value={bookingData.paymentStatus} onChange={handleBookingChange} className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800">
                <option>Ожидает оплаты</option>
                <option>Оплачено</option>
                <option>Возврат</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button onClick={() => setCreateOpen(false)} className="px-4 py-2 border rounded">Отмена</button>
            <button onClick={handleSaveBooking} className="px-4 py-2 bg-blue-600 text-white rounded">Сохранить</button>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
