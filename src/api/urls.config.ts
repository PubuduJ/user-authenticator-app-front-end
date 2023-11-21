export const AUTHENTICATE = () => "/auth/authenticate";
export const FORGOT_PASSWORD = (email: string) => `/auth/forgot/password/${email}`;
export const RESET_PASSWORD = () => `/auth/reset/password`;
export const CREATE_ROLE = () => "/roles";