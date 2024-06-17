import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeAnecdotes} from "./reducers/anecdoteReducer.js";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, []);
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <AnecdoteForm/>
            <Filter/>
            <br/>
            <AnecdoteList/>
        </div>
    )
}

export default App