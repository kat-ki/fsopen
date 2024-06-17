import {createContext, useReducer} from "react";
import PropTypes from "prop-types";

const initialState = {
    message: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return {message: action.message};
        case 'HIDE_NOTIFICATION':
            return {message: ''};
        default:
            return state;
    }
}

const NotificationContext = createContext();

export const NotificationContextProvider = ({children}) => {
    const [message, dispatch] = useReducer(reducer, initialState);
    return (
        <NotificationContext.Provider value={[message, dispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;

NotificationContextProvider.prototype = {
    children: PropTypes.node.isRequired
}