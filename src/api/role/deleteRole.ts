import { METHODS, requestApiWithSecurity, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const deleteRole = async (roleId: number) => {
    return responseHandler(await requestApiWithSecurity(METHODS.DELETE, URL.DELETE_ROLE_BY_ID(`${roleId}`)));
}
