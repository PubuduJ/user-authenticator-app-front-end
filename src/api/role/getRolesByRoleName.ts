import {responseHandler} from "../util/responseHandler";
import {METHODS, requestApiWithSecurity, URL} from "../index";

export const getRolesByRoleName = async (query: string) => {
    return responseHandler(await requestApiWithSecurity(METHODS.GET, URL.GET_ROLES_BY_ROLE_NAME(query)));
}