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
  id: 0,
  company_id: 0,
  rating: 0
}

export interface TourProps {
  tour?: Tour;
  onUpdateTour: (id: string, tour: Tour) => void;
  onDeleteTour: (id: string) => void;
  categoryImages: Record<string, string>;
  onSelectTour?: (id: string) => void;
  selectedTourId?: string | null;
}