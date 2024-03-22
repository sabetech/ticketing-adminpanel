import { TAuthUserResponse } from "../Types/Auth";
import * as constants from "../Constants/LocalStorageKeys";
import * as utils from "../Utils/Helpers";

export function signIn(userAuthInfo: TAuthUserResponse) {
    console.log("YEAAH::", userAuthInfo);
    localStorage.setItem(constants.AUTH_USER_INFO, JSON.stringify(userAuthInfo))
}

export function signOut() {
    localStorage.removeItem(constants.AUTH_USER_INFO);
}

export function getUserInfo(): TAuthUserResponse | false {
    return utils.safeParseJson<TAuthUserResponse>(localStorage.getItem(constants.AUTH_USER_INFO))  
}