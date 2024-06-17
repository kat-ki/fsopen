import {useContext} from "react";
import NotificationContext from "../NotificationContext.jsx";

const messageSuccess = {
    border: '1px solid #4CAF50',
    padding: '4px 8px',
    marginBottom: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '1rem',
    lineHeight: '1',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};
const messageFailure = {
    border: '1px solid #4CAF50',
    padding: '4px 8px',
    marginBottom: '10px',
    backgroundColor: '#d24343',
    color: '#fff',
    fontSize: '1rem',
    lineHeight: '1',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
};

const Notification = () => {
    const [message] = useContext(NotificationContext);
    if (!message.message) return null;

    return (
        <div
            style={message.message.includes('too short anecdote, must have length 5 or more') ? messageFailure : messageSuccess}>
            <p>{message.message}</p>
        </div>
    )
}

export default Notification;