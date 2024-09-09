import {createSlice} from "@reduxjs/toolkit";
import userService from '../../services/users.js'

const authSlice = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
        setAllUsers(state, action) {
            state.users = action.payload;
        }
    }
})

export const {setAllUsers} = authSlice.actions;

export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll();
        dispatch(setAllUsers(users))
    }
}

export default authSlice.reducer;