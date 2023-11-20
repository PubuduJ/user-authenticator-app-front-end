import { METHODS, requestApiWithoutSecurity, URL } from "..";

export const signIn = async (email: string, password: string) => {
  try {
    const response = await requestApiWithoutSecurity(METHODS.POST, URL.AUTHENTICATE, {
      email: email,
      password: password
    });
    return response.data;
  } catch {
    console.log("No user found");
    return null
  }
}
