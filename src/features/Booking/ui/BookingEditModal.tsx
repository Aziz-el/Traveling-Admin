import { useEffect, useState } from 'react';
import { useBookingStore } from '../../../entities/Booking/model/useBookingStore';
import { useToast } from '../../../shared/ui/Toast';
import { CustomSelect } from '../../../shared/ui/select';

type Props = {
  open: boolean;
  onClose?: (e?: React.MouseEvent) => void;
  booking?: any;
  onSuccess?: (message?: string) => void;
};

export default function BookingEditModal({ open, onClose, booking, onSuccess }: Props) {
  const bookingStore = useBookingStore();
  const { showToast } = useToast();
  const [form, setForm] = useState<any>({ status: 'pending', guests: 1, date: '', amount: 0 });

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
    setForm({
      status: booking?.status ?? 'pending',
      guests: booking?.participants_count ?? booking?.guests ?? 1,
      date: booking?.date ? toLocalInput(booking.date) : '',
      amount: booking?.amount ?? 0,
    });
  }, [open, booking]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: name === 'guests' || name === 'amount' ? Number(value) : value }));
  };

  const save = async () => {
    if (!booking) return;
    try {
      const payload: any = {
        status: form.status,
      };
      if (form.date) payload.date = new Date(form.date).toISOString();
      if (typeof form.guests === 'number') payload.participants_count = Number(form.guests);
      if (typeof form.amount === 'number') payload.amount = Number(form.amount);

      await bookingStore.updateBooking(Number(booking.id), payload);
      onSuccess && onSuccess('Бронирование обновлено');
      onClose?.();
    } catch (err) {
      console.debug(err);
      showToast('Не удалось обновить бронирование', 'error');
    }
  };

  if (!open) return null;

  return (
     <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.(e as any);
        }
      }}
    >
      <div className="w-full max-w-xl p-6 bg-white rounded-lg dark:bg-gray-900">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Редактировать бронирование
        </h3>

        <div className="relative z-50">
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Статус
          </label>

          <CustomSelect
            name="status"
            value={form.status}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, status: e.target.value }))
            }
            className="w-full"
            options={[
              { value: 'pending', label: 'В ожидании' },
              { value: 'confirmed', label: 'Подтверждено' },
              { value: 'cancelled', label: 'Отменено' },
            ]}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-700 dark:border-gray-700 dark:text-gray-300"
          >
            Отмена
          </button>
          <button
            onClick={save}
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );

}
