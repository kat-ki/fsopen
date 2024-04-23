import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])
    useEffect(() => {
       //setUser(user)
    }, []);
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            blogService.setToken(user.token)
            setUser(user)
           // setUsername('')
            //setPassword('')
        } catch (error) {
            //error info with setTimeout
            console.log(error)
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

    return (
        <div>
            <h2>Blogs</h2>
            { user === null
                ? loginForm()
                : <div>
                    <p><b>{user.name}</b> logged in</p>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App