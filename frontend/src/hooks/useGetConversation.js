import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversation = () => {
    const [loading,setLoading] = useState(false);
    const {searchConversations,setSearchConversations} = useConversation();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try{
                const res = await fetch("api/users",{
                    method:"GET",
                    headers:{"Content-Type":"application/json"}
                })
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setSearchConversations(data);
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        getConversations();
    },[]);
    return {loading,searchConversations};
}

export default useGetConversation;