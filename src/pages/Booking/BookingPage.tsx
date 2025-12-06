import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Tour } from '../Home/Home';
import { Label } from '../../shared/UI/Label/Label';
import Input from '../../shared/UI/Input/Input';
import { Button } from '../../shared/UI/Button/Button';

interface Booking {
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

interface BookingPageProps {
  tours: Tour[];
  onBook: (booking: Booking) => void;
}

export default function BookingPage({ tours, onBook }: BookingPageProps) {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const tour = tours.find((t) => t.id === tourId) || tours[0];

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [guests, setGuests] = useState('1');

  const handleCreateBooking = () => {
    if (!tour) return;
    if (userName && email && phone && startDate && guests) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        tourId: tour.id,
        tourName: tour.name,
        userName,
        email,
        phone,
        bookingDate: new Date().toISOString().split('T')[0],
        startDate,
        guests: parseInt(guests),
        totalPrice: tour.price * parseInt(guests),
        status: 'Ожидание',
        paymentStatus: 'Ожидает оплаты',
      };

      onBook(newBooking);
      navigate('/tours');
    }
  };

  if (!tour) {
    return <div className="p-6">Тур не найден</div>;
  }

  return (
    <div className="p-6">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold">Бронирование: {tour.name}</h2>
        <p className="text-slate-600">Заполните данные клиента для создания бронирования</p>
      </header>

      <div className="space-y-4 max-w-2xl">
        <div>
          <Label htmlFor="booking-userName">Имя клиента</Label>
          <Input  value={userName} onChange={(e) => setUserName(e.target.value)} className="mt-2" type={''} />
        </div>

        <div>
          <Label htmlFor="booking-email">Email</Label>
          <Input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="booking-phone">Телефон</Label>
          <Input  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="booking-startDate">Дата начала тура</Label>
          <Input  type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-2" />
        </div>

        <div>
          <Label htmlFor="booking-guests">Количество гостей</Label>
          <Input  type="number" min={1} value={guests} onChange={(e) => setGuests(e.target.value)} className="mt-2" />
        </div>

        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-slate-700">Итоговая стоимость:</div>
          <div className="text-slate-900">{(tour.price * parseInt(guests || '1')).toLocaleString()} ₽</div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>Отмена</Button>
          <Button onClick={handleCreateBooking}>Создать бронирование</Button>
        </div>
      </div>
    </div>
  );
}
