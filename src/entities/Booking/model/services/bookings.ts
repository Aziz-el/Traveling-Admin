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

  const response = await instance.post<BookingApi>('/bookings', body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const updateBooking = async (id: number | string, payload: Partial<BookingApi>): Promise<BookingApi> => {
  const body = { ...payload, date: payload.date ? new Date(payload.date).toISOString() : undefined } as Partial<BookingApi>;
  try {
    const response = await instance.patch<BookingApi>(`/bookings/${id}/status`, body 
      , { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      const response = await instance.put<BookingApi>(`/bookings/${id}`, body, { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    }
    throw err;
  }
};

export const deleteBooking = async (id: number | string): Promise<void> => {
  try {
    await instance.delete(`/bookings/${id}`);
    return;
  } catch (err: any) {
    if (err?.response?.status === 405) {
      try {
        await instance.post(`/bookings/${id}/delete`);
        return;
      } catch (_) {}
      try {
        await instance.post(`/bookings/${id}`, {}, { headers: { 'X-HTTP-Method-Override': 'DELETE' } });
        return;
      } catch (_) {}
    }
    throw err;
  }
};

export const fetchBookingById = async (id: number | string): Promise<BookingApi> => {
  const response = await instance.get<BookingApi>(`/bookings/${id}`);
  return response.data;
};

export default {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};
