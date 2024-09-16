import React from 'react';
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import BlogList from "./components/BlogList.jsx";
import {Header} from "semantic-ui-react";

const App = () => {

    return (
        <main style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Header>Blogs</Header>
            <Notification/>
            <div>
                <BlogForm/>
                <BlogList/>
            </div>
        </main>
    )
}

export default App