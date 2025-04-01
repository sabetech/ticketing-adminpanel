import { CACHED_TICKETS } from "../Constants/LocalStorageKeys";
import { Ticket } from "../Types/Tickets";

export const useTicketCache = () => {
    const tickets = JSON.parse(localStorage.getItem(CACHED_TICKETS) || '[]') as Ticket[];
    const setTickets = (tickets: Ticket[]) => localStorage.setItem(CACHED_TICKETS, JSON.stringify(tickets));
    
    return {tickets, setTickets};
}