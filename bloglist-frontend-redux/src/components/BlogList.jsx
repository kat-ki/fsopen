import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectAllBlogs, sortBlogs} from "../state/reducers/blogsSlice.js";
import {Header, Segment} from "semantic-ui-react";

const BlogList = () => {
    const blogs = useSelector(selectAllBlogs);
    const dispatch = useDispatch();
    const showPopular = () => {
        dispatch(sortBlogs());
    }

    return (
        <div>
            <Header onClick={showPopular}
                    as='h4'
                    textAlign='center'
                    color="black">Show popular
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path
                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </Header>
            {blogs.map(blog =>
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <Segment>
                        <Header as="h4">{blog.title}</Header>
                        <p>By <b>{blog.author}</b></p>
                    </Segment>
                </Link>
            )}
        </div>
    );
};

export default BlogList;