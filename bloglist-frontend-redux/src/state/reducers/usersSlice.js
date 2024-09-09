import {createSlice} from "@reduxjs/toolkit";
import userService from '../../services/users.js'

const usersSlice = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
        setAllUsers(state, action) {
            console.log(action.payload)
            state.users = action.payload;
        }
    }
})

export const {setAllUsers} = usersSlice.actions;

export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll();
        dispatch(setAllUsers(users))
    }
}

export default usersSlice.reducer;