import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useContext} from "react";
import NotificationContext from "../NotificationContext.jsx";
import {getAnecdotes, updateVotes} from "../requests.js";

const AnecdoteList = () => {
    const queryClient = useQueryClient();
    const [, dispatch] = useContext(NotificationContext);

    const updateVotesMutation = useMutation({
        mutationFn: updateVotes,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['anecdotes']})
        },
    })
    const handleVote = (anecdote) => {
        updateVotesMutation.mutate({...anecdote, votes: anecdote.votes + 1});
        dispatch({type: 'SHOW_NOTIFICATION', message: `You voted for "${anecdote.content}"`});
        setTimeout(() => {
            dispatch({type: 'HIDE_NOTIFICATION'});
        }, 5000);
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
    })
    if (result.isLoading) {
        return <div>Loading data...</div>
    }
    if (result.isError) {
        return <div>Sorry. Anecdote service not available due to server problems</div>
    }

    const anecdotes = result.data;

    return (
        <div>
            {anecdotes?.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;