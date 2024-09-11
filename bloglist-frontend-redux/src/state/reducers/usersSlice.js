import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from '../../services/users.js'

const initialState = [];

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
    const users = await userService.fetchUsers();
    return users;
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})


export const setAllUsers = (state) => state.users;
export const fetchSingleUser = (userId) => {
    return async (dispatch, getState) => {
        const state = getState();
        const existingUser = state.users.find(user => user.id === userId);

        if (existingUser) {
            return existingUser;
        } else {
            const user = await userService.fetchUserById(userId);
            return user;
        }
    }
};

export default usersSlice.reducer;

/*export const initializeAllUsers = () => {
    return async dispatch => {
        const users = await userService.fetchUsers();
        dispatch(setAllUsers(users))
    }
}*/