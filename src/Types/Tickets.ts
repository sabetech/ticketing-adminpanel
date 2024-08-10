import { Agent } from "./Agent"

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
    },
    agent: Agent
}