import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeBlog, updateBlogLikes} from "../state/reducers/blogsSlice.js";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {setStatus} from "../state/reducers/statusSlice.js";
import {Link} from "react-router-dom";

const containerStyles = {
    paddingTop: 0,
    paddingLeft: 10,
    border: 'solid',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flexStart',
    width: '100%'
}

const BlogList = () => {
    const blogs = useSelector(state => state.blogs);
    const user = useSelector(state => state.authUser.user);


    return (
        <div style={{margin: '10px'}}>
            {blogs.map(blog =>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <div style={containerStyles}>
                        <h3 className="title"><b>{blog.title}</b></h3>
                        <p>Author: {blog.author}</p>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default BlogList;