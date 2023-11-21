import {METHODS, requestApiWithSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const resetUserPassword = async (userId: number) => {
    return responseHandler(await requestApiWithSecurity(METHODS.POST, URL.RESET_PASSWORD_BY_USER_ID(`${userId}`)));
}
