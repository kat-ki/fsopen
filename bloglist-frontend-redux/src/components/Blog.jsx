import {useDispatch, useSelector} from "react-redux";
import {removeBlog, selectAllBlogs, updateBlogLikes} from "../state/reducers/blogsSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {setStatus} from "../state/reducers/statusSlice.js";

// styles
const containerStyles = {
    paddingTop: 0,
    paddingLeft: 10,
    border: 'solid',
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flexStart',
    width: '80%'
}
const detailedBlogStyles = {
    paddingTop: 4,
    paddingLeft: 4,
    borderWidth: 1,
    marginBottom: 5
}
const likesBoxStyle = {
    paddingTop: 0,
    width: '60%',
    display: 'flex',
    justifyContent: 'start', alignItems: 'center'
}
const likeButtonStyles = {
    backgroundColor: 'forestgreen',
    color: 'white',
    borderRadius: '5px',
    padding: '6px',
    boxShadow: 'none',
    borderColor: 'inherit',
    fontFamily: 'sans-serif'
}
const deleteButtonStyles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '0',
    borderColor: 'inherit',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none'
}
// styles end

const Blog = () => {
    const {blogId} = useParams();
    const user = useSelector(state => state.authUser.user);
    const dispatch = useDispatch();
    const blogs = useSelector(selectAllBlogs);
    const blog = blogs.find(blog => blog.id === blogId);

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
            <div style={containerStyles}>
                <div style={detailedBlogStyles} className="blog">
                    <p><b>{blog.title}</b></p>
                    <p>By {blog.author}</p>
                    <p>{blog.url}</p>
                    <div style={likesBoxStyle}>
                        <p className="likes">Likes: {blog.likes}</p>
                        <button style={likeButtonStyles} onClick={handleLike}
                                className="likeBtn"> Like
                        </button>
                    </div>
                    <p className="blogUserName">{blog.user.name}</p>
                    {user.name === blog.user.name ?
                        <button className="deleteBtn" style={deleteButtonStyles}
                                onClick={() => deleteBlog(blog)}>delete</button> : null}
                </div>
            </div>
        </main>

    )
}


export default Blog

