import instance from '../../../../shared/lib/axios/axios';
import { BookingApi, BookingsListResponse } from '../type';

export const fetchBookings = async (): Promise<BookingsListResponse> => {
  const response = await instance.get<BookingsListResponse>('/bookings');
  return response.data;
};

export const createBooking = async (payload: Partial<BookingApi>): Promise<BookingApi> => {
  const body = {
    ...payload,
    date: payload.date ? new Date(payload.date).toISOString() : undefined,
  } as Partial<BookingApi>;

  console.log('createBooking body:', body);

  const response = await instance.post<BookingApi>('/bookings', body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const updateBooking = async (id: number | string, payload: Partial<BookingApi>): Promise<BookingApi> => {
  const response = await instance.put<BookingApi>(`/bookings/${id}`, payload);
  return response.data;
};

export const deleteBooking = async (id: number | string): Promise<void> => {
  await instance.delete(`/bookings/${id}`);
};

export default {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
