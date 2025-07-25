import { getuserdetails } from "@/service/Auth";
import { useQuery } from "@tanstack/react-query";

const useUser = ()=>{
    const {data, error, isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: getuserdetails
    })
    return {data, error, isLoading}
}

export default useUser