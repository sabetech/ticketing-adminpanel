import * as api from './requests/API'
import { TAuthUserResponse, TLoginValues } from "../Types/Auth"

export const login = async ({email, password}:  TLoginValues ): Promise<TAuthUserResponse> => {
    return (await api.login({email, password})).data;
}