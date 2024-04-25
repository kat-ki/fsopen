import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Notification from "./components/Notification.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

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
    const addBlog = async (event) => {
        event.preventDefault();
        if (!title || !author || !url) {
            setMessage('Title, author, and url must not be empty')
            setStatus('error')
            setTimeout(() => {
                setMessage(null)
            }, 2000)
            return
        }

        const newBlog = {title, author, url};
        try {
            const response = await blogService.create(newBlog)
            setMessage(`Added ${response.title}`)
            setStatus('success')
            setTimeout(() => {
                setMessage(null)
            }, 2000)
            setBlogs([...blogs, response])
            setTitle('')
            setAuthor('')
            setUrl('')
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
                <div >
                    <BlogForm
                        addNewBlog={addBlog}
                        title={title}
                        handleTitleChange={({target}) => setTitle(target.value)}
                        author={author}
                        handleAuhorChange={({target}) => setAuthor(target.value)}
                        url={url}
                        handleUrlChange={({target}) => setUrl(target.value)}
                    />
                    <button onClick={()=> setFormVisible(false)}>cancel</button>
                </div>
            </div>
        )
    }
    const toggleFormVisibility = ()=> {
        setFormVisible(!formVisible)
    }

    return (
        <div>
            <h2 style={{margin: '20px'}}>Blogs</h2>
            <Notification message={message} status={status}/>
            {user === null
                ? loginForm()
                : <div>
                    <span style={{margin: '10px'}}><b>{user.name}</b> logged in </span>
                    <button onClick={handleLogout}>log out</button>
                    <div style={{margin: '10px'}}>
                        {formVisible ? (
                            createBlogForm()
                        ) : (
                            <button onClick={toggleFormVisibility}>add blog</button>
                        )}
                    </div>
                    <div style={{margin: '10px'}}>
                        {blogs.map(blog =>
                            <Blog key={blog.id} blog={blog}/>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default App