import { Agent } from "./Agent"
import { Station } from "./Station"

export type Ticket = {
    id: number
    amount: string
    agent_name: string,
    paid: boolean,
    car_number: string,
    title: string,
    issued_date_time: string,
    name: string,
    rate_title: string,
    rate: {
        id: number
        on_credit: boolean
        title: string
        rate_type: string
        is_postpaid: boolean
        amount: number
    },
    agent: Agent,
    station: Station
}

export type TicketPaginatedResponse = {
    data: Ticket[],
    current_page: number,
    first_page_url: string,
    next_page_url: string,
    last_page_url: string,
    from: number,
    to: number,
    last_page: number
    total: number,
    prev_page_url: string,
    path: string
}

export type TFilterType = {
    [key: string]: string | number | string[] | number[]
}