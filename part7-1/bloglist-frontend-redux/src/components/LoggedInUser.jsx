import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../state/reducers/authSlice.js";
import {Button} from "semantic-ui-react";


const LoggedInUser = () => {
    const user = useSelector(state => state.authUser.user);
    const dispatch = useDispatch();

    return (
        <div>
            <span style={{marginRight: '10px'}}><b>{user?.name}</b> logged in</span>
            <Button content="Log out" onClick={() => dispatch(logout())} color="red" size="small"/>
        </div>

    );
};

export default LoggedInUser;