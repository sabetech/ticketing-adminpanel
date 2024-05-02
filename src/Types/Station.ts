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