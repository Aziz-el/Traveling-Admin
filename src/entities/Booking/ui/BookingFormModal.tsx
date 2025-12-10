import React from 'react';
import { useBookingStore } from '../model/useBookingStore';

type Props = {
  open: boolean;
  onClose: () => void;
  tours: any[];
};

export const BookingFormModal: React.FC<Props> = ({ open, onClose, tours }) => {
  const bookingStore = useBookingStore();
  const [form, setForm] = React.useState<any>({
    tourId: tours[0]?.id ?? '',
    date: '',
    guests: 1,
  });

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

  React.useEffect(() => {
    const nowLocal = toLocalInput(new Date().toISOString());
    setForm({ tourId: tours[0]?.id ?? '', date: nowLocal, guests: 1 });
  }, [open, tours]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: name === 'guests' ? Number(value) : value }));
  };

const save = async () => {
    if (!form.tourId || !form.date) {
        alert('Заполните тур и дату');
        return;
    }
    try {
        const isoDate = new Date(form.date).toISOString();
        await bookingStore.addBooking({
            tour_id: Number(form.tourId),
            participants_count: Number(form.guests),
            date: isoDate
        });
        onClose();
    } catch (err) {
        console.error(err);
        alert('Ошибка при создании бронирования');
    }
};


  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Создать бронирование</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Тур</label>
            <select name="tourId" value={form.tourId} onChange={handleChange} className="w-full px-3 py-2 bg-white border rounded-md dark:bg-gray-800">
              {tours.map(t => (
                <option key={t.id} value={t.id}>{t.name} — {t.company}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Дата и время</label>
            <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="w-full px-3 py-2 bg-white border rounded-md dark:bg-gray-800" />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Гостей</label>
            <input name="guests" type="number" min={1} value={form.guests} onChange={handleChange} className="w-full px-3 py-2 bg-white border rounded-md dark:bg-gray-800" />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">Отмена</button>
          <button onClick={save} className="px-4 py-2 text-white bg-blue-600 rounded-md">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;
