import {createSlice} from "@reduxjs/toolkit";
import blogService from './../../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload;
        },
        createNew(state, action) {
            state.push(action.payload);
        },
        updateBlog(state, action) {
            state = state.map(blog => blog.id !== action.payload.id ? blog : {...blog, likes: blog.likes + 1})
        },
        deleteABlog(state, action) {
            state = state.filter(blog => blog.id !== action.payload.id);
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
        const updatedLikes = {...blog, likes: blog.likes + 1}
        const updatedBlog = await blogService.updateLikes(updatedLikes);
        dispatch(updateBlog(updatedBlog));
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        const blogToDelete = await blogService.deleteBlog(id);
        dispatch(deleteABlog(blogToDelete));
    }
}
export default blogsSlice.reducer;