import { useState, } from 'react';
import { Star, ThumbsUp, Trash2, Edit } from 'lucide-react';
import { ReviewItem } from '../model/types';

interface Props {
  review: ReviewItem;
  userId: string | null;
  currentUserName?: string | null;
  currentUserAvatar?: string | null;
  currentUserRole?: string | null;
  onDelete: (id: string) => void;
  onUpdate: (r: ReviewItem) => void;
  onChangeStatus: (id: string, status: ReviewItem['status']) => void;
}

export default function ReviewCard({
  review,
  userId,
  currentUserRole,
  onDelete,
  onUpdate,
  onChangeStatus,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(review.comment);


  const canEdit = review.ownerId === userId || currentUserRole === 'admin';

  return (
    <div className="w-full rounded-2xl p-4 sm:p-6 bg-gradient-to-tr from-indigo-50 to-blue-100 dark:from-[#071021] dark:to-[#071024] border border-transparent shadow">
      <div className="flex justify-between items-start mb-3 gap-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-300 text-lg">{review.userName || 'Пользователь'}</h3>
          <div className="flex items-center gap-2 mt-1">
            {review.ownerId === userId && <span className="text-xs text-indigo-600 font-medium">Вы</span>}
            {currentUserRole === 'admin' && <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">Админ</span>}
          </div>
          <div className="text-xs text-gray-500 mt-1">{review.date} · <span className="font-medium">{review.tourName || ''}</span></div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`text-xs px-2 py-1 rounded-full ${review.status === 'Опубликован' ? 'bg-green-100 text-green-700' : review.status === 'Отклонен' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{review.status}</div>

          {currentUserRole === 'admin' && (
            <select
              value={review.status}
              onChange={(e) => onChangeStatus && onChangeStatus(review.id, e.target.value as any)}
              className="text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1220] px-2 py-1"
            >
              <option value="Опубликован">Опубликован</option>
              <option value="На модерации">На модерации</option>
              <option value="Отклонен">Отклонен</option>
            </select>
          )}
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>

      {isEditing ? (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#061018] mb-3 dark:text-gray-100" 
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                onUpdate({ ...review, comment: text });
                setIsEditing(false);
              }}
              className="btn-primary"
            >
              Сохранить
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 rounded border">Отмена</button>
          </div>
        </>
      ) : (
        <p className="mb-3 text-sm text-gray-800 dark:text-gray-200">{review.comment}</p>
      )}

      <div className="flex gap-3 items-center">
        {canEdit && (
          <>
            <button onClick={() => setIsEditing(true)} className="p-2 rounded hover:bg-gray-100"><Edit /></button>
            <button onClick={() => onDelete(review.id)} className="p-2 rounded text-red-500 hover:bg-red-50"><Trash2 /></button>
          </>
        )}
      </div>
    </div>
  );
}
