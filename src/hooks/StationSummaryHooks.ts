import { useQuery } from "@tanstack/react-query";
import * as queryKeys from "../Constants/Querykeys"
import { StationSummaryAggregates } from "../Types/Station";
import * as apiClient from "../Services/Station";


export const useGetStationSummaryAggregates = ({from, to}: {from: string, to: string}) => {
    return useQuery<StationSummaryAggregates[]>({
        queryKey: [queryKeys.STATION_SUMMARY_AGGREGATES_KEY, from, to],
        queryFn: async () => {
            const response = await apiClient.getStationSummary({from, to});
            if ('data' in response) {
                return response.data;
            } else {
                throw new Error('Failed to fetch ticket aggregates');
            }
        }
    });
}