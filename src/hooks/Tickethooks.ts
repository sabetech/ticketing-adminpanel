import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TFilterType, TicketPaginatedResponse, Ticket } from "../Types/Tickets"
import * as queryKeys from "../Constants/Querykeys"
import * as apiClient from "../Services/TicketService";
import { TicketAggregates } from "../Types/Tickets"

const _getTickets = async (filter? : TFilterType) => {
    
    const data = await apiClient.getTickets(filter)
    if ('data' in data) {
        return data.data;
    } else {
        throw new Error('Failed to fetch tickets');
    }
}

// export const useGetTicketsSearch = (filter?: TFilterType) => {
//     return  useQuery<Ticket[]>(
//         { 
//             queryKey: [queryKeys.TICKETS_SEARCH_KEY, JSON.stringify(filter)],
//             queryFn: async () => {
//                 return await _getIndexedTickets(filter)
//             },
//         }
//     )
// }

export const useGetTickets = (filter?: TFilterType) => {
    console.log("Filter in useGetTickets:: ", filter)
    return  useQuery<TicketPaginatedResponse>(
        { 
            queryKey: [queryKeys.TICKETS_KEY, JSON.stringify(filter)],
            queryFn: async () => {
                return await _getTickets(filter)
            },
        }
    )
}

export const useGetSearchIndexes = (field: string, value: string) => {
    return useQuery<string[]>(
        {
            queryKey: [queryKeys.TICKETS_INDEXES_KEY, field, value],
            queryFn: async () => {
                return await _getTicketIndexes(field, value)
            }
        }
    )
}

const _getTicketIndexes = async (field: string, value: string) => {
    const values = await apiClient.getTicketIndexes(field, value)
    
    if ('data' in values) {
        return values.data
    } else {
        throw new Error('Failed to fetch ticket indexes')
    }
}

export const useSubmitEditedTicket = (id: number, options?: {
    
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;

}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ticket: Ticket) => { 
            console.log("Bkalc:: ", ticket);
            console.log("Ticket ID:: ", id);

            return await apiClient.editTicket(id, ticket)
        },
        onSuccess: (data) => {
            options.onSuccess?.(data);
            queryClient.invalidateQueries({queryKey: [queryKeys.TICKETS_KEY]});
        },
        onError: (error) => {
            options.onError?.(error);
        }
    });
}

export const useGetTicketAggregates = (filters?: TFilterType) => {
    return useQuery<TicketAggregates>({
        queryKey: [queryKeys.TICKETS_AGGREGATES_KEY, filters],
        queryFn: async () => {
            const response = await apiClient.getTicketAggregates(filters);
            if ('data' in response) {
                return response.data;
            } else {
                throw new Error('Failed to fetch ticket aggregates');
            }
        }
    })
}

export const useDeleteTicket = ( options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}) => {
    
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id: number) => { 
            return await apiClient.deleteTicket(id)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: [queryKeys.TICKETS_KEY]});
            options.onSuccess?.(data);
        },
        onError: (error) => {
            options.onError?.(error);
        }
    });
}

export const useBulkDeleteTickets = ( options?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ids: number[]) => { 
            return await apiClient.deleteTickets(ids)
        },
        onSuccess: (data) => {
            options.onSuccess?.(data);
            queryClient.invalidateQueries({queryKey: [queryKeys.TICKETS_KEY]});
        },
        onError: (error) => {
            options.onError?.(error);
        }
    });
}