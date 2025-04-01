import { useQuery } from "@tanstack/react-query"
import { Rate } from "../Types/Rate";
import { getRates } from "../Services/Rate";
import { RemoteResponse } from "../Types/Remote";

export const useGetRates = () => {
    return useQuery<Rate[]>({
        queryKey: ['rates'],
        queryFn: async () => {
            const response = await getRates();
            if ('data' in response) {
                return response.data; // Extract and return Rate[]
            }
            throw new Error('Failed to fetch rates'); // Handle AppError
        }
    });
}
    
