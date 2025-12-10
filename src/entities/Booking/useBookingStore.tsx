import { create } from "zustand";
import axios from "../../shared/lib/axios/axios";
import instance from "../../shared/lib/axios/axios";

interface BookingState {
    bookings: Booking[];
    fetchBookings: () => Promise<void>;
    addBooking: (booking: Booking) => Promise<void>;
    updateBooking: (id: string, updatedData: Partial<Booking>) => Promise<void>;
    removeBooking: (id: string) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
    bookings: [],
    fetchBookings: async () => {
        try {
            const response = await instance.get<Booking[]>('/bookings');
            set({ bookings: response.data.items });
        }
        catch (error) {
            console.error("Failed to fetch bookings:", error);
        }
    },
    addBooking: async (booking: Booking) => {
        try {
            const response = await instance.post<Booking>('/bookings', booking);
            set((state) => ({ bookings: [...state.bookings, response.data] }));
        }
        catch (error) {
            console.error("Failed to add booking:", error);
        }   
    },
    updateBooking: async (id: string, updatedData: Partial<Booking>) => {
        try {
            const response = await instance.put<Booking>(`/bookings/${id}`, updatedData);
            set((state) => ({ bookings: state.bookings.map(b => b.id === id ? response.data : b) }));
        }
        catch (error) {
            console.error("Failed to update booking:", error);
        }
    },
    removeBooking: async (id: string) => {
        try {
            await axios.delete(`/bookings/${id}`);
            set((state) => ({ bookings: state.bookings.filter(b => b.id !== id) }));
        }
        catch (error) {
            console.error("Failed to remove booking:", error);
        }
    },
}));
