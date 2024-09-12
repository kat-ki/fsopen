import React from 'react';
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import {useSelector} from "react-redux";
import LoginForm from "./components/LoginForm.jsx";
import BlogList from "./components/BlogList.jsx";


const App = () => {
    const user = useSelector(state => state.authUser.user);

    return (
        <main style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h2 style={{margin: '20px'}}>Blogs</h2>
            <h2 style={{margin: '20px'}}>Part 7 </h2>
            <Notification/>
            {user === null
                ? <LoginForm/>
                : <div>
                    <BlogForm/>
                    <BlogList/>
                </div>
            }
        </main>
    )
}

export default App