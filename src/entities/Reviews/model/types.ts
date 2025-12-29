export type ReviewStatus = 'Опубликован' | 'На модерации' | 'Отклонен';

export interface ApiReview {
  id: number;
  target_type: string;
  target_id: number;
  rating: number;
  comment: string;
  author_id?: number;
  created_at?: string;
  is_moderated?: boolean;
  liked_by?: number[];
  disliked_by?: number[];
  parent_id?: number | null;
}

export interface ReviewsResponse {
  items: ApiReview[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ReviewItem {
  id: string;
  target_type: string;
  target_id: number;
  rating: number;
  comment: string;
  author_id?: number;
  created_at?: string;
  is_moderated?: boolean;

  userName?: string;
  userAvatar?: string;
  tourName?: string;
  date?: string;
  likes?: number;
  dislikes?: number;
  likedBy?: string[];
  dislikedBy?: string[];
  replies?: ReviewItem[];
  status?: ReviewStatus;
  ownerId?: string;
  parentId?: string | null;
}
