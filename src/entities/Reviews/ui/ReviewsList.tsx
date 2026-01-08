import { memo } from 'react';
import { ReviewItem } from '../model/types';
import ReviewCard from './ReviwsCard';
import ReviewSkeleton from '../../../shared/ui/skeletons/ReviewSkeleton';
import { MessageSquare } from 'lucide-react';

interface Props {
  reviews: ReviewItem[];
  userId: string | null;
  currentUserName?: string | null;
  currentUserAvatar?: string | null;
  currentUserRole?: string | null;
  onDelete: (id: string) => void;
  onUpdate: (r: ReviewItem) => void;
  onChangeStatus: (id: string, status: ReviewItem['status']) => void;
  loading?: boolean;
  loadingMore?: boolean;
  editingReview?: ReviewItem | null;
  setEditingReview?: (r: ReviewItem | null) => void;
  replyingIds?: string[];
}

function ReviewsList(props: Props) {
  const { reviews, loading, loadingMore } = props;

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="bg-white dark:bg-[#13131a] rounded-xl p-12 border text-center">
        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h3 className='text-gray-800 dark:text-gray-300'>Отзывы не найдены</h3>
        <p className="text-gray-500">Добавьте первый отзыв</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} {...props} />
      ))}

      {loadingMore && (
        <div className="space-y-4">
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      )}
    </div>
  );
}

export default memo(ReviewsList);
