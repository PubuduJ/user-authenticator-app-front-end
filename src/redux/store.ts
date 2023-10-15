import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import booleanValueSlice from "./features/booleanValueSlice";

export const store = configureStore({
    reducer: {
        appState: appStateSlice,
        booleanValue: booleanValueSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;