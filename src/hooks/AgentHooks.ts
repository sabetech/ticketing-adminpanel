import { Agent } from "../Types/Agent";
import { useQuery } from "@tanstack/react-query";
import  { getAgentList } from "../Services/AgentService"

export const useGetAgents = () => {
    return useQuery<Agent[]>({
        queryKey: ['agents'],
        queryFn: async () => {
            const response = await getAgentList();
            if ('data' in response) {
                return response.data; // Extract and return Rate[]
            }
            throw new Error('Failed to fetch rates'); // Handle AppError
        }
    });
};