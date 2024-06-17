import NotificationContext from "../NotificationContext.jsx";
import {useContext} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnecdote} from "../requests.js";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const [, dispatch] = useContext(NotificationContext);

    const createAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries(['anecdotes']);
            dispatch({type: 'SHOW_NOTIFICATION', message: `Added anecdote '${anecdote.content}'`});
            setTimeout(() => {
                dispatch({type: 'HIDE_NOTIFICATION'});
            }, 5000);
        },
        onError: (error) => {
            if (error.response) {
                dispatch({type: 'SHOW_NOTIFICATION', message: error.response.data.error});
                setTimeout(() => {
                    dispatch({type: 'HIDE_NOTIFICATION'});
                }, 5000);
            } else {
                dispatch({type: 'SHOW_NOTIFICATION', message: 'Something went wrong'});
                setTimeout(() => {
                    dispatch({type: 'HIDE_NOTIFICATION'});
                }, 5000);
            }
        }
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        createAnecdoteMutation.mutate({content, votes: 0});
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote'/>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm