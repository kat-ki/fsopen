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
        const users = await userService.fetchUsers();
        dispatch(setAllUsers(users))
    }
}

export const fetchSingleUser = (userId) => {
    return async (dispatch, getState) => {
        const state = getState();
        const existingUser = state.users.users.find(user => user.id === userId);

        if (existingUser) {
            return existingUser;
        } else {
            const user = await userService.fetchUserById(userId);
            return user;
        }
    }
};

export default authSlice.reducer;