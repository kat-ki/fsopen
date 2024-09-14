import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectAllBlogs, setBlogs} from "../state/reducers/blogsSlice.js";

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

const BlogList = () => {
    const blogs = useSelector(selectAllBlogs);
    const dispatch = useDispatch();
    const showPopular = () => {
        const sortedByLikes = [...blogs].sort((a, b) => b.likes - a.likes);
        dispatch(setBlogs(sortedByLikes));
    }

    return (
        <div style={{margin: '10px'}}>
            <h3 style={popularStyles} onClick={showPopular}>Show popular</h3>
            {blogs.map(blog =>
                <Link key={blog.id} to={`/blogs/${blog.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
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