import * as api from './requests/API';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';
import { Rate, PayOnCreditRequest } from '../Types/Rate';


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

export const deleteRate = async (rateId: number) => {
    const userInfo = getUserInfo()
    if (userInfo)
        return ( await api.deleteRequest(`/rates/${rateId}`, {'Authorization': 'Bearer '+userInfo.token})).data
    return new Promise<AppError>((_, reject) => {
        reject("User is not logged In");
    })
}

export const editRate = async (values: Rate, rateId: number) => {
    const userInfo = getUserInfo()
    if (userInfo)
        return ( await api.postWithFile(`/rates/${rateId}/edit`, values, {'Authorization': 'Bearer '+userInfo.token})).data
    return new Promise<AppError>((_, reject) => {
        reject("User is not logged In");
    })
}

export const addRate = async (values: Rate) => {

    console.log("ADD RATE REQUEST::", values);

    const userInfo = getUserInfo()
    if (userInfo)
        return ( await api.postWithFile(`/rates/create`, values, {'Authorization': 'Bearer '+userInfo.token})).data
    return new Promise<AppError>((_, reject) => {
        reject("User is not logged In");
    })
}

export const getPostPaidRates = async (selectedStation: number): Promise<RemoteResponse<Rate[]> | AppError> => {
    const userInfo = getUserInfo()
    if (userInfo)
        return ( await api.get(`/rates?station=${selectedStation}&postpaid=true`, {'Authorization': 'Bearer '+userInfo.token})).data
    return new Promise<AppError>((_, reject) => {
        reject("User is not logged In");
    })
}

export const makePayment = async (values: PayOnCreditRequest) => {
    const userInfo = getUserInfo()
    if (userInfo)
        return (await api.post(`/rates/makepayment`, values, {'Authorization': 'Bearer '+userInfo.token}))
    return new Promise<AppError>((_, reject) => {
        reject("User is not logged In");
    })
}

//export const addOrEditRate = async (values, rateId: number): Promise<