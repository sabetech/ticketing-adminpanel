import * as api from './requests/API';
import { Ticket } from '../Types/Tickets';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';


export const getTicketsIssued = async (date: string | string[] ): Promise<RemoteResponse<Ticket[]> | AppError> => {
    const userInfo = getUserInfo()

    if (userInfo)
        if  (typeof date == 'string')
            return ( await api.get(`/ticket/all?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
        else
            return ( await api.get(`/ticket/range?date_range=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getTicketCount = async (date: string): Promise<RemoteResponse<number> | AppError> => {
    const userInfo = getUserInfo()
    
    if (userInfo)
        return ( await api.get(`/ticket/count?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getTicketRevenue = async (date: string): Promise<RemoteResponse<number> | AppError> => {
    const userInfo = getUserInfo()

    if (userInfo)
        return ( await api.get(`/ticket/revenue?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getUnpaidAmount = async (date: string): Promise<RemoteResponse<number> | AppError> => {
    const userInfo = getUserInfo()

    if (userInfo)
        return ( await api.get(`/ticket/unpaidAmount?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getUnpaidTicket = async (date: string): Promise<RemoteResponse<number> | AppError> => {
    const userInfo = getUserInfo()

    if (userInfo)
        return ( await api.get(`/ticket/unpaidTickets?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getThirdPartyTickets = async (from?: string, to?: string): Promise<RemoteResponse<Ticket[]> | AppError> => {
    const userInfo = getUserInfo()  

    if (userInfo)
        return (await api.get(`/ticket/third-party-tickets?from=${from}&to=${to}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getTaskforceTickets = async (date: string[]): Promise<RemoteResponse<Ticket[]> | AppError> => {
    const userInfo = getUserInfo()  

    if (userInfo)
        return (await api.get(`/ticket/taskforce?from=${date[0]}&to=${date[1]}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const deleteTicket = async (ticketId: number) => {
    const userInfo = getUserInfo()  

    if (userInfo)
        return (await api.deleteRequest(`/ticket/${ticketId}/delete`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const deleteTickets = async (ticketsIds: number[]) => {
    const userInfo = getUserInfo()

    if (userInfo)
        return (await api.post(`/ticket/bulk-delete`, {tickets: ticketsIds}, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const editTicket = async (id: number, values: any) => {
    const userInfo = getUserInfo()  

    if (userInfo)
        return (await api.post(`/ticket/${id}/edit`, values, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const searchAutocomplete = async (field: string, searchTerm: string) => {
    const userInfo = getUserInfo()

    if (userInfo) 
        return (await api.get(`/ticket/searchAutoComplete?field=${field}&searchTerm=${searchTerm}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const searchTickets = async (field: string , searchTerm: string) => {
    const userInfo = getUserInfo()

    if (userInfo) 
        return (await api.get(`/ticket/search?field=${field}&searchTerm=${searchTerm}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}