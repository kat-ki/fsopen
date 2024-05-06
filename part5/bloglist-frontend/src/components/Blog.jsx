import {useState} from 'react'
import PropTypes from "prop-types";

const Blog = ({blog, handleLike, deleteBlog, user}) => {
    const [show, setShow] = useState(true)

    // styles
    const containerStyles = {
        paddingTop: 0,
        paddingLeft: 2,
        border: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 1,
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'space-between', alignItems: 'center'
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
        justifyContent: 'space-between', alignItems: 'center'
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
    const viewHideButtonStyles = {
        backgroundColor: show ? 'lightgreen' : 'lightcoral',
        color: 'black',
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

    const handleShow = () => setShow(!show)

    return (
        <div style={containerStyles}>
            {
                show ? <div>
                        <p className="title"><b>{blog.title}</b></p>
                        <p>{blog.author}</p>
                    </div>
                    : <div style={detailedBlogStyles}>
                        <p>Title: <b>{blog.title}</b></p>
                        <p>Author: {blog.author}</p>
                        <p>Address: {blog.url}</p>
                        <div style={likesBoxStyle}>
                            <p>Likes: {blog.likes}</p>
                            <button style={likeButtonStyles} onClick={() => handleLike(blog.id)}>like</button>
                        </div>
                        <p>{blog.user.name}</p>
                        {user.name === blog.user.name &&
                            <button style={deleteButtonStyles} onClick={() => deleteBlog(blog.id)}>delete</button>}
                    </div>
            }
            <button onClick={handleShow} style={viewHideButtonStyles}><span className="viewBtn">{show ? 'view' : 'hide'}</span></button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog

