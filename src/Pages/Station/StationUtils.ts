import { StationSummaryAggregates } from "../../Types/Station";

type Aggregates = {
    icon: string,
    is_postpaid: string,
    title: string,
    total: string,
    ticket_count: string
}


export type TransfromedStationSummaryAggregates = {
    name: string,
    ratetype: {
        type: string,
        aggregations: Aggregates[]
    }[]
}

export const transformStationSummaryAggregates = (data: StationSummaryAggregates[]): TransfromedStationSummaryAggregates[] => {
    
    let tempMap: Map<string, Map<string, Aggregates[]>> = new Map();

    for (const entry of data) {

        // 1. Ensure station exists
        if (!tempMap.has(entry.name)) {
            tempMap.set(entry.name, new Map());
        }

        if (entry.rate_type === "fixed" && entry.is_postpaid === "1") {
            entry.rate_type = "postpaid";
        }

        const rateTypeMap = tempMap.get(entry.name)!;

        if (!rateTypeMap.has(entry.rate_type)) {
            rateTypeMap.set(entry.rate_type, [] as Aggregates[]);
        }

        // 3. Push aggregation
        rateTypeMap.get(entry.rate_type)!.push({
            icon: entry.icon,
            is_postpaid: entry.is_postpaid,
            title: entry.title,
            total: entry.total_amount,
            ticket_count: entry.ticket_count,
        });
    }

    const result: TransfromedStationSummaryAggregates[] = Array.from(tempMap.entries()).map(
        ([stationName, rateMap]) => ({
            name: stationName,
            ratetype: Array.from(rateMap.entries()).map(([type, aggregations]) => ({
                type,
                aggregations,
            })),
        })
    );
    
    return result;
}