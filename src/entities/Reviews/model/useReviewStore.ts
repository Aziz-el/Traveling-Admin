import { create } from 'zustand';
import { ReviewItem, ApiReview } from './types';
import { fetchReviews as fetchReviewsService, createReview as createReviewService, updateReview as updateReviewService, deleteReview as deleteReviewService } from './services/reviews';

interface ReviewStore {
  reviews: ReviewItem[]; 
  allItems: ReviewItem[]; 
  page: number;
  perPage: number;
  hasNext: boolean;
  loading: boolean; 
  loadingMore: boolean; 
  fetchReviews: (page?: number, perPage?: number, append?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  resetReviews: () => void;
  createReview: (r: Partial<ReviewItem>) => Promise<ReviewItem | null>;
  updateReview: (id: string, payload: Partial<ReviewItem>) => Promise<ReviewItem | null>;
  deleteReview: (id: string) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: [],
  allItems: [],
  page: 1,
  perPage: 10,
  hasNext: false,
  loading: false,
  loadingMore: false,

  fetchReviews: async (page = 1, perPage = 10, append = false) => {
    try {
      if (append) set({ loadingMore: true }); else set({ loading: true });
      const data = await fetchReviewsService({ page, per_page: perPage });
      const items: ApiReview[] = (data as any)?.items ?? [];
      const uiItems: ReviewItem[] = items.map(mapApiToUi);

      set((s) => {
        const map = new Map<string, ReviewItem>();
        const base = append ? s.allItems : [];
        base.forEach(it => map.set(it.id, it));
        uiItems.forEach(it => map.set(it.id, it));
        const merged = Array.from(map.values());

        const nodeMap = new Map<string, ReviewItem>();
        merged.forEach(item => nodeMap.set(item.id, { ...item, replies: item.replies || [] }));
        const roots: ReviewItem[] = [];
        nodeMap.forEach(item => {
          if (item.parentId) {
            const parent = nodeMap.get(item.parentId!);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(item);
            } else {
              roots.push(item);
            }
          } else {
            roots.push(item);
          }
        });

        return {
          allItems: merged,
          reviews: roots,
          page: data.page ?? page,
          perPage: data.per_page ?? perPage,
          hasNext: (data as any).has_next ?? false,
        } as any;
      });
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      if (append) set({ loadingMore: false }); else set({ loading: false });
    }
  },

  loadMore: async () => {
    const s = get();
    if (!s.hasNext || s.loadingMore) return;
    await s.fetchReviews(s.page + 1, s.perPage, true);
  },

  resetReviews: () => {
    set({ allItems: [], reviews: [], page: 1, hasNext: false });
  },

  createReview: async (r) => {
    try {
      const created = await createReviewService(r as unknown as Partial<ApiReview>);
      const ui = mapApiToUi(created);
      set((s) => {
        const merged = [ui, ...s.allItems.filter(it => it.id !== ui.id)];
        const nodeMap = new Map<string, ReviewItem>();
        merged.forEach(item => nodeMap.set(item.id, { ...item, replies: item.replies || [] }));
        const roots: ReviewItem[] = [];
        nodeMap.forEach(item => {
          if (item.parentId) {
            const parent = nodeMap.get(item.parentId!);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(item);
            } else {
              roots.push(item);
            }
          } else {
            roots.push(item);
          }
        });
        return { allItems: merged, reviews: roots } as any;
      });
      return ui;
    } catch (err) {
      console.error('Failed to create review', err);
      return null;
    }
  },

  updateReview: async (id, payload) => {
    try {
      let updated: ApiReview | null = null;
      try {
        updated = await updateReviewService(id, payload as unknown as Partial<ApiReview>);
      } catch (e) {
        console.debug('Partial update failed or ignored by backend, applying local update only');
      }

      const ui = updated ? mapApiToUi(updated) : ({} as ReviewItem);

      set((s) => {
        const merged = s.allItems.map(it => it.id === id ? ({ ...it, ...ui, ...(payload as any), id } as ReviewItem) : it);
        const nodeMap = new Map<string, ReviewItem>();
        merged.forEach(item => nodeMap.set(item.id, { ...item, replies: item.replies || [] }));
        const roots: ReviewItem[] = [];
        nodeMap.forEach(item => {
          if (item.parentId) {
            const parent = nodeMap.get(item.parentId!);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(item);
            } else {
              roots.push(item);
            }
          } else {
            roots.push(item);
          }
        });
        return { allItems: merged, reviews: roots } as any;
      });

      return { ...(ui.id ? ui : {} as ReviewItem), ...(payload as any), id } as ReviewItem;
    } catch (err) {
      console.error('Failed to update review', err);
      return null;
    }
  },

  deleteReview: async (id) => {
    try {
      await deleteReviewService(id);
      set((s) => {
        const merged = s.allItems.filter(it => it.id !== id);
        const nodeMap = new Map<string, ReviewItem>();
        merged.forEach(item => nodeMap.set(item.id, { ...item, replies: item.replies || [] }));
        const roots: ReviewItem[] = [];
        nodeMap.forEach(item => {
          if (item.parentId) {
            const parent = nodeMap.get(item.parentId!);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(item);
            } else {
              roots.push(item);
            }
          } else {
            roots.push(item);
          }
        });
        return { allItems: merged, reviews: roots } as any;
      });
    } catch (err) {
      console.error('Failed to delete review', err);
    }
  }
}));


function mapApiToUi(a: ApiReview): ReviewItem {
  const likedBy = (a as any).liked_by ? (a as any).liked_by.map((x: number) => String(x)) : [];
  const dislikedBy = (a as any).disliked_by ? (a as any).disliked_by.map((x: number) => String(x)) : [];
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
    status: a.is_moderated ? 'Опубликован' : 'На модерации',
    ownerId: a.author_id ? String(a.author_id) : undefined,
    parentId: (a as any).parent_id ? String((a as any).parent_id) : null,
  };
}
