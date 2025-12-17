import { create } from "zustand";
import {
    fetchBookings as fetchBookingsService,
    createBooking,
    updateBooking as updateBookingService,
    deleteBooking,
    fetchBookingById,
} from "./services/bookings";

import { Booking } from "./type";

interface BookingState {
    bookings: Booking[];
    fetchBookings: () => Promise<void>;
    fetchBooking: (id: number) => Promise<Booking | undefined>;
    addBooking: (booking: Partial<Booking>) => Promise<void>;
    updateBooking: (id: number, updatedData: Partial<Booking>) => Promise<void>;
    removeBooking: (id: number) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
    bookings: [],
    fetchBookings: async () => {
        try {
            const data = await fetchBookingsService();
            set({ bookings: data.items || [] });
        } catch (error) {
            console.debug("Failed to fetch bookings:", error);
        }
    },
    addBooking: async (booking: Partial<Booking>) => {
        try {
            const created = await createBooking(booking);
            set((state) => ({ bookings: [...state.bookings, created] }));
        } catch (error) {
            console.debug("Failed to add booking:", error);
            // notify in UI layer
            // toast.error('Не удалось создать бронирование');
        }
    },
    updateBooking: async (id: number, updatedData: Partial<Booking>) => {
        try {
            const updated = await updateBookingService(id, updatedData);
            set((state) => ({ bookings: state.bookings.map(b => (b.id === updated.id ? updated : b)) }));
        } catch (error) {
            console.debug("Failed to update booking:", error);
            // notify in UI layer
            // toast.error('Не удалось обновить бронирование');
        }
    },
    removeBooking: async (id: number) => {
        try {
            await deleteBooking(id);
            set((state) => ({ bookings: state.bookings.filter(b => b.id !== id) }));
        } catch (error) {
            console.debug("Failed to remove booking:", error);
            // notify in UI layer
            // toast.error('Не удалось удалить бронирование');
        }
    },
    fetchBooking: async (id: number) => {
        try {
            const existing = (get as any)().bookings.find((b: Booking) => b.id === Number(id));
            if (existing) return existing;
            const fetched = await fetchBookingById(id);
            set((state) => ({ bookings: [...state.bookings, fetched as Booking] }));
            return fetched as Booking;
        } catch (error) {
            console.debug('Failed to fetch booking by id', error);
            return undefined;
        }
    },
}));
