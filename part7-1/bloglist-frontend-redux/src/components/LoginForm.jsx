import React, {useState} from 'react';
import loginService from "../services/login.js";
import blogService from "../services/blogs.js";
import {setUser} from "../state/reducers/authSlice.js";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {useDispatch} from "react-redux";
import {setStatus} from "../state/reducers/statusSlice.js";
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

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
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form onSubmit={handleLogin} size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid icon='user'
                            iconPosition='left'
                            placeholder='Login'
                            type="text"
                            name="Username"
                            data-testid="username"
                            value={username}
                            onChange={({target}) => setUsername(target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="Password"
                            data-testid="password"
                            value={password}
                            onChange={({target}) => setPassword(target.value)}
                        />

                        <Button type="submit" content="Login" color='teal' fluid size='large'/>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default LoginForm;