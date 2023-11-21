import {responseHandler} from "../util/responseHandler";
import {METHODS, requestApiWithSecurity, URL} from "../index";

export const getUsersByQuery = async (query: string) => {
    return responseHandler(await requestApiWithSecurity(METHODS.GET, URL.GET_USERS_BY_QUERY(query)));
}