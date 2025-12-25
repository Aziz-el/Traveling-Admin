import instance from "../../../../shared/lib/axios/axios";

export default  function checkAuth () : Promise<any> | undefined{
    try{
        let res  = instance.get("/auth/check-auth")
        return res
    }
    catch(err){
        return undefined
    }
}