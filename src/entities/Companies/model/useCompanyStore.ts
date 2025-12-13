
import { create } from 'zustand'
import instance from '../../../shared/lib/axios/axios'
import { CompanyForm } from './types'

type Company = {
  id: number
  name: string
  address: string
  work_hours: string
  website: string
}

type CompaniesState = {
  companies: Company[]
  isLoading: boolean
  error: string | null
  fetchCompanies: () => Promise<void>
  addCompany: (data: CompanyForm) => Promise<void>
  updateCompany: (id: number | undefined, data: CompanyForm) => Promise<void>
  deleteCompany: (id: number) => Promise<void>
}

export const useCompaniesStore = create<CompaniesState>((set) => ({
  companies: [],
  isLoading: false,
  error: null,

  fetchCompanies: async () => {
    set({ isLoading: true })
    const res = await instance.get('/companies')
    set({ companies: res.data.items, isLoading: false })
  },

  addCompany: async (data) => {
    set({ isLoading: true })
    const res = await instance.post('/companies', data)
    set(state => ({
      companies: [...state.companies, res.data],
      isLoading: false
    }))
  },

  updateCompany: async (id, data) => {
    set({ isLoading: true })
    const res = await instance.patch(`/companies/${id}`, data)
    set(state => ({
      companies: state.companies.map(c => c.id === id ? res.data : c),
      isLoading: false
    }))
  },

  deleteCompany: async (id) => {
    set({ isLoading: true })
    await instance.delete(`/companies/${id}`)
    set(state => ({
      companies: state.companies.filter(c => c.id !== id),
      isLoading: false
    }))
  }
}))
