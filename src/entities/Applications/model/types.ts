export type ApplicationType = {
  id: number
  user_id: number
  company_name: string
  company_address: string
  company_website: string
  work_hours: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  reviewed_at: string | null
  reviewed_by_admin_id: number | null
  rejection_reason: string | null
}
