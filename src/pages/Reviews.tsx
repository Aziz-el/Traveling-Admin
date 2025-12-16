import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import ReviewForm from '../entities/Reviews/ui/ReviewForm';
import ReviewsList from '../entities/Reviews/ui/ReviewsList';
import { useReviewStore } from '../entities/Reviews/model/useReviewStore';
import { ReviewItem } from '../entities/Reviews/model/types';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { getCurrentUser } from '../entities/Users/model/services/user';
import ConfirmModal from '../shared/ui/ConfirmModal';


export default function Reviews() {
  const tours = useTourStore((s) => s.tours);
  const reviews = useReviewStore((s) => s.reviews);
  const fetchReviews = useReviewStore((s) => s.fetchReviews);
  const createReview = useReviewStore((s) => s.createReview);
  const updateReview = useReviewStore((s) => s.updateReview);
  const deleteReview = useReviewStore((s) => s.deleteReview);

  const [showAddForm, setShowAddForm] = useState(false);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  interface ReviewFormValues { tourId: string; userName: string; rating: number; comment: string }
  const [formValues, setFormValues] = useState<ReviewFormValues>({ tourId: '', userName: '', rating: 5, comment: '' });
  const updateFormValues = (v: Partial<ReviewFormValues>) => setFormValues((s) => ({ ...s, ...v }));
  const [currentUserId, setCurrentUserId] = useState<string | null>('');

  const [loadingReviews, setLoadingReviews] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');
  useEffect(() => {
    (async () => {
      setLoadingReviews(true);
      try {
        await fetchReviews();
      } finally {
        setLoadingReviews(false);
      }
    })();
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me && me.id !== undefined && me.id !== null) setCurrentUserId(String(me.id));
      } catch (e) {
        // ignore
      }
    })();
  }, [fetchReviews]);

  const filteredReviews = reviews.filter((review) => {
    const matchesRating = filterRating ? review.rating === filterRating : true;
    const matchesStatus = filterStatus === 'all' ? true : review.status === filterStatus;
    const q = searchQuery.trim().toLowerCase();
    const tourName = (review.tourName || '').toLowerCase();
    const userName = (review.userName || '').toLowerCase();
    const comment = (review.comment || '').toLowerCase();
    const matchesSearch = q === '' ? true : (tourName.includes(q) || userName.includes(q) || comment.includes(q));
    return matchesRating && matchesStatus && matchesSearch;
  });

  const handleAddReview = async () => {
    if (formValues.tourId && formValues.comment) {
      await createReview({
        target_type: 'tour',
        target_id: formValues.tourId,
        rating: formValues.rating,
        comment: formValues.comment,
      } as any);
      setFormValues({ tourId: '', userName: '', rating: 5, comment: '' });
      setShowAddForm(false);
      setConfirmMsg('Отзыв успешно добавлен');
      setConfirmOpen(true);
    }
  };

  const handleUpdateReview = async () => {
    if (editingReview) {
      await updateReview(editingReview.id, editingReview as any);
      setEditingReview(null);
      setConfirmMsg('Отзыв успешно обновлён');
      setConfirmOpen(true);
    }
  };

  const handleDeleteReview = async (id: string) => {
    await deleteReview(id);
    setConfirmMsg('Отзыв удалён');
    setConfirmOpen(true);
  };

  const handleLike = async (id: string) => {
    const r = reviews.find((rv) => rv.id === id);
    if (r) await updateReview(id, { likes: (r.likes || 0) + 1 } as any);
  };

  const handleStatusChange = async (id: string, status: ReviewItem['status']) => {
    await updateReview(id, { status } as any);
  };

  return (
    <div className="p-8 dark:bg-[#0a0a0f] min-h-screen">
     <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
      Отзывы
    </h1>
    <p className="mt-1 text-sm text-gray-600 sm:text-base dark:text-gray-400">
      Управление отзывами клиентов
    </p>
  </div>

  <button
    onClick={() => setShowAddForm(!showAddForm)}
    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
               bg-blue-600 text-white font-medium transition-colors
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               dark:focus:ring-offset-gray-900 "
  >
    <Plus className="w-5 h-5" />
    <span className="hidden sm:inline">Добавить отзыв</span>
    <span className="sm:hidden">Добавить</span>
  </button>
</div>


      {showAddForm && (
        <ReviewForm tours={tours.map(t => ({ id: t.id, name: t.title }))} values={formValues} onChange={updateFormValues} onCancel={() => setShowAddForm(false)} onSubmit={handleAddReview} />
      )}

      <ReviewsList
        reviews={filteredReviews}
        userId={currentUserId}
        editingReview={editingReview}
        setEditingReview={setEditingReview}
        onLike={handleLike}
        onDelete={handleDeleteReview}
        onUpdate={(r) => updateReview(r.id, r as any)}
        onChangeStatus={handleStatusChange}
        loading={loadingReviews}
      />
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => setConfirmOpen(false)} />
    </div>
  );
}