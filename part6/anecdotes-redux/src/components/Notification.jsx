import {useSelector} from "react-redux";

const styles = {
    backgroundColor: "#349043",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    height: '26px',
}
const skeleton = {
    backgroundColor: "#fff",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "14px",
    height: '26px'
}
const Notification = () => {
    const notification = useSelector(state => state.notification);

    return (
        <div style={notification === '' ? skeleton : styles}>
            {notification}
        </div>
    )
}

export default Notification;