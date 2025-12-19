import {create} from 'zustand';
import instance from '../../../shared/lib/axios/axios';
import { TourType } from './type';

export const useTourStore = create<{
    tours: TourType[],
    loading: boolean,
    fetchTours: (params?:Record<string, string | number | undefined|null> | undefined) => Promise<any>,
    addTour: (tour: TourType
    ) => Promise<void>,
    updateTour: (id: string, updatedTour: any) => Promise<void>,
    getTourById:(id: string|number)=>Promise<any>,
    deleteTour: (id: string) => Promise<void>,
    
}>((set) => ({
    tours: [] as TourType[],
    loading: false,
    getTourById :async (id:string|number) => {
        
        set({loading:true});
        let res = instance.get(`/tours/${id}`)
        res.then(re=>{
            set({loading:false});
        })
        return res
    },
    fetchTours: async (params?:Record<string, string | number | undefined|null> | undefined) => {
        
        set({loading:true});
        let res = instance.get('/tours/',{params: params?params:[]})
        res.then(response => set({ tours: response.data.items ,loading:false})).catch(error => {
            console.error("Failed to fetch tours:", error);
            set({loading:false});
        });
        return res
    },
    addTour: async (tour: TourType) => {
        try {
            let res = await instance.post('/tours/', tour);
        } catch (error) {
            console.error("Failed to add tour:", error);
        }
    },
    updateTour: async (tourId: string, updatedTour:TourType) => {
        let {company_id,id,rating, ...clean} = updatedTour
        try {
            let res = await instance.patch(`/tours/${tourId}/`,clean);
        } catch (error) {
            console.error("Failed to update tour:", error);
        }
    },
    deleteTour: async (id: string) => {
        try {
            let res = await instance.delete(`/tours/${id}/`);
        } catch (error) {
            console.error("Failed to delete tour:", error);
        }
    },
}));
