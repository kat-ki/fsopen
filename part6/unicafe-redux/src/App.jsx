import reducer from "./reducers/reducer.js";
import {createStore} from "redux";
import ReactDOM from 'react-dom/client'


export const store = createStore(reducer)
const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }

    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }
    const zero = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

  return (
      <div>
        <button onClick={good}>Good</button>
        <button onClick={ok}>Ok</button>
        <button onClick={bad}>Bad</button>
        <button onClick={zero}>Reset</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
  )
}

export default App

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App/>)
}

renderApp()
store.subscribe(renderApp)