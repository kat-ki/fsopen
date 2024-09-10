import React, {useEffect} from 'react';
import User from "./User.jsx";
import {useDispatch, useSelector} from "react-redux";
import {initializeAllUsers} from "../state/reducers/usersSlice.js";
import LoginForm from "./LoginForm.jsx";
import {useNavigate} from "react-router-dom";

const Users = () => {
    const user = useSelector(state => state.authUser.user);
    const users = useSelector(state => state.users.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(initializeAllUsers());
    }, [dispatch]);

    if (!user) {
        return <LoginForm/>
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <User/>
            <h3>Users</h3>

            <table style={{border: '1px solid black', width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{border: '1px solid black', padding: '8px'}}>Author</th>
                    <th style={{border: '1px solid black', padding: '8px'}}>Blogs created</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td style={{border: '1px solid black', padding: '8px'}}>{user.name}</td>
                        <td style={{border: '1px solid black', padding: '8px'}}>{user.blogs.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    );
};

export default Users;