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
