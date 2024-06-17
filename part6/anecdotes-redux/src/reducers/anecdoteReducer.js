import {createSlice} from "@reduxjs/toolkit";
import anecdoteServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload;
        },
        vote(state, action) {
            return state.map(anecdote =>
                anecdote.id !== action.payload.id ? anecdote : {...anecdote, votes: anecdote.votes + 1}
            );
        },
        addNew(state, action) {
            return [action.payload, ...state];
        },
        showMostPopular(state) {
            return [...state].sort((a, b) => b.votes - a.votes);
        },
    },
});

export const {setAnecdotes, vote, addNew, showMostPopular} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteServices.getAll();
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createNewAnecdote = (content) => {
    return async dispatch => {
        const newAn = await anecdoteServices.createNew(content);
        dispatch(addNew(newAn));
    }
}

export const updateVote = (anecdote) => {
    return async dispatch => {
        let updatedVotes = {...anecdote, votes: anecdote.votes + 1}
        const updatedAn = await anecdoteServices.updateVotes(updatedVotes);
        dispatch(vote(updatedAn));
    }
}
export default anecdoteSlice.reducer;