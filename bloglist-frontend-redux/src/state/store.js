import {configureStore} from "@reduxjs/toolkit";
import blogsSlice from "./reducers/blogsSlice";
import notificationSlice from "./reducers/notificationSlice";
import statusSlice from "./reducers/statusSlice.js";
import usersSlice from "./reducers/usersSlice.js";
import authSlice from "./reducers/authSlice.js";

export const store = configureStore({
    reducer: {
        blogs: blogsSlice,
        notification: notificationSlice,
        authUser: authSlice,
        users: usersSlice,
        status: statusSlice
    }
})

