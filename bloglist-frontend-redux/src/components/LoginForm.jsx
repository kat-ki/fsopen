import React, {useState} from 'react';
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import {setUser} from "../state/reducers/userSlice.js";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {useDispatch} from "react-redux";
import {setStatus} from "../state/reducers/statusSlice.js";

const LoginForm = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({username, password});
            window.localStorage.setItem('loggedUser', JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(setUser(user));
            setUsername('');
            setPassword('');
        } catch (error) {
            dispatch(setNotification('Wrong username or password'));
            dispatch(setStatus('error'));
            setTimeout(() => {
                dispatch(setNotification(null));
            }, 2000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <span>username </span>
                <input
                    type="text"
                    name="Username"
                    data-testid="username"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                <span>password </span>
                <input
                    type="password"
                    name="Password"
                    data-testid="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">log in</button>
        </form>
    );
};

export default LoginForm;