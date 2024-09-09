import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {initializeUser, logout} from "../state/reducers/userSlice.js";

const buttonWarn = {
    backgroundColor: 'lightcoral',
    color: 'black',
    padding: '4px 8px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '0',
    borderColor: 'inherit',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none'
}

const User = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
            <span style={{margin: '10px'}}><b>{user?.name}</b> logged in </span>
            <button onClick={() => dispatch(logout())} style={buttonWarn}>log out</button>
        </div>
    );
};

export default User;