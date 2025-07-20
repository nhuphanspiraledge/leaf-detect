import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const usePredict = () => {
  return useMutation({
    mutationKey: ["PREDICT"],
    mutationFn: async(formData: FormData)=>{
        const response = await axios.post('/predict',formData)
        return response.data
    }
  })
}
