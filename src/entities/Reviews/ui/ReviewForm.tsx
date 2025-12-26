import { CustomSelect } from '../../../shared/ui/select';
import { Star } from 'lucide-react';

interface Props {
  tours: { id: string; name: string }[];
  values: { tourId: string; rating: number; comment: string };
  onChange: (next: Partial<Props['values']>) => void;
  onCancel: (e: React.MouseEvent) => void;
  onSubmit: () => void;
  onClose?: (e: React.MouseEvent) => void;
  currentUserName?: string;
  currentUserAvatar?: string;
  currentUserRole?: string;
}

export default function ReviewForm({ values, onChange, onCancel, onSubmit, onClose, currentUserName, currentUserAvatar, currentUserRole, tours }: Props) {
  const tourOptions = [{ value: '', label: 'Выберите тур' }, ...tours.map((t) => ({ value: t.id, label: t.name }))];

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
    <div className="rounded-2xl p-6 mb-8 bg-gradient-to-br from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-900 border border-transparent shadow-xl" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(e as any); }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold shadow-md animate-float">✦</div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">Новый отзыв</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">Поделитесь впечатлениями — мы опубликуем после проверки</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Тур</label>
          <CustomSelect
            options={tourOptions}
            value={values.tourId}
            onChange={(e) => onChange({ tourId: e.target.value })}
            placeholder="Выберите тур"
            name={''}
            />
        </div>

        <div className="flex items-center gap-4">
          {currentUserAvatar ? (
            <img src={currentUserAvatar} alt={currentUserName || 'User'} className="w-14 h-14 rounded-full object-cover ring-4 ring-white dark:ring-gray-900 shadow" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow">
              {currentUserName ? currentUserName.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{currentUserName || 'Гость'}</div>
            <div className="text-xs text-gray-400">{currentUserRole ? `Роль: ${currentUserRole}` : '(автоматически используется профиль)'}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Рейтинг</label>
          <div className="flex gap-2 items-center">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className={`w-8 h-8 ${s <= values.rating ? 'fill-yellow-400 text-yellow-400 drop-shadow' : 'text-gray-300 dark:text-gray-600'} cursor-pointer transform hover:scale-110 transition-transform`} onClick={() => onChange({ rating: s })} />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Комментарий</label>
          <div className="relative">
            <div className="absolute -top-3 left-3 text-4xl text-gray-200 dark:text-gray-700 select-none">“</div>
            <textarea
              ref={(el) => {
                if (el) {
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
              value={values.comment}
              onInput={(e) => {
                const el = e.currentTarget as HTMLTextAreaElement;
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
              }}
              onChange={(e) => onChange({ comment: e.target.value })}
              rows={3}
              className="w-full px-6 py-4 rounded-2xl border border-gray-200 overflow-hidden dark:border-gray-800 bg-white dark:bg-[#0f1724] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-pink-400 outline-none resize-none"
              placeholder="Расскажите, что вам понравилось или чего не хватило..."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={onSubmit}
            disabled={!values.tourId || !values.comment.trim()}
            className={`px-6 py-2 rounded-full shadow-lg text-white ${!values.tourId || !values.comment.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-indigo-500 hover:scale-105 transform transition'}`}
          >
            Опубликовать отзыв
          </button>
          <button onClick={onCancel} className="px-5 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition">Отмена</button>
        </div>
      </div>
    </div>
  );
}
