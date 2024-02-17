import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        bookmark: []
    },
    reducers: {
        BOOKMARK: (state, action) => {
            state.bookmark = action.payload
        }
    }
})

export const getUser = (state) => state.user;

export const { BOOKMARK } = userSlice.actions;
export default userSlice.reducer;