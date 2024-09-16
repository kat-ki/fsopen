import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {store} from './state/store'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Notification from "./components/Notification.jsx";
import Users from "./components/Users.jsx";
import Layout from "./components/Layout.jsx";
import {initializeUser} from "./state/reducers/authSlice.js";
import {fetchAllBlogs} from "./state/reducers/blogsSlice.js";
import User from "./components/User.jsx";
import BlogCard from "./components/BlogCard.jsx";
import BlogList from "./components/BlogList.jsx";
import {fetchAllUsers} from "./state/reducers/usersSlice.js";
import 'semantic-ui-css/semantic.min.css'

store.dispatch(initializeUser());
store.dispatch(fetchAllBlogs());
store.dispatch(fetchAllUsers());


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
            },
            {
                path: '/users/:userId',
                element: <User/>
            },
            {
                path: '/blogs',
                element: <BlogList/>
            },
            {
                path: '/blogs/:blogId',
                element: <BlogCard/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)