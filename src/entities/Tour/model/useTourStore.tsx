import {create} from 'zustand';
import {toursData} from "../../../shared/lib/data/fakeData.json"
import { Tour } from '../../../app/App';
export const useTourStore = create<{
    tours: Tour[],
    setTours: (tours: Tour[]) => void,
}>((set) => ({
    tours: toursData as Tour[],
    setTours: (tours) => set({ tours }),
}));