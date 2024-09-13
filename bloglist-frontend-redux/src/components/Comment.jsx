import React, {useEffect, useState} from 'react';
import CommentForm from "./CommentForm.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllBlogs} from "../state/reducers/blogsSlice.js";

const Comment = () => {
    const {blogId} = useParams();
    const blogs = useSelector(selectAllBlogs);
    const blog = blogs.find(blog => blog.id === blogId);

    useEffect(()=> {}, []
    )

    if (!blog) {
        return <div>Blog not found</div>;
    }
    console.log('blog from Comment line 15', blog)

    return (
        <div>
            <p><b>Comments:</b></p>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment.comment}</li>
                ))}
            </ul>
            <CommentForm blogId={blogId}/>
        </div>
    );
};

export default Comment;