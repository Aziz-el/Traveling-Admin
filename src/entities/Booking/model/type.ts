
export type BookingApi = {
  id: number;
  tour_id: number;
  participants_count: number;
  date: string; 
  user_id?: number;
  status?: string;
  created_at?: string;
};

export type Booking = BookingApi;

export type BookingsListResponse = {
  items: BookingApi[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};