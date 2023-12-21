import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userSlice",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})

export const { setUser } = userSlice.actions
export const selectUserSlice = (state) => state.userSlice;

export default userSlice.reducer