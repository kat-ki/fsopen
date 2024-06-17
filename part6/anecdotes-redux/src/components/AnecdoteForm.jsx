import {createNewAnecdote} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import {showNotification} from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const createNew = async (event) => {
        event.preventDefault();
        const content = event.target.newAnecdote.value;
        dispatch(createNewAnecdote(content));
        event.target.newAnecdote.value = '';
        dispatch(showNotification(`Added ${content}`, 5));
    };
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name="newAnecdote"/></div>
                <button>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;