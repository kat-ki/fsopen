import {useState} from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0) // index of anecdote
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)); // votes array filled with as many zeros as anecdotes
    const handleShowNext = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    }
    const handleVote = () => {
        const votesCopy = [...votes]; // copy of anecdotes original array
        votesCopy[selected] += 1; // increase value at index [selected] by 1 in copy array
        setVotes(votesCopy);
    }

    const getAnecdoteWithMostVotes = () => {
        const maxVotes = Math.max(...votes); // max value from all votes
        const maxVotesIndex = votes.indexOf(maxVotes); // index of max value
        return anecdotes[maxVotesIndex]; // anecdote with index with max value
    };

    return (
        <div>
            <h2>Anecdote of the Day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes </p>
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleShowNext}>next anecdote</button>
            </div>
            <h2>Anecdote with the most Votes</h2>
            <p>{getAnecdoteWithMostVotes()}</p>
            <p>has {Math.max(...votes)} votes</p>
        </div>
    )
}

export default App
