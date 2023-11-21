import {METHODS, requestApiWithSecurity, URL} from "..";
import {responseHandler} from "../util/responseHandler";
import {Role} from "../../components/common/CreateEditViewUser";

export const createRole = async (body: Role) => {
    return responseHandler(await requestApiWithSecurity(METHODS.POST, URL.CREATE_ROLE(), body));
}