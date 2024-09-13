import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addComment} from "../state/reducers/blogsSlice.js";

const CommentForm = ({blogId}) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const handleSubmitComment = (e) => {
        e.preventDefault();
        dispatch(addComment(blogId, {comment: comment}));
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
                <button type="submit" style={{marginTop: '10px', padding: '10px'}} disabled={!comment}>
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;