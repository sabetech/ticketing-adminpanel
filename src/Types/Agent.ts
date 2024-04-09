import { Station } from "./Station"
import { Ticket } from "./Tickets"

export type Agent = {
    id: number
    fname: string,
    lname: string,
    stationInfo: Station,
    photo: string
}

export type TAgentOnlineStatus = {
    latest_online_at: string
    loggedin_at: string
    agent: {
        fname: string
        lname: string
    }
}

export type TAgentTicketInfo = {
    agent: Agent,
    tickets: Ticket[]
}