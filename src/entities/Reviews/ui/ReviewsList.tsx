import React from 'react';
import { Star, ThumbsUp, MessageSquare, Trash2, Edit } from 'lucide-react';
import { ReviewItem } from '../model/types';

interface Props {
  reviews: ReviewItem[];
  userId: string | null;
  editingReview: ReviewItem | null;
  setEditingReview: (r: ReviewItem | null) => void;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (r: ReviewItem) => void;
  onChangeStatus: (id: string, status: ReviewItem['status']) => void;
  loading?: boolean;
}

import ReviewSkeleton from '../../../shared/ui/skeletons/ReviewSkeleton';
import RatingSkeleton from '../../../shared/ui/skeletons/RatingSkeleton';

export default function ReviewsList({ reviews, userId, editingReview, setEditingReview, onLike, onDelete, onUpdate, onChangeStatus, loading }: Props) {
  const items = loading ? (
    Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)
  ) : (
    reviews.map((review) => (
      <div key={review.id} className="bg-white dark:bg-[#13131a] rounded-xl p-6 border border-gray-200 dark:border-gray-800/50 hover:shadow-lg transition-all duration-200">
          {editingReview?.id === review.id ? (
            <div className="space-y-4">{/* editing UI lives in page */}</div>
          ) : (
            <>
              <div className="flex items-start gap-4 mb-4">
                <img src={review.userAvatar} alt={review.userName} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{review.userName}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{review.tourName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full ${review.status === 'Опубликован' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : review.status === 'На модерации' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                        {review.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}</div>
                    <span className="text-gray-500 dark:text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button onClick={() => onLike(review.id)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes}</span>
                    </button>
                    {review.ownerId === userId && (
                      <>
                        <button onClick={() => setEditingReview(review)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <Edit className="w-4 h-4" /> Редактировать
                        </button>
                        <button onClick={() => onDelete(review.id)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" /> Удалить
                        </button>
                      </>
                    )}
                    {review.status !== 'Опубликован' && (
                      <button onClick={() => onChangeStatus(review.id, 'Опубликован')} className="ml-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">Опубликовать</button>
                    )}
                    {review.status !== 'Отклонен' && (
                      <button onClick={() => onChangeStatus(review.id, 'Отклонен')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">Отклонить</button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )));
  return (
    <div className="space-y-6">
      {items}
      {!loading && reviews.length === 0 && (
        <div className="bg-white dark:bg-[#13131a] rounded-xl p-12 border border-gray-200 dark:border-gray-800/50 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="text-gray-900 dark:text-white mb-2">Отзывы не найдены</h3>
          <p className="text-gray-600 dark:text-gray-400">Попробуйте изменить фильтры или добавьте новый отзыв</p>
        </div>
      )}
    </div>
  );
}
