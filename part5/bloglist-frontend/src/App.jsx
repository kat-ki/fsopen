import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";
import BlogForm from "./components/BlogForm.jsx";

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
    const [blogs, setBlogs] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [message, setMessage] = useState(null);
    const [status, setStatus] = useState('');

    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, []);
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            setMessage('Wrong username or password')
            setStatus('error')
            setTimeout(() => {
                setMessage(null)
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
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                <span>password </span>
                <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }
    const addBlog = async (blog) => {
        if (!blog.title || !blog.author || !blog.url) {
            setMessage('Title, author, and url must not be empty')
            setStatus('error')
            setTimeout(() => {
                setMessage(null)
            }, 2000)
            return
        }

        try {
            const response = await blogService.create(blog)
            setMessage(`Added ${response.title}`)
            setStatus('success')
            setTimeout(() => {
                setMessage(null)
            }, 2000)
            setBlogs([...blogs, response])

            setFormVisible(false)
        } catch (error) {
            setMessage(error.message)
            setStatus('error')
            setTimeout(() => {
                setMessage(null)
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
    const handleLike = async (id) => {
        const foundBlog = blogs.find(b => b.id === id)
        if (foundBlog) {
            const updatedLikes = {...foundBlog, likes: foundBlog.likes + 1}
            try {
                const response = await blogService.updateLikes(id, updatedLikes)
                const updatedBlogs = blogs.map(b => b.id === id ? response : b)
                setBlogs(updatedBlogs)
            } catch (error) {
                setMessage(error.message)
            }
        }
    }
    const showPopular = () => {
        const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);
        setBlogs(sortedByLikes);
    }
    const deleteBlog = async (id) => {
        const foundBlog = blogs.find(b => b.id === id)
        if (foundBlog && window.confirm(`Delete ${foundBlog.title} by ${foundBlog.author}?`)) {
            try {
                await blogService.deleteBlog(foundBlog.id);
                setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== foundBlog.id));
                setMessage(`Deleted ${foundBlog.title}`);
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
                setStatus('success');
            } catch (error) {
                setMessage(error.message)
            }
        }
    }

    return (
        <div>
            <h2 style={{margin: '20px'}}>Blogs</h2>
            <Notification message={message} status={status}/>
            {user === null
                ? loginForm()
                : <div>
                    <span style={{margin: '10px'}}><b>{user.name}</b> logged in </span>
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
                                  handleLike={handleLike}
                                  deleteBlog={deleteBlog}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default App