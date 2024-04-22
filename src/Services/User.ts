import * as api from './requests/API';
import { getUserInfo } from '../Utils/Auth';
import { AppError, RemoteResponse } from '../Types/Remote';
import { User, UserRequest, Role } from '../Types/User';

export const getAllUsers = async (): Promise<RemoteResponse<User[]> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/users/all`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}

export const deleteUser = async (userId: number): Promise<RemoteResponse<boolean> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/users/${userId}/delete`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}

export const addUser = async (values: UserRequest): Promise<RemoteResponse<User> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.post(`/users/create`, values, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}

export const editUser = async (userId: number): Promise<RemoteResponse<User> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/users/${userId}/edit`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}

export const getRoles = async (): Promise<RemoteResponse<Role[]> | AppError> => {
    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.get(`/users/roles`, {'Authorization': 'Bearer '+userInfo.token})).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}