import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IChatRequest } from '../types';

export const useChat = () => {
  return useMutation({
    mutationKey: ["CHAT"],
    mutationFn: async(payload: IChatRequest)=>{
        const response = await axios.post('/chat',payload)
        return response.data
    }
  })
}
