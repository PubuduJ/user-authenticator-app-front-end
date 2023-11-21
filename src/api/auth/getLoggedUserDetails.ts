import {METHODS, requestApiWithoutSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const getLoggedUserDetails = async (email: string) => {
    return responseHandler(await requestApiWithoutSecurity(METHODS.GET, URL.GET_LOGGED_USER_DETAILS(email)));
}
