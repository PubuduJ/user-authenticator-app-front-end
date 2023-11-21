import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type navOpen = {
    booleanValue: boolean;
}

const initialState: navOpen = {
    booleanValue: false,

};

const booleanSlice = createSlice({
    name: 'boolean',
    initialState,
    reducers: {
        setBooleanValue: (state, action: PayloadAction<boolean>) => {
            state.booleanValue = action.payload;
        },
    },
});

export const {setBooleanValue} = booleanSlice.actions;

export default booleanSlice.reducer;