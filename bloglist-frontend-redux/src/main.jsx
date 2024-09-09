import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {store} from './state/store'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Notification from "./components/Notification.jsx";
import Users from "./components/Users.jsx";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <Notification/>,
        children: [
            {
                index: true,
                element: <App/>
            },
            {
                path: '/users',
                element: <Users/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)