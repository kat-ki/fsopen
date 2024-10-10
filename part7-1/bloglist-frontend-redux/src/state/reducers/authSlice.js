import {createSlice} from "@reduxjs/toolkit";
import blogService from "../../services/blogs.js";

const authSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
        }
    }
})

export const {setUser, clearUser} = authSlice.actions;

export const initializeUser = () => (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
        const user = JSON.parse(loggedUser);
        dispatch(setUser(user));
        blogService.setToken(user.token);
    }
};

export const logout = () => (dispatch) => {
    window.localStorage.clear();
    dispatch(clearUser());
}
export default authSlice.reducer;