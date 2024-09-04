import {useState, useEffect} from 'react'
import React from 'react';
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "./state/reducers/notificationSlice";
import {createBlog, initializeBlogs, removeBlog, setBlogs, updateBlogLikes} from "./state/reducers/blogsSlice";
import {setUser} from "./state/reducers/userSlice.js";

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
    const notification = useSelector(state => state.notification);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [user, setUser] = useState(null)

//TODO: set user into a reducer
    const [status, setStatus] = useState('');

    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        dispatch(initializeBlogs())
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
           // setUser(user)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        }
    }, []);


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
           // setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            dispatch(setNotification('Wrong username or password'));
            setStatus('error')
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2000)
        }
    }
    const loginForm = () => (
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
    )
    const handleLogout = () => {
        window.localStorage.clear();
        dispatch(setUser(null))
       //setUser(null);
    }
    const addBlog = (blog) => {
        if (!blog.title || !blog.author || !blog.url) {
            dispatch(setNotification('Title, author, and url must not be empty'))
            setStatus('error')
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2000)
            return
        }

        try {
            dispatch(createBlog(blog))
            dispatch(setNotification(`Added ${blog.title}`))
            setStatus('success')
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2000)
            setFormVisible(false)
        } catch (error) {
            dispatch(setNotification(error.message))
            setStatus('error')
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 2000)
        }
    }
    const createBlogForm = () => {
        return (
            <div>
                <div>
                    <BlogForm
                        createBlog={addBlog}
                    />
                    <button onClick={() => setFormVisible(false)} style={buttonWarn}>cancel</button>
                </div>
            </div>
        )
    }
    const toggleFormVisibility = () => {
        setFormVisible(!formVisible)
    }
    const handleLike = (blog) => {
        try {
            dispatch(updateBlogLikes(blog))
        } catch (error) {
            dispatch(setNotification(error.message))
        }
    }
    const showPopular = () => {
        const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(sortedByLikes));
    }
    const deleteBlog = (blog) => {
        if (blog && window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(removeBlog(blog.id))
                dispatch(setNotification(`Deleted ${blog.title}`))
                setTimeout(() => {
                    dispatch(setNotification(null))
                }, 3000)
                setStatus('success')
            } catch (error) {
                dispatch(setNotification(error.message))
            }
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2 style={{margin: '20px'}}>Blogs</h2>
            <h2 style={{margin: '20px'}}>Part 7 test....</h2>
            <Notification message={notification} status={status}/>
            {user === null
                ? loginForm()
                : <div>
                    <span style={{margin: '10px'}} className="loggedUser"><b>{user.user?.name}</b> logged in </span>
                    <button onClick={handleLogout} style={buttonWarn}>log out</button>
                    <div style={{margin: '10px'}}>
                        {formVisible ? (
                            createBlogForm()
                        ) : (
                            <button onClick={toggleFormVisibility} style={buttonstyles}>add blog</button>
                        )}
                    </div>
                    <h3 style={popularStyles} onClick={showPopular}>Show popular</h3>
                    <div style={{margin: '10px'}}>
                        {blogs.map(blog =>
                            <Blog key={blog.id}
                                  blog={blog}
                                  handleLike={() => handleLike(blog)}
                                  deleteBlog={() => deleteBlog(blog)}
                                  user={user}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default App