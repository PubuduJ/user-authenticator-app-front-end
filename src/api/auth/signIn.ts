import {METHODS, requestApiWithoutSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";

export const signIn = async (email: string, password: string) => {
  return responseHandler(await requestApiWithoutSecurity(METHODS.POST, URL.AUTHENTICATE(), {email: email, password: password}));
}
