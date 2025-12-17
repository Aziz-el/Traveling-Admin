import { useEffect, useState } from 'react';
import { useBookingStore } from '../../../entities/Booking/model/useBookingStore';
import { useToast } from '../../../shared/ui/Toast';
import { CustomSelect } from '../../../shared/ui/select';
import CustomInput from '../../../shared/ui/input';
import CustomCalendar from '../../../shared/ui/calendar';
import CustomNumberInput from '../../../shared/ui/customNumber';

type Props = {
  open: boolean;
  onClose?: (e?: React.MouseEvent) => void;
  tours: any[];
  onSuccess?: (message?: string) => void;
};

export const BookingFormModal: React.FC<Props> = ({ open, onClose, tours, onSuccess }) => {
  const bookingStore = useBookingStore();
  const { showToast } = useToast();
  const [form, setForm] = useState<any>({
    name: '',
    email: '',
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

  useEffect(() => {
    if (!open) return;
    const nowLocal = toLocalInput(new Date().toISOString());
    setForm({ tourId: String(tours[0]?.id ?? ''), date: nowLocal, guests: 1 });
  }, [open, tours]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: name === 'guests' ? Number(value) : value }));
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const save = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    if (!form.tourId || !form.date) {
      showToast('Заполните тур и дату', 'error');
      return;
    }
    try {
      const isoDate = new Date(form.date).toISOString();
      await bookingStore.addBooking({
        tour_id: Number(form.tourId),
        participants_count: Number(form.guests),
        date: isoDate,
      });
      onSuccess && onSuccess('Бронирование создано');
      onClose?.(e);
    } catch (err) {
      console.debug(err);
      showToast('Ошибка при создании бронирования', 'error');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto text-white bg-black/50 " 
      onMouseDown={(e) => { if (e.target === e.currentTarget) { onClose && onClose(e as any); } }}>
      <div className="w-full max-w-2xl max-h-screen p-6 overflow-auto bg-white rounded-lg dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Создать бронирование</h3>
        <div className="grid grid-cols-1 gap-4">
            <>
                        <div>
                          <label className="block mb-1 text-gray-700 dark:text-gray-300">Имя клиента</label>
                          <CustomInput
                            name="customerName"
                            value={form.customerName ?? ''} 
                            onChange={handleChange}
                            className="w-full px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-700 dark:text-gray-300">Email клиента</label>
                          <CustomInput
                            name="customerEmail"
                            value={form.customerEmail ?? ''} 
                            onChange={handleChange}
                            className="w-full px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-gray-700 dark:text-gray-300">Тур</label>
                          <CustomSelect
                            name="tourId"
                            value={form.tourId ?? String(tours[0]?.id ?? '')} 
                            onChange={handleChange}
                            className="w-full px-3 py-2"
                            options={tours.map(t => ({ value: String(t.id), label: t.title ?? t.name ?? 'Тур' }))}
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-gray-700 dark:text-gray-300">Дата и время</label>
                          <CustomCalendar
                            name="date"
                            value={form.date ?? ''} 
                            onChange={handleChange}
                            className="w-full px-3 py-2"
                          />
                        </div>

                        <div>
                          <label className="block mb-1 text-gray-700 dark:text-gray-300">Гостей</label>
                          <CustomNumberInput
                            name="guests"
                            min={1}
                            value={form.guests ?? 1} 
                            onChange={handleChange}
                            className="w-full px-3 py-2"
                          />
                        </div>
                      </>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 dark:border-gray-700 dark:text-gray-300">Отмена</button>
          <button onClick={save} className="px-4 py-2 text-white bg-blue-600 rounded-md">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default BookingFormModal;