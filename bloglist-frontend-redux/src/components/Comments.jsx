import React from 'react';
import CommentForm from "./CommentForm.jsx";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectSingleBlog} from "../state/reducers/blogsSlice.js";

const Comments = () => {
    const {blogId} = useParams();
    const blog = useSelector(state => selectSingleBlog(state, blogId));

    if (!blog) {
        return <div>Blog not found</div>;
    }

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

export default Comments;