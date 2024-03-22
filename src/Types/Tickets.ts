export type Ticket = {
    id: number
    amount: string
    agent_name: string
    rate: {
        on_credit: boolean
    }
}