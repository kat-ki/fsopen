import {configureStore} from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogsSlice";
import notificationReducer from "./reducers/notificationSlice";
import statusReducer from "./reducers/statusSlice.js";
import usersReducer from "./reducers/usersSlice.js";
import authReducer from "./reducers/authSlice.js";

export const store = configureStore({
    reducer: {
        blogs: blogsReducer,
        notification: notificationReducer,
        authUser: authReducer,
        users: usersReducer,
        status: statusReducer
    }
})

