import React from 'react';
import CommentForm from "./CommentForm.jsx";

const Comment = ({blog, blogId}) => {
    return (
        <div>
            <p><b>Comments:</b></p>
            <ul>
                {blog.comments?.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
            <CommentForm blogId={blogId}/>
        </div>
    );
};

export default Comment;