import {useState} from "react";

const Blog = ({blog}) => {
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(!show)
    }
    return (
        <div style={{
            paddingTop: 0,
            paddingLeft: 2,
            border: 'solid',
            borderColor: 'lightgrey',
            borderWidth: 1,
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'space-between', alignItems: 'center'
        }}>
            {
                show ? <p>{blog.title}</p>
                    : <div style={{
                        paddingTop: 4,
                        paddingLeft: 2,
                        borderWidth: 1,
                        marginBottom: 5
                    }}>
                        <p>Title: <b>{blog.title}</b></p>
                        <p>Author: {blog.author}</p>
                        <p>Address: {blog.url}</p>
                        <div style={{
                            width: '60%',
                            display: 'flex',
                            justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <p>Likes: {blog.likes}</p>
                            <button style={{
                                backgroundColor: 'forestgreen',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '6px',
                                boxShadow: 'none',
                                borderColor: 'inherit',
                                fontFamily: 'sans-serif'
                            }}>like
                            </button>
                        </div>
                    </div>
            }

            <button onClick={handleShow}
                    style={{
                        backgroundColor: show ? 'lightgreen' : 'lightcoral',
                        color: show && 'black',
                        padding: '10px',
                        margin: '10px',
                        borderRadius: '5px',
                        boxShadow: 'none',
                        borderColor: 'inherit',
                        fontFamily: 'sans-serif'
                    }}>{show ? 'view' : 'hide'}
            </button>
        </div>
    )
}

export default Blog