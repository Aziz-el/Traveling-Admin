import { create } from "zustand"
import { ApplicationType } from "./types"
import instance from "../../../shared/lib/axios/axios"

type ApplicationState = {
    applications:ApplicationType[],
    loading:boolean,
    fetchApplications:(params?:Record<string,string|number>)=>void,
    createApplication:(data:{})=>void,
    approveApplication:(id:number)=>void,
    rejectApplication:(id:number,reason:string)=>void,
    deleteApplication:(id:number)=>void,
    getApplicationById:(id:number)=>Promise<any>,
}

export const useApplicationStore = create<ApplicationState>((set,get) => ({
    applications:[],
    loading:false,
    fetchApplications: (params?:Record<string,string|number>) => {
        set({loading:true})
        let res = instance.get("/applications/",{
            params:params?params:{}
        })
        res.then((res)=>{
            set({applications:res.data.items,loading:false})
        })
    },
    createApplication:(data:{}) =>{
        set({loading:true})
        let res = instance.post("/applications/",data)
        res.then((res)=>{
            set({loading:false})
            get().fetchApplications()
        })
    },
    approveApplication:(id:number) =>{
        set({loading:true})
        let res = instance.post(`/applications/${id}/approve`)
        res.then((res)=>{
            set({loading:false})
            get().fetchApplications()
        })
    },
    rejectApplication:(id:number,reason:string) =>{
        set({loading:true})
        let res = instance.post(`/applications/${id}/reject`,{
            rejection_reason:reason
        })
         res.then((res)=>{
            set({loading:false})
            get().fetchApplications()
        })
    },
    deleteApplication:(id:number)=>{
        set({loading:true})
        let res = instance.delete(`/applications/${id}`)
         res.then((res)=>{
            set({loading:false})
            get().fetchApplications()
        })
    },
    getApplicationById : (id:number) => {
        set({loading:true})
        let res = instance.get(`/applications/${id}`)
        return res
    },

}))