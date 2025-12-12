export interface UserItem {
  email: string;
  full_name: string;
  phone: string;
  role: 'client' | 'admin' | string; 
  id: number;
  is_active: boolean;
}

export interface UsersResponse {
  items: UserItem[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}
