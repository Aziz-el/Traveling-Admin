import { useEffect, useState, useRef } from 'react';
import { fetchUsers } from '../entities/Users/model/services/user';
import { Plus } from 'lucide-react';
import ReviewForm from '../entities/Reviews/ui/ReviewForm';
import ReviewsList from '../entities/Reviews/ui/ReviewsList';
import { useReviewStore } from '../entities/Reviews/model/useReviewStore';
import { ReviewItem } from '../entities/Reviews/model/types';
import { useTourStore } from '../entities/Tour/model/useTourStore';
import { useAuth } from '../shared/hooks/useAuth';
import { containsProfanity } from '../shared/utils/profanity';
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
  interface ReviewFormValues { tourId: string; rating: number; comment: string }
  const [formValues, setFormValues] = useState<ReviewFormValues>({ tourId: '', rating: 5, comment: '' });
  const updateFormValues = (v: Partial<ReviewFormValues>) => setFormValues((s) => ({ ...s, ...v }));

  const { user: authUser, loading: authLoading, refresh: refreshAuth } = useAuth();
  const currentUserId = authUser?.id ? String(authUser.id) : null;
  const currentUserName = authUser?.full_name ?? null;
  const currentUserAvatar = authUser?.full_name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser.full_name)}&background=0D8ABC&color=fff&rounded=true` : null;
  const currentUserRole = authUser?.role ?? null;

  const [loadingReviews, setLoadingReviews] = useState(true);
  const [usersMap, setUsersMap] = useState<Record<string, string>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState('');

  const loadMore = useReviewStore((s) => s.loadMore);
  const hasNext = useReviewStore((s) => s.hasNext);
  const loadingMore = useReviewStore((s) => s.loadingMore);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      setLoadingReviews(true);
      try {
        await fetchReviews();
        try {
          const usersResp = await fetchUsers();
          const map: Record<string, string> = {};
          (usersResp.items || []).forEach((u: any) => {
            if (u && u.id != null) map[String(u.id)] = u.full_name || u.name || '';
          });
          setUsersMap(map);
        } catch (e) {
        }
      } finally {
        setLoadingReviews(false);
      }
    })();
  }, [fetchReviews]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNext && !loadingMore) {
          loadMore();
        }
      });
    }, { root: null, rootMargin: '300px', threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [sentinelRef, hasNext, loadingMore, loadMore]);

  const mappedReviews = reviews.map((review) => {
    const ownerKey = review.ownerId ? String(review.ownerId) : undefined;
    const nameFromMap = ownerKey ? usersMap[ownerKey] : undefined;
    const resolvedName = review.userName || (ownerKey === currentUserId ? currentUserName || undefined : nameFromMap);
    return { ...review, userName: resolvedName || review.userName };
  });

  const filteredReviews = mappedReviews.filter((review) => {
    const matchesRating = filterRating ? review.rating === filterRating : true;
    const matchesStatus = filterStatus === 'all' ? true : review.status === filterStatus;
    const q = searchQuery.trim().toLowerCase();
    const tourName = (review.tourName || '').toLowerCase();
    const userName = (review.userName || '').toLowerCase();
    const comment = (review.comment || '').toLowerCase();
    const matchesSearch = q === '' ? true : (tourName.includes(q) || userName.includes(q) || comment.includes(q));
    return matchesRating && matchesStatus && matchesSearch;
  });

  const AUTO_PUBLISH = true;

  const handleAddReview = async () => {
    if (formValues.tourId && formValues.comment) {
      if (containsProfanity(formValues.comment)) {
        setConfirmMsg('Отзыв отклонён: обнаружена нецензурная лексика');
        setConfirmOpen(true);
        setFormValues({ tourId: '', rating: 5, comment: '' });
        setShowAddForm(false);
        return;
      }

      const payload: any = {
        target_type: 'tour',
        target_id: formValues.tourId,
        rating: formValues.rating,
        comment: formValues.comment,
        author_id: currentUserId ? Number(currentUserId) : undefined,
      };

      if (AUTO_PUBLISH) {
        payload.is_moderated = true;
      } else {
        payload.is_moderated = false;
      }

      await createReview(payload as any);

      setFormValues({ tourId: '', rating: 5, comment: '' });
      setShowAddForm(false);
      setConfirmMsg(AUTO_PUBLISH ? 'Отзыв успешно опубликован' : 'Отзыв отправлен на модерацию');
      setConfirmOpen(true);
    }
  };

  const handleUpdateReview = async () => {
    if (editingReview) {
      if (containsProfanity(editingReview.comment)) {
        await updateReview(editingReview.id, { comment: editingReview.comment, is_moderated: false, status: 'Отклонен' } as any);
        setConfirmMsg('Отзыв отклонён из-за нецензурной лексики');
      } else {
        await updateReview(editingReview.id, { ...editingReview, is_moderated: true, status: 'Опубликован' } as any);
        setConfirmMsg('Отзыв успешно обновлён и опубликован');
      }
      setEditingReview(null);
      setConfirmOpen(true);
    }
  };

  const handleDeleteReview = async (id: string) => {
    console.log('Page handleDeleteReview', id);
    await deleteReview(id);
    setConfirmMsg('Отзыв удалён');
    setConfirmOpen(true);
  };

  const findReview = (id: string): ReviewItem | null => {
    const stack = [...reviews];
    while (stack.length) {
      const it = stack.shift()!;
      if (it.id === id) return it;
      if (it.replies && it.replies.length) stack.push(...it.replies);
    }
    return null;
  };

  const handleStatusChange = async (id: string, status: ReviewItem['status']) => {
    const is_moderated = status === 'Опубликован' ? true : false;
    await updateReview(id, { status, is_moderated } as any);
  };

  return (
    <div className="p-6 sm:p-8 dark:bg-[#0a0a0f] min-h-[743px] overflow-x-hidden relative">
      <div className="pointer-events-none absolute -right-10 -top-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 opacity-30 blur-3xl animate-float" />
     <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between max-md:mt-5">
  <div>
    <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 dark:from-pink-400 dark:to-indigo-300">
      Отзывы
    </h1>
    <div className="mt-2 flex items-center gap-3">
      <p className="text-sm text-gray-600 sm:text-base dark:text-gray-400">Управление отзывами клиентов</p>
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/6 text-sm font-medium shadow-sm">
        <strong className="text-indigo-600">{reviews.length}</strong>
        <span className="text-gray-500">отзывов</span>
      </span>
    </div>
  </div>

  <button
    onClick={() => setShowAddForm(!showAddForm)}
    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full
               bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold transition-all transform hover:-translate-y-0.5 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
  >
    <Plus className="w-5 h-5" />
    <span className="hidden sm:inline">Добавить отзыв</span>
    <span className="sm:hidden">Добавить</span>
  </button>
</div>


      {showAddForm && (
        <ReviewForm
          tours={tours.map(t => ({ id: t.id, name: t.title }))}
          values={formValues}
          onChange={updateFormValues}
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddReview}
          currentUserName={currentUserName ?? undefined}
          currentUserAvatar={currentUserAvatar ?? undefined}
          currentUserRole={currentUserRole ?? undefined}
        />
      )}

      <ReviewsList
        reviews={filteredReviews}
        userId={currentUserId}
        currentUserName={currentUserName}
        currentUserAvatar={currentUserAvatar}
        currentUserRole={currentUserRole}
        editingReview={editingReview}
        setEditingReview={setEditingReview}
        onDelete={handleDeleteReview}
        onUpdate={async (r) => {
          console.log('Page onUpdate called', r.id, r.comment);
          if (containsProfanity(r.comment)) {
            await updateReview(r.id, { comment: r.comment, is_moderated: false, status: 'Отклонен' } as any);
            setConfirmMsg('Отзыв отклонён из-за нецензурной лексики');
            setConfirmOpen(true);
          } else {
            await updateReview(r.id, { comment: r.comment, is_moderated: true, status: 'Опубликован' } as any);
            setConfirmMsg('Отзыв успешно обновлён и опубликован');
            setConfirmOpen(true);
          }
        }}
        onChangeStatus={handleStatusChange}
        loading={loadingReviews}
        loadingMore={loadingMore}
      />

      <div ref={sentinelRef} className="h-6" />
      <ConfirmModal open={confirmOpen} title="Готово" message={confirmMsg} onClose={() => setConfirmOpen(false)} />
    </div>
  );
}