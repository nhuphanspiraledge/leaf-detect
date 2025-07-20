import {  useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useGetChatHistory = (username: string) =>{
    return useQuery({
        queryKey: ['CHAT_HISTORIES'],
        queryFn: async () =>{
            const response =  await axios.get(`/chat/history/${username}`)
            return response.data 
        }
    })
}