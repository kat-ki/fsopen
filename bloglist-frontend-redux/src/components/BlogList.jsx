import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Blog from "./Blog.jsx";
import {removeBlog, updateBlogLikes} from "../state/reducers/blogsSlice.js";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {setStatus} from "../state/reducers/statusSlice.js";

const BlogList = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.authUser.user);

    const dispatch = useDispatch();
    const handleLike = (blog) => {
        try {
            dispatch(updateBlogLikes(blog));
        } catch (error) {
            dispatch(setNotification(error.message));
        }
    }

    const deleteBlog = (blog) => {
        if (blog && window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(removeBlog(blog.id));
                dispatch(setNotification(`Deleted ${blog.title}`));
                setTimeout(() => {
                    dispatch(setNotification(null));
                }, 3000)
                dispatch(setStatus('success'));
            } catch (error) {
                dispatch(setNotification(error.message));
            }
        }
    }

    return (
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
    );
};

export default BlogList;