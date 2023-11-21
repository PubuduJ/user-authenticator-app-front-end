import {configureStore} from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authStateSlice from "./features/authStateSlice";
import booleanValueSlice from "./features/booleanValueSlice";

export const store = configureStore({
    reducer: {
        appState: appStateSlice,
        authState: authStateSlice,
        booleanValue: booleanValueSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;