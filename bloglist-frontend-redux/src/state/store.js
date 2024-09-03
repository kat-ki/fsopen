import {configureStore} from "@reduxjs/toolkit";
import blogsSlice from "./reducers/blogsSlice";
import notificationSlice from "./reducers/notificationSlice";

export const store = configureStore({
    reducer: {
        blogs: blogsSlice,
        notification: notificationSlice
    }
})