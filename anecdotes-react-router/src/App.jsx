import {useState} from 'react'
import {Link, Route, Routes, useMatch, useNavigate, useParams} from "react-router-dom";
import {useField} from "./hooks/index.js";

const Anecdote = ({anecdote}) => {
    return (
        <div>
            <h3>{anecdote?.content}</h3>
            {anecdote && <p>has {anecdote?.votes} votes</p>}
        </div>
    )
}
const AnecdoteList = ({anecdotes}) => {
    // const id = useParams().id;

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes?.map(anecdote => <li key={anecdote.id}>
                    <Link to={`/${anecdote.id}`}>
                        <p>{anecdote.content}</p>
                    </Link>
                </li>)}
            </ul>
        </div>
    )
}

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke
            laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea
            about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Footer = () => (
    <div>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

        See <a
        href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for
        the source code.
    </div>
)

const CreateNew = (props) => {
    const {reset: resetContent, ...content} = useField('content');
    const {reset: resetAuthor, ...author} = useField('author');
    const {reset: resetInfo, ...info} = useField('info');

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
    }
    const handleReset = () => {
        resetContent();
        resetAuthor();
        resetInfo();
    }
    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author}/>
                </div>
                <div>
                    url for more info
                    <input {...info}/>
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    )

}

const Notification = ({notification, status}) => {
    if (notification === null) {
        return null
    }

    return (
        <div style={status === 'success' ? notificationStyles.success : notificationStyles.error}>{notification}</div>
    )
}

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState('');
    const [status, setStatus] = useState('');

    const match = useMatch('/:id');
    const anecdote = match
        ? anecdotes.find(note => note.id === Number(match.params.id))
        : null
    const navigate = useNavigate();
    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
        setNotification(`Created ${anecdote.content}`);
        setStatus('success');
        setTimeout(() => {
            setNotification(null);
        }, 3000);
        navigate('/');
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            {notification && <Notification notification={notification} status={status}/>}

            <div style={menu}>
                <Link to="/">Anecdotes</Link>
                <Link to="/create">Create</Link>
                <Link to="/about">About</Link>
            </div>
            <h1>Software anecdotes</h1>
            <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
                <Route path="/:id" element={<Anecdote anecdote={anecdote}/>}/>
                <Route path="/create" element={<CreateNew addNew={addNew}/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
            <div style={footer}>
                <Footer/>
            </div>
        </div>
    )
}

export default App

// styles

const menu = {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start'
}
const footer = {
    width: '100%',
    marginTop: '60px'
}

const notificationStyles = {
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