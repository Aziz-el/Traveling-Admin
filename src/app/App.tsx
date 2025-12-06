import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Home, { type Tour } from '../pages/Home/Home';
import { useState } from 'react';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import Add_Tour from '../pages/Add_Tour/Add_Tour';
import Setting from '../pages/Settings/Setting';
import { ToursList } from '../pages/Tours/TourList';
import BookingPage from '../pages/Booking/BookingPage';

export interface Booking {
  id: string;
  tourId: string;
  tourName: string;
  userName: string;
  email: string;
  phone: string;
  bookingDate: string;
  startDate: string;
  guests: number;
  totalPrice: number;
  status: string;
  paymentStatus: string;
}

function App() {
  const [tours, setTours] = useState<Tour[]>([
    {
      id: '1',
      image: 'https://example.com/europe-tour.jpg',
      name: 'Тур по Европе',
      description: 'Незабываемое путешествие по европейским столицам',
      price: 150000,
      duration: 10,
      category: 'Европа',
      company: 'EuroTravel',
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 48.8566,
      endLng: 2.3522,
      status: 'Активный',
    },
    {
      id: '2',
      image: 'https://example.com/europe-tour.jpg',
      name: 'Азиатское приключение',
      description: 'Откройте для себя красоты Азии',
      price: 200000,
      duration: 14,
      category: 'Азия',
      company: 'AsiaTours',
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 1.3521,
      endLng: 103.8198,
      status: 'Активный',
    },
    {
      id: '3',
      image: 'https://example.com/europe-tour.jpg',
      name: 'Путешествие по России',
      description: 'Исследуйте просторы родной страны',
      price: 80000,
      duration: 7,
      category: 'Россия',
      company: 'RusTrips',
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 59.9343,
      endLng: 30.3351,
      status: 'Неактивный',
    },
  ]);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleDelete = (id: string) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = (tour: Tour) => {
    setTours((prev) => prev.map((t) => (t.id === tour.id ? tour : t)));
  };

  const handleCreateBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard tours={tours} />} />
        <Route path="add-tour" element={<Add_Tour />} />
        <Route path="tours" element={<ToursList tours={tours} onDelete={handleDelete} onUpdate={handleUpdate} onBook={handleCreateBooking} />} />
        <Route path="reservation" element={<div className="p-6">Бронирования (в разработке)</div>} />
        <Route path="reservation/:tourId" element={<BookingPage tours={tours} onBook={handleCreateBooking} />} />
        <Route path="users" element={<div className="p-6">Пользователи (в разработке)</div>} />
        <Route path="company" element={<div className="p-6">Компании (в разработке)</div>} />
        <Route path="routes" element={<div className="p-6">Маршруты (в разработке)</div>} />
        <Route path="settings" element={<Setting/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
