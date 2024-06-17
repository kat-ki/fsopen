import {showMostPopular, updateVote} from "../reducers/anecdoteReducer.js";
import {useDispatch, useSelector} from "react-redux";
import {showNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if (filter === '') {
            return anecdotes;
        } else {
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
        }
    });

    const dispatch = useDispatch();
    const showPopular = () => {
        dispatch(showMostPopular());
    };
    const addVote = (anecdote) => {
        dispatch(updateVote(anecdote));
        dispatch(showNotification(`You voted for "${anecdote.content}"`, 5));
    };

    return (
        <div>
            <button onClick={showPopular}>show popular</button>
            {anecdotes.length ? anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <p>{anecdote.content}</p>
                        has <b>{anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'} </b>
                        <button onClick={() => addVote(anecdote)}>vote</button>
                        <hr/>
                    </div>
                )
                : <p>Not found</p>
            }
        </div>
    );
};

export default AnecdoteList;