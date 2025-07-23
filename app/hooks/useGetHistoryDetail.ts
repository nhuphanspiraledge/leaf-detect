import {  useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetHistoryDetail = (recordId: number) =>{
    return useQuery({
        queryKey: ['HISTORY_DETAIL'],
        queryFn: async () =>{
            const response =  await axios.get(`/predict/history/detail/${recordId}`)
            return response.data 
        }
    })
}