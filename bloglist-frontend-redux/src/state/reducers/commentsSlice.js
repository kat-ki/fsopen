import {createSlice} from "@reduxjs/toolkit";
import * as blogService from "./commentsSlice.js";

const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        setComments(state, action) {
            return action.payload;
        },
        appendComment(state, action) {
            const { blogId, comment } = action.payload;
            const blog = state.find(b => b.id === blogId);
            if (blog) {
                blog.comments.push(comment);
            }
        }
    }
});

export const { setComments, appendComment } = commentsSlice.actions;

export const addComment = (blogId, comment) => async dispatch => {
    try {
        const newComment = await blogService.addComment(blogId, comment);
        dispatch(appendComment({ blogId, comment: newComment }));
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};

export default commentsSlice.reducer;