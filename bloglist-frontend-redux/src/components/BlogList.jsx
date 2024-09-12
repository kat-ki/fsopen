import React from 'react';
import {useSelector} from "react-redux";
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