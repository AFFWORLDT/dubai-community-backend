import api from "@/utils/ApiUrl";


export const signup = async(payload:any)=>{
    try {
        const res:any = await api.post("/api/v1/bookinguser/create",payload)
        return res;
    } catch (error:any) {
        throw error;
    }
}
export const login = async(payload:any)=>{
    try {
        const res:any = await api.post("/api/v1/bookinguser/login",payload)
        return res;
    } catch (error:any) {
        throw error;
    }
}

export const getuserdetails =async ()=>{
    try {
        const res:any = await api.get("/api/v1/bookinguser/get-user-details")
        return res;
    } catch (error:any) {
        throw error;
    }
}
 
export const updateUser = async (payload:any)=>{
    try {
        const res:any = await api.put("/api/v1/bookinguser/update",payload)
        return res;
    } catch (error:any) {
        throw error;
    }
}

export const ForgetPassword = async(payload:any)=>{
    try {
       const res = api.post("/api/v1/bookinguser/forget-password",payload)
       return res; 
    } catch (error:any) {
        throw new Error(error?.response?.data?.message); 

    }
}
export const ResetPass = async(payload:any)=>{
    try {
       const res = api.post("/api/v1/bookinguser/reset-password",payload)
       return res; 
    } catch (error:any) {
        throw new Error(error?.response?.data?.message); 

    }
}