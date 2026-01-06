import { Ticket } from "./Tickets"


export type Station = {
    id?: number,
    name: string,
    description: string,
    assembly: string,
}

export type StationSummary = {
    [key: string]: Ticket[] 
}

export type StationSummaryAggregates = {
    
    icon: string,
    is_postpaid: string,
    rate_id: number,
    rate_type: string,
    station_id: number,
    name: string,
    total_amount: string,
    ticket_count: string
    title: string,

}