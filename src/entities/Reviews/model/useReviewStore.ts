import { create } from 'zustand';
import { ReviewItem, ApiReview } from './types';
import { fetchReviews as fetchReviewsService, createReview as createReviewService, updateReview as updateReviewService, deleteReview as deleteReviewService } from './services/reviews';

interface ReviewStore {
  reviews: ReviewItem[];
  fetchReviews: () => Promise<void>;
  createReview: (r: Partial<ReviewItem>) => Promise<ReviewItem | null>;
  updateReview: (id: string, payload: Partial<ReviewItem>) => Promise<ReviewItem | null>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],
  fetchReviews: async () => {
    try {
      const data = await fetchReviewsService();
      const items: ApiReview[] = (data as any)?.items ?? [];
      const ui = items.map(mapApiToUi);
      set({ reviews: ui });
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  },
  createReview: async (r) => {
    try {
      const created = await createReviewService(r as Partial<ApiReview>);
      const ui = mapApiToUi(created);
      set((s) => ({ reviews: [ui, ...s.reviews] }));
      return ui;
    } catch (err) {
      console.error('Failed to create review', err);
      return null;
    }
  },
  updateReview: async (id, payload) => {
    try {
      const updated = await updateReviewService(id, payload as Partial<ApiReview>);
      const ui = mapApiToUi(updated);
      set((s) => ({ reviews: s.reviews.map(rv => rv.id === ui.id ? ui : rv) }));
      return ui;
    } catch (err) {
      console.error('Failed to update review', err);
      return null;
    }
  },
  deleteReview: async (id) => {
    try {
      await deleteReviewService(id);
      set((s) => ({ reviews: s.reviews.filter(r => r.id !== id) }));
    } catch (err) {
      console.error('Failed to delete review', err);
    }
  }
}));

function mapApiToUi(a: ApiReview): ReviewItem {
  return {
    id: String(a.id),
    target_type: a.target_type,
    target_id: a.target_id,
    rating: a.rating,
    comment: a.comment,
    author_id: a.author_id,
    created_at: a.created_at,
    is_moderated: a.is_moderated,
    userName: a.author_id ? `User ${a.author_id}` : undefined,
    tourName: `${a.target_type} ${a.target_id}`,
    date: a.created_at ? a.created_at.split('T')[0] : undefined,
    likes: 0,
    status: a.is_moderated ? 'Опубликован' : 'На модерации',
    ownerId: a.author_id ? String(a.author_id) : undefined,
  };
}
