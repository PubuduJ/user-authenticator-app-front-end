// Auth
export const AUTHENTICATE = () => "/auth/authenticate";
export const FORGOT_PASSWORD = (email: string) => `/auth/forgot/password/${email}`;
export const RESET_PASSWORD = () => `/auth/reset/password`;
// Users
export const CREATE_USER = () => "/users";
export const UPDATE_USER = () => "/users";
export const DELETE_USER = (id: string) => `/users/${id}`;
export const GET_USERS_BY_QUERY = (query: string) => `/users?q=${query}`;
export const RESET_PASSWORD_BY_USER_ID = (id: string) => `/users/reset/password/${id}`;
// Roles
export const GET_ALL_ROLES = () => "/roles/all";
export const GET_LOGGED_USER_DETAILS = (email: string) => `/auth/logged-user/${email}`;
export const CREATE_ROLE = () => "/roles";
export const UPDATE_ROLE = () => "/roles";
export const GET_ROLES_BY_ROLE_NAME = (query: string) => `/roles?q=${query}`;
export const DELETE_ROLE_BY_ID = (id: string) => `/roles/${id}`;