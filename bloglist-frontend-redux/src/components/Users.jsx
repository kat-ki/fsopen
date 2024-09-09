import React from 'react';
import {useSelector} from "react-redux";
import {store} from "../state/store.js";


const Users = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'));
    // const user = useSelector(state => state.user.user);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Blogs</h2>
            <span style={{margin: '10px'}}><b>{user?.name}</b> logged in </span>
        </div>
    );
};

export default Users;