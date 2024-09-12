import {createSlice} from "@reduxjs/toolkit";
import blogService from './../../services/blogs'
import {setNotification} from "./notificationSlice.js";

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
        }
    }
})

export const {setBlogs, createNew, updateBlog, deleteABlog} = blogsSlice.actions;

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

export const selectAllBlogs = (state) => state.blogs;
export const selectBlogByUser = (state, userId) => state.blogs.find(blog => blog.id === userId);

export default blogsSlice.reducer;