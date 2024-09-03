import {useState} from 'react'
import PropTypes from "prop-types";

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
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm