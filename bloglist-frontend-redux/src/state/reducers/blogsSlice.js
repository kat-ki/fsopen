import {createSlice} from "@reduxjs/toolkit";
import blogService from './../../services/blogs'

const initialState = [];

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        createNew(state, action) {
            state.push(action.payload);
        },
        updateBlog(state, action) {
            return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
        },
        deleteABlog(state, action) {
            return state.filter(blog => blog.id !== action.payload);
        },
        appendComment(state, action) {
            console.log('action payload slice 23', action.payload)
            const {blogId, comment} = action.payload;
            const blog = state.find(b => b.id === blogId);
            if (blog) {
                blog.comments.push(comment);
            }
        }
    }
})

export const {setBlogs, createNew, updateBlog, deleteABlog, appendComment} = blogsSlice.actions;

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog);
        dispatch(createNew(newBlog))
    }
}

export const updateBlogLikes = (blog) => {
    return async dispatch => {
        try {
            const updatedBlog = await blogService.updateLikes(blog.id, blog);
            dispatch(updateBlog(updatedBlog));
        } catch (error) {
            throw new Error('Failed to update likes');
        }
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        try {
            await blogService.deleteBlog(id);
            dispatch(deleteABlog(id));
        } catch (error) {
            throw new Error('Failed to delete the blog');
        }
    };
};

export const addComment = (blogId, comment) => async dispatch => {
    console.log('comment coming to addComment blogSlice', comment)
    try {
        const newComment = await blogService.addComment(blogId, comment);
        dispatch(appendComment(newComment));
    } catch (error) {
        console.error('Failed to add comment:', error);
    }
};

export const selectAllBlogs = (state) => state.blogs;

export default blogsSlice.reducer;