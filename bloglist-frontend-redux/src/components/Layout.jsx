import React from 'react';
import {Outlet} from "react-router-dom";
import LoggedInUser from "./LoggedInUser.jsx";
import {useSelector} from "react-redux";

const Layout = () => {
    const user = useSelector(state => state.authUser.user);

    return (
        <div>
            {user && <LoggedInUser/>}
            <Outlet/>
        </div>
    );
};

export default Layout;