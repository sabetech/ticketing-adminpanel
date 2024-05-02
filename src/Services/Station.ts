import * as api from './requests/API';
import { Station, StationSummary } from '../Types/Station';
import { AppError, RemoteResponse } from '../Types/Remote';
import { getUserInfo } from '../Utils/Auth';

export const getStations = async (): Promise<RemoteResponse<Station[]> | AppError> => (await api.get(`/station/all`, {})).data
  
export const getStationSummary = async ({from, to}: {from: string, to: string}) => {
    const userInfo = getUserInfo()  
    
    console.log("ARE CALLED??");

    if (userInfo)
        return (await api.get(`/station/summary?from=${from}&to=${to}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}
    