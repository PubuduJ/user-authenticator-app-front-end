import { METHODS, requestApiWithSecurity, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const createUser = async (body: {}) => {
    return responseHandler(await requestApiWithSecurity(METHODS.POST, URL.CREATE_USER(), body));
}