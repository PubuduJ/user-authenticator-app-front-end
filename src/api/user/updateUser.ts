import { METHODS, requestApiWithSecurity, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const updateUser = async (body: {}) => {
    return responseHandler(await requestApiWithSecurity(METHODS.PATCH, URL.UPDATE_USER(), body));
}