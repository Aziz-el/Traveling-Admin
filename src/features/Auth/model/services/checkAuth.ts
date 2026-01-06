import { create } from 'zustand'
import instance from '../../../../shared/lib/axios/axios'

type AuthState = {
  data: any
  role: string | null
  loading: boolean
  checkAuth: () => Promise<void>
}

 const useAuthStore = create<AuthState>((set) => ({
    data: null,
  role: null,
  loading: false,

  checkAuth: async () => {
    try {
      set({ loading: true })
      const res = await instance.get('/auth/check-auth')
      set({
        role: res.data.role,
        loading: false
      })
    } catch (e) {
      set({
        role: null,
        loading: false
      })
    }
  }
}))

export default useAuthStore