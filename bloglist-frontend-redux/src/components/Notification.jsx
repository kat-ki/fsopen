import PropTypes from "prop-types";

const styles = {
    success: {
        color: 'white',
        backgroundColor: 'green',
        padding: '10px',
        margin: '10px 0',
        width: '70%',
        borderRadius: '5px'
    },
    error: {
        color: 'white',
        backgroundColor: 'red',
        padding: '10px',
        margin: '10px 0',
        width: '70%',
        borderRadius: '5px'
    },
}
const Notification = ({message, status}) => {
    if (message === null) {
        return null;
    }

    return (
        <div style={status === 'success' ? styles.success : styles.error}>{message}</div>
    )
}

Notification.propTypes = {
    message: PropTypes.string,
    status: PropTypes.string.isRequired
}

export default Notification