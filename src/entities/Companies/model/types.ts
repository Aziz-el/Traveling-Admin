import { TourType } from "../../Tour/model/type";

export type Company = {
  id: number;
  name: string;
};
export interface CompanyForm {
  id?: number
  company_name: string
  company_address: string
  work_hours: string
  company_website: string
}
export interface MyCompanyType {
      name: string,
      address: string,
      work_hours: string,
      website: string,
      id: number,
      owner_id: number,
      tours: TourType[],
      tours_count: number
    }