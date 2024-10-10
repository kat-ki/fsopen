import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import blogService from './../../services/blogs'

const initialState = [];
export const fetchAllBlogs = createAsyncThunk(
    'blogs/fetchAllBlogs',
    async (_, {rejectWithValue}) => {
        try {
            return await blogService.getAll();
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    });

export const createBlog = createAsyncThunk(
    'blogs/createBlog',
    async (blog, {rejectWithValue}) => {
        try {
            return await blogService.create(blog);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateBlogLikes = createAsyncThunk(
    'blogs/updateBlogLikes',
    async (blog, {rejectWithValue}) => {
        try {
            return await blogService.updateLikes(blog.id, blog);
        } catch (error) {
            return rejectWithValue('Failed to update likes');
        }
    }
);

export const removeBlog = createAsyncThunk(
    'blogs/removeBlog',
    async (id, {rejectWithValue}) => {
        try {
            await blogService.deleteBlog(id);
            return id;
        } catch (error) {
            return rejectWithValue('Failed to delete blog');
        }
    }
);


const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        sortBlogs(state, action) {
            return state.sort((a, b) => b.likes - a.likes);
        },
        appendComment(state, action) {
            return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllBlogs.pending, (state, action) => {
                // console.log('fetching blogs in progress')
            })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                console.error('Failed to fetch blogs');
            })

            .addCase(createBlog.pending, (state, action) => {
                // console.log('creating blog in progress')
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                console.error('Failed to create a blog');
            })

            .addCase(updateBlogLikes.pending, (state) => {
                //console.log('Updating blog likes...')
            })
            .addCase(updateBlogLikes.fulfilled, (state, action) => {
                return state.map(blog => blog.id !== action.payload.id ? blog : action.payload);
            })
            .addCase(updateBlogLikes.rejected, (state, action) => {
                console.error(action.payload);
            })

            .addCase(removeBlog.pending, (state) => {
                //console.log('Deleting blog...')
            })
            .addCase(removeBlog.fulfilled, (state, action) => {
                return state.filter(blog => blog.id !== action.payload);
            })
            .addCase(removeBlog.rejected, (state, action) => {
                console.error(action.payload);
            })
    }
})

export const {sortBlogs, appendComment} = blogsSlice.actions;

export const addComment = (blogId, comment) => {
    return async dispatch => {
        try {
            const newComment = await blogService.addComment(blogId, comment);
            dispatch(appendComment(newComment));
        } catch (error) {
            console.error('Failed to add comment:', error);
        }
    }
};

export const selectAllBlogs = (state) => state.blogs;
export const selectSingleBlog = (state, blogId) => state.blogs.find(blog => blog.id === blogId);

export default blogsSlice.reducer;