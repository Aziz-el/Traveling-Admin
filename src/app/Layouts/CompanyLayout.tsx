import useAuthStore from '../../features/Auth/model/services/checkAuth'
import { redirect, useNavigate } from 'react-router'

export default function CompanyLayout({children}:{children:any}) {
    let {role} = useAuthStore()
    const navigate = useNavigate()
    if(role == "client"){
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
