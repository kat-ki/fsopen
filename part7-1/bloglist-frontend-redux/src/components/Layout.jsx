import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";
import {useSelector} from "react-redux";
import LoginForm from "./LoginForm.jsx";


const Layout = () => {
    const user = useSelector(state => state.authUser.user);
    if (!user) {
        return <LoginForm/>
    }
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default Layout;