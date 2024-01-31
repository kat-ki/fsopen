const Notification = ({message, type}) => {
    if (message === null) {
        return null;
    }
    const messageType = type === 'success' ? 'message' : 'errorMessage'
    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

export default Notification;