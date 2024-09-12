import React, {useState} from 'react';
import {addComment} from "../state/reducers/commentsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectAllBlogs} from "../state/reducers/blogsSlice.js";

const CommentForm = ({blogId}) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');

    const handleSubmitComment = (e) => {
        e.preventDefault();
        dispatch(addComment(blogId, comment));
        setComment('');
    };

    return (
        <div>
            <form onSubmit={handleSubmitComment}>
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                    style={{width: '30%', padding: '10px', borderRadius: '5px', borderColor: 'lightgrey'}}
                />
                <button type="submit" style={{marginTop: '10px', padding: '10px'}}>
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;