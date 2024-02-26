import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        bookmark: [],
        likeNovelData: [],
        darkModeTheme: '',
        globalLoader: false,
        coinHistory: ''
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
        },
        PAGE_LOADER: (state, action) => {
            state.likeNovelData = action.payload
        },
        COIN_HISTORY: (state, action) => {
            state.coinHistory = action.payload
        }
    }
})

export const getUser = (state) => state.user;

export const { BOOKMARK, LIKE_NOVEL, THEME, PAGE_LOADER, COIN_HISTORY } = userSlice.actions;
export default userSlice.reducer;