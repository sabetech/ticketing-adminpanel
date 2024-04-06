import * as api from './requests/API'
import { TAuthUserResponse, TLoginValues } from "../Types/Auth"
import { AppError } from '../Types/Remote';
import { getUserInfo } from '../Utils/Auth';

export const login = async ({email, password}:  TLoginValues ): Promise<TAuthUserResponse> => {
    return (await api.login({email, password})).data;
}

export const logout = async () => {

    const userInfo = getUserInfo();

    if (userInfo)
        return (await api.logout(userInfo.token)).data
    else
        return new Promise<AppError>((_, reject) => {
            reject("User is not logged In");
        });
}