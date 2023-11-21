import {METHODS, requestApiWithSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const deleteUser = async (userId: number) => {
    return responseHandler(await requestApiWithSecurity(METHODS.DELETE, URL.DELETE_USER(`${userId}`)));
}
