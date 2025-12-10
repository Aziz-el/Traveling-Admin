import {create} from 'zustand';
import { Tour } from '../../../app/App';
import instance from '../../../shared/lib/axios/axios';
import { TourType } from './type';
export const useTourStore = create<{
    tours: TourType[],
    fetchTours: () => void,
    addTour: (tour: Tour) => void,
    updateTour: (id: string, updatedTour: Tour) => void,
    deleteTour: (id: string) => void,
    
}>((set) => ({
    tours: [] as TourType[],
    fetchTours: async () => {
        let res = await instance.get('/tours')
        set({ tours: res.data.items });
    },
    addTour: async (tour: Tour) => {
        try {
            let res = await instance.post('/tours', tour);
        } catch (error) {
            console.error("Failed to add tour:", error);
        }
    },
    updateTour: async (id: string, updatedTour: Tour) => {
        try {
            let res = await instance.put(`/tours/${id}`, updatedTour);
        } catch (error) {
            console.error("Failed to update tour:", error);
        }
    },
    deleteTour: async (id: string) => {
        try {
            let res = await instance.delete(`/tours/${id}`);
        } catch (error) {
            console.error("Failed to delete tour:", error);
        }
    },
}));
