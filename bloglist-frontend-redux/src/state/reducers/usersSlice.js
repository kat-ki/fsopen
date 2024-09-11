import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from '../../services/users.js'

const initialState = [];

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
    return await userService.fetchUsers();
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
export const getUserById = (state, userId) => state.users.find(user => user.id === userId);


export default usersSlice.reducer;
