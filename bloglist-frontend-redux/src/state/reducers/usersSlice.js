import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import userService from '../../services/users.js'
import {fetchAllBlogs} from "./blogsSlice.js";

const initialState = [];

export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            return await userService.fetchUsers();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    })

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllUsers.pending, (state, action) => {
                // console.log('fetching blogs in progress')
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                console.error('Failed to fetch users:');
            })
    }
})


export const selectAllUsers = (state) => state.users;
export const selectSingleUser = (state, userId) => state.users.find(user => user.id === userId);


export default usersSlice.reducer;
