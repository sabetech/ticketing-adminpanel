import * as api from './requests/API';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';
import { Agent, TAgentOnlineStatus, TAgentTicketInfo } from '../Types/Agent'

export const getAgentCount = async (date: string): Promise<RemoteResponse<number> | AppError> => {
    const userInfo = getUserInfo()
    
    if (userInfo)
        return ( await api.get(`/agent/count?date=${date}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getAgentOnlineStatus = async (): Promise<RemoteResponse<TAgentOnlineStatus[]> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/agent/onlinestatus`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}

export const getAgentList = async (): Promise<RemoteResponse<Agent[]> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/agent/all`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}

export const getAgentDetail = async (agentId: string | undefined, dateRange: {from:string, to: string} | undefined): Promise<RemoteResponse<TAgentTicketInfo> | AppError> => {
    
    if (typeof agentId == 'undefined') 
        return new Promise<AppError>((_, reject) => {
            reject("Id id undefined. Specify Agent ID");
        });
    
    let id = parseInt(agentId);

    const userInfo = getUserInfo();

    if (userInfo) {
        if (typeof dateRange === 'undefined')
            return (await api.get(`/agent/${id}/detail`, {'Authorization': 'Bearer '+userInfo.token})).data
        return (await api.get(`/agent/${id}/detail?from=${dateRange?.from}&to=${dateRange?.to}`, {'Authorization': 'Bearer '+userInfo.token})).data
    }
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}