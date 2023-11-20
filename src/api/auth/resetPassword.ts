import {METHODS, requestApiWithoutSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const resetPassword = async (email: string, temporaryPassword: string, newPassword: string) => {
    return responseHandler(await requestApiWithoutSecurity(METHODS.POST, URL.RESET_PASSWORD(), {
        email : email,
        temporaryPassword: temporaryPassword,
        newPassword: newPassword
    }));
}