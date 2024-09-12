import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserById} from "../state/reducers/usersSlice.js";


const User = () => {
    const {userId} = useParams();
    const user = useSelector(state => getUserById(state, userId));

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2><u>{user.name}</u></h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default User;