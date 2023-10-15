const HOST_URL = "http://localhost:8080";
const API = "/api";

export const getBaseurl = (url: string) => `${HOST_URL}${API}${url}`;
