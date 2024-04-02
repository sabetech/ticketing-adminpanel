import * as api from './requests/API';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';
import { Agent, TAgentOnlineStatus } from '../Types/Agent'

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