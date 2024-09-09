import { useEffect} from 'react'
import React from 'react';
import Blog from './components/Blog'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "./state/reducers/notificationSlice";
import {initializeBlogs, removeBlog, setBlogs, updateBlogLikes} from "./state/reducers/blogsSlice";
import {initializeUser, logout, setUser} from "./state/reducers/userSlice.js";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";

const buttonstyles = {
    backgroundColor: 'lightgreen',
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
const popularStyles = {
    backgroundColor: 'lightBlue',
    width: '30%',
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

const App = () => {
    const blogs = useSelector(state => state.blogs);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(initializeUser());
        dispatch(initializeBlogs());
    }, [dispatch]);


    const showPopular = () => {
        const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(sortedByLikes));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2 style={{margin: '20px'}}>Blogs</h2>
            <h2 style={{margin: '20px'}}>Part 7 </h2>
            <Notification />
            {user === null
                ? <LoginForm/>
                : <div>
                    <span style={{margin: '10px'}} className="loggedUser"><b>{user.name}</b> logged in </span>
                    <button onClick={() => dispatch(logout())} style={buttonWarn}>log out</button>
                    <BlogForm/>
                    <h3 style={popularStyles} onClick={showPopular}>Show popular</h3>
                    <BlogList />
                </div>
            }
        </div>
    )
}

export default App