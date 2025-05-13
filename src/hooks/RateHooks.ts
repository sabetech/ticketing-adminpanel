import { useQuery } from "@tanstack/react-query"
import { Rate, PostpaidPayment } from "../Types/Rate";
import { getRates, getPaymentHistory } from "../Services/Rate";

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

export const usePaymentHistory = (dateRange: {from:string, to:string} | undefined) => {
    return useQuery<PostpaidPayment[]>({
        queryKey: ['paymentHistory', dateRange],
        queryFn: async () => {
            const response = await getPaymentHistory(dateRange);
            if ('data' in response) {
                return response.data as PostpaidPayment[]; // Ensure correct type
            }
            throw new Error('Failed to fetch payment history'); // Handle AppError
        }
    });
}
    
