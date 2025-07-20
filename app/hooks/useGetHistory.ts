import {  useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetHistory = () =>{
    return useQuery({
        queryKey: ['GET_HISTORY'],
         queryFn: async () =>{
            const response =  await axios.get('/predict/history/quynhnhu')
            return response.data 
        }
    })
}