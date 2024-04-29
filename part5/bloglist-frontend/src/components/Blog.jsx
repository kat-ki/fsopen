import {useState} from "react";

const Blog = ({blog, handleLike, deleteBlog}) => {
    const [show, setShow] = useState(true);

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

    const handleShow = () => {
        setShow(!show)
    }
    return (
        <div style={containerStyles}>
            {
                show ? <p>{blog.title}</p>
                    : <div style={detailedBlogStyles}>
                        <p>Title: <b>{blog.title}</b></p>
                        <p>Author: {blog.author}</p>
                        <p>Address: {blog.url}</p>
                        <div style={likesBoxStyle}>
                            <p>Likes: {blog.likes}</p>
                            <button style={likeButtonStyles} onClick={() => handleLike(blog.id)}>like</button>
                        </div>
                        <p>{blog.user.name}</p>
                        <button style={deleteButtonStyles} onClick={() => deleteBlog(blog.id)}>delete</button>
                    </div>
            }
            <button onClick={handleShow} style={viewHideButtonStyles}> {show ? 'view' : 'hide'}</button>
        </div>
    )
}

export default Blog

