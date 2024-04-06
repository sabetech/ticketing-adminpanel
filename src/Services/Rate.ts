import * as api from './requests/API';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';
import { Rate } from '../Types/Rate';


export const getRates = async (station: number | null = null): Promise<RemoteResponse<Rate[]> | AppError> => {
    const userInfo = getUserInfo()
    if (userInfo)
        if (!station)
            return ( await api.get(`/rates`, {'Authorization': 'Bearer '+userInfo.token})).data
        else
            return ( await api.get(`/rates?station=${station}`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        })
}