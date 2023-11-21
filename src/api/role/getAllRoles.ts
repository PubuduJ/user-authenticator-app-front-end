import {responseHandler} from "../util/responseHandler";
import {METHODS, requestApiWithSecurity, URL} from "../index";

export const getAllRoles = async () => {
    return responseHandler(await requestApiWithSecurity(METHODS.GET, URL.GET_ALL_ROLES()));
}