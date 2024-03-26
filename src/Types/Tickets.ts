export type Ticket = {
    id: number
    amount: string
    agent_name: string,
    paid: boolean,
    rate: {
        on_credit: boolean
    }
}