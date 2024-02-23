import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        bookmark: [],
        likeNovelData: [],
        darkModeTheme: '',
    },
    reducers: {
        BOOKMARK: (state, action) => {
            state.bookmark = action.payload
        },
        LIKE_NOVEL: (state, action) => {
            state.likeNovelData = action.payload
        },
        THEME: (state, action) => {
            state.darkModeTheme = action.payload
        }
    }
})

export const getUser = (state) => state.user;

export const { BOOKMARK, LIKE_NOVEL, THEME } = userSlice.actions;
export default userSlice.reducer;