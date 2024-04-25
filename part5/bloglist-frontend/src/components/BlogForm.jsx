const BlogForm = ({
                      addNewBlog,
                      title,
                      handleTitleChange,
                      author,
                      handleAuhorChange,
                      url,
                      handleUrlChange
                  }) => {
    return (
        <div>
            <h4>Add new blog</h4>
            <form onSubmit={addNewBlog} style={{
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                paddingBottom: '10px'
            }}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={title}
                       onChange={handleTitleChange}/>
                <label htmlFor="author">Author: </label>
                <input type="text" name="author" value={author}
                       onChange={handleAuhorChange}/>
                <label htmlFor="url">URL: </label>
                <input type="text" name="url" value={url} onChange={handleUrlChange}/>

                <button type="submit" style={{width: '50px', marginTop: '10px', padding: '5px'}}>Create
                </button>
            </form>
        </div>
    );
};

export default BlogForm;