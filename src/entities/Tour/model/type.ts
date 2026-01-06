import { JSX } from "react/jsx-runtime";

export interface TourType {
  map(arg0: (tour: any) => JSX.Element): any;
 title: string,
  image_url: string,
  description: string,
  schedule: {
    [key: string]: {
      title: string,
      desc: string
    }
  },
  price: number,
  location: string,
  duration: string,
  latitude: number,
  longitude: number,
  id: string,
  company_id: number,
  rating: number,
  is_active: boolean,
  capacity: number
}

export interface TourProps {
  tour?: TourType;
  onSelectTour?: (id: string) => void;
  selectedTourId?: string | null;
}