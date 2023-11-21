import { METHODS, requestApiWithSecurity, URL } from "..";
import {responseHandler} from "../util/responseHandler";

export const updateRole = async (body: {}) => {
    return responseHandler(await requestApiWithSecurity(METHODS.PATCH, URL.UPDATE_ROLE(), body));
}