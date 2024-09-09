import {useSelector} from "react-redux";

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
const Notification = () => {
    const notification = useSelector(state => state.notification);
    const status = useSelector(state=> state.status.status);

    if (notification === null) {
        return null;
    }

    return (
        <div style={status === 'success' ? styles.success : styles.error}>{notification}</div>
    )
}


export default Notification