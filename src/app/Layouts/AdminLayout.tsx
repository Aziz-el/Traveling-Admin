import useAuthStore from '../../features/Auth/model/services/checkAuth'
import { redirect, useNavigate } from 'react-router'

export default function AdminLayout({children}:{children:any}) {
    let {role} = useAuthStore()
    const navigate = useNavigate()
    if(role != "admin"){
        navigate("/")
    }
    else{
        return (
    <>
    {children}
    </>
  )
    }
  
}
