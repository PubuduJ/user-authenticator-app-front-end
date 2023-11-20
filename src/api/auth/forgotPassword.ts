import {METHODS, requestApiWithoutSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const forgotPassword = async (email: string) => {
  return responseHandler(await requestApiWithoutSecurity(METHODS.POST, URL.FORGOT_PASSWORD(email)));
}
