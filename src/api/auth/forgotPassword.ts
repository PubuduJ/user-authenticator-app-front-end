import { METHODS, requestApi, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const forgotPassword = async (email: string) => {
  return responseHandler(await requestApi(METHODS.POST, URL.FORGOT_PASSWORD(email)));
}
