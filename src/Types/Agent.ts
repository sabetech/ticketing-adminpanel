import { Station } from "./Station"
import { Ticket } from "./Tickets"

export type Agent = {
    id: number
    fname: string,
    lname: string,
    stationInfo: Station,
    photo: string
}

export type AgentStationUser = {
    id: number
    fname: string,
    lname: string,
    photo: string,
    station_user: StationUser
}

type StationUser = {
    station: Station
}

export type TAgentOnlineStatus = {
    latest_online_at: string
    loggedin_at: string
    loggedout_at: string
    agent: {
        fname: string
        lname: string
    }
}

export type TAgentTicketInfo = {
    agent: AgentStationUser,
    tickets: Ticket[]
}