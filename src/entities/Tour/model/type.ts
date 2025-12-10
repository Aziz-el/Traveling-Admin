import { Tour } from "../../../app/App";

export interface TourType {
 title: "string",
  image_url: "string",
  description: "string",
  schedule: {
    additionalProp1: {}
  },
  price: 0,
  location: "string",
  duration: "string",
  id: string,
  company_id: 0,
  rating: 0,
  is_active: true,
  capacity: 0
}

export interface TourProps {
  tour?: TourType;
  categoryImages: Record<string, string>;
  onSelectTour?: (id: string) => void;
  selectedTourId?: string | null;
}