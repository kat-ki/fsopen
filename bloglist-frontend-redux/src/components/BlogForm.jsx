import React, {useState} from 'react'
import PropTypes from "prop-types";
import {setNotification} from "../state/reducers/notificationSlice.js";
import {createBlog} from "../state/reducers/blogsSlice.js";
import {useDispatch} from "react-redux";
import {setStatus} from "../state/reducers/statusSlice.js";

const formStyles = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '10px'
}
const inputStyles = {
    marginTop: '6px',
    fontSize: '12px',
    fontFamily: 'sans-serif'
}
const buttonstyles = {
    backgroundColor: 'lightgreen',
    width: 'auto',
    color: 'black',
    padding: '4px 8px',
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
const buttonWarn = {
    backgroundColor: 'lightcoral',
    color: 'black',
    padding: '4px 8px',
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

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [formVisible, setFormVisible] = useState(false);

    const dispatch = useDispatch();

    const addBlog = (event) => {
        event.preventDefault();
        if (!title || !author || !url) {
            dispatch(setNotification('Title, author, and url must not be empty'));
            dispatch(setStatus('error'));
            setTimeout(() => {
                dispatch(setNotification(null));
            }, 2000);
            return;
        }

        const blog = {
            title, author, url
        }

        try {
            dispatch(createBlog(blog));
            dispatch(setNotification(`Added ${blog.title}`));
            dispatch(setStatus('success'));
            setTimeout(() => {
                dispatch(setNotification(null));
            }, 2000);
            setFormVisible(false);
        } catch (error) {
            dispatch(setNotification(error.message));
            dispatch(setStatus('error'));
            setTimeout(() => {
                dispatch(setNotification(null));
            }, 2000);
        } finally {
            setTitle('')
            setAuthor('')
            setUrl('')
        }
    }

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    }

    return (
        <div style={{margin: '10px'}}>
            <h4>Add new blog</h4>
            <button onClick={toggleFormVisibility} style={buttonstyles}>add blog</button>
            {formVisible &&
                (<div>
                        <form onSubmit={addBlog} style={formStyles}>
                            <input type="text"
                                   name="title"
                                   placeholder="title"
                                   style={inputStyles}
                                   value={title}
                                   onChange={({target}) => setTitle(target.value)}/>
                            <input type="text"
                                   name="author"
                                   placeholder="author"
                                   style={inputStyles}
                                   value={author}
                                   onChange={({target}) => setAuthor(target.value)}/>
                            <input type="text"
                                   name="url"
                                   placeholder="url"
                                   style={inputStyles}
                                   value={url}
                                   onChange={({target}) => setUrl(target.value)}/>

                            <button type="submit" style={buttonstyles}>Create</button>
                        </form>
                        <button onClick={() => setFormVisible(false)} style={buttonWarn}>cancel</button>
                    </div>

                )
            }
        </div>
    )
}


export default BlogForm