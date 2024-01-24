import {createSlice} from "@reduxjs/toolkit"

const inititalState = {
    data: [],
}

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: inititalState,
    reducers: {
        updateBookmarkData: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { updateBookmarkData } = bookmarkSlice.actions
export default bookmarkSlice.reducer