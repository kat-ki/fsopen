import {useDispatch, useSelector} from "react-redux";
import {removeBlog, selectSingleBlog, updateBlogLikes} from "../state/reducers/blogsSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {setStatus} from "../state/reducers/statusSlice.js";
import Comments from "./Comments.jsx";
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Button,
    Card,
    Icon
} from 'semantic-ui-react'
import React from "react";

const BlogCard = () => {
    const {blogId} = useParams();
    const user = useSelector(state => state.authUser.user);
    const dispatch = useDispatch();
    const blog = useSelector(state => selectSingleBlog(state, blogId));

    const navigate = useNavigate();

    if (!blog) {
        return <div>Blog not found</div>;
    }

    const handleLike = () => {
        try {
            const updatedBlog = {...blog, likes: blog.likes + 1};
            dispatch(updateBlogLikes(updatedBlog));
        } catch (error) {
            dispatch(setNotification(error.message));
        }
    };

    const deleteBlog = (blog) => {
        if (blog && window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
            try {
                dispatch(removeBlog(blog.id));
                dispatch(setNotification(`Deleted ${blog.title}`));
                setTimeout(() => {
                    dispatch(setNotification(null));
                }, 3000);
                dispatch(setStatus('success'));
                navigate('/');
            } catch (error) {
                dispatch(setNotification(error.message));
            }
        }
    };


    return (
        <main style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Card style={{width: '500px'}}>
                <CardContent>
                    <CardHeader>{blog.title}</CardHeader>
                    <CardMeta>By {blog.author}</CardMeta>
                    <CardMeta>{blog.url}</CardMeta>

                    <CardDescription textAlign="right">
                        Added by <b>{blog.user.name}</b>
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <div className='ui three buttons'>
                        <Button as='div' labelPosition='right'>
                            <Button color='teal' onClick={handleLike}>
                                <Icon name='heart'/>
                                {blog.likes} {blog.likes === 1 ? 'Like' : 'Likes'}
                            </Button>
                        </Button>
                        <Button as='div' labelPosition='right'>
                            {user.name === blog.user.name ?
                                <Button type="button" content="Delete" negative
                                        onClick={() => deleteBlog(blog)}/> : null}
                        </Button>
                    </div>
                </CardContent>
                <Comments/>
            </Card>

        </main>
    )
}


export default BlogCard

