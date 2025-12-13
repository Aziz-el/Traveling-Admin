import { CustomSelect } from '../../../shared/ui/select';
import { useTourStore } from '../../Tour/model/useTourStore';
import { Star } from 'lucide-react';

interface Props {
  tours: { id: string; name: string }[];
  values: { tourId: string; userName: string; rating: number; comment: string };
  onChange: (next: Partial<Props['values']>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function ReviewForm({ values, onChange, onCancel, onSubmit }: Props) {
    const tours = useTourStore((s) => s.tours);

  const tourOptions = [{ value: '', label: 'Выберите тур' }, ...tours.map((t) => ({ value: t.id, label: t.title }))];

   const renderStars = (rating: number, interactive: boolean = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 dark:text-gray-600'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onChange && onChange(star)}
          />
        ))}
      </div>
    );
  };


  return (
    <div className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 mb-8">
      <h2 className="text-gray-900 dark:text-white mb-6">Новый отзыв</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Тур</label>
          <CustomSelect
                options={tourOptions}
                value={values.tourId}
                onChange={(e) => onChange({ tourId: e.target.value })}
                placeholder="Выберите тур" name={''}          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Имя пользователя</label>
          <input
            type="text"
            value={values.userName}
            onChange={(e) => onChange({ userName: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Введите имя"
          />
        </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Рейтинг</label>
              {renderStars(values.rating, true, (rating) => onChange({ rating }))}
            </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">Комментарий</label>
          <textarea
            value={values.comment}
            onChange={(e) => onChange({ comment: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1e1e2e] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Напишите ваш отзыв..."
          />
        </div>
        <div className="flex gap-3">
          <button onClick={onSubmit} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">Добавить отзыв</button>
          <button onClick={onCancel} className="px-6 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors">Отмена</button>
        </div>
      </div>
    </div>
  );
}
