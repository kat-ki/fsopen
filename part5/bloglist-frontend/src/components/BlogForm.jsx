import {useState} from 'react'
import PropTypes from "prop-types";

const formStyles = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
    paddingBottom: '10px'
}
const buttonstyles = {
    backgroundColor: 'lightgreen',
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
const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h4>Add new blog</h4>
            <form onSubmit={addBlog} style={formStyles}>
                <label htmlFor="title">Title: </label>
                <input type="text"
                       name="title"
                       value={title}
                       onChange={({target}) => setTitle(target.value)}/>
                <label htmlFor="author">Author: </label>
                <input type="text"
                       name="author"
                       value={author}
                       onChange={({target}) => setAuthor(target.value)}/>
                <label htmlFor="url">URL: </label>
                <input type="text"
                       name="url" value={url}
                       onChange={({target}) => setUrl(target.value)}/>

                <button type="submit" style={buttonstyles}>Create
                </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm