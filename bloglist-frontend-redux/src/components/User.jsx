import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchSingleUser} from "../state/reducers/usersSlice.js";

const User = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            let user = await dispatch(fetchSingleUser(userId));
            setUser(user);
        };
        getUser();
    }, [dispatch, userId])


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2><u>{user.name}</u></h2>
            <h3>Added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default User;