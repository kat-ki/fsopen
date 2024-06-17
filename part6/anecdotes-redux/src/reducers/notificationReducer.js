import {createSlice} from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload;
        },
        clearNotification() {
            return '';
        },
    }
})
export const {setNotification, clearNotification} = notificationSlice.actions;

export const showNotification = (notification, duration) => {
    return dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(clearNotification(notification))
        }, duration * 1000);
    };
};
export default notificationSlice.reducer;