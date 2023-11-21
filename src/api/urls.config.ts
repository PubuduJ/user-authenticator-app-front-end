export const AUTHENTICATE = () => "/auth/authenticate";
export const FORGOT_PASSWORD = (email: string) => `/auth/forgot/password/${email}`;
export const RESET_PASSWORD = () => `/auth/reset/password`;
export const CREATE_ROLE = () => "/roles";
export const UPDATE_ROLE = () => "/roles";
export const GET_ROLES_BY_ROLE_NAME = (query: string) => `/roles?q=${query}`;