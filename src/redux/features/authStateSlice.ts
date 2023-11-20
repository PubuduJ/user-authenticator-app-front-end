import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  user: string | null;
  token: string | null;
  permissions: String[] | null;
};

const initialState: authState = {
  user: null,
  token: null,
  permissions: null
};

export const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<authState>) => {
      const { user, token,  permissions} = action.payload
      state.user = user;
      state.token = token;
      state.permissions = permissions;
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
      state.permissions = null
    }
  }
});

export const {setCredentials, logOut} = authStateSlice.actions;

export default authStateSlice.reducer;