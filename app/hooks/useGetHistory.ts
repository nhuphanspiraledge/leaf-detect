import {  useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetHistory = (username: string) =>{
    return useQuery({
        queryKey: ['GET_HISTORY'],
         queryFn: async () =>{
            const response =  await axios.get(`/predict/history/${username}`)
            return response.data 
        }
    })
}