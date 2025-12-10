
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