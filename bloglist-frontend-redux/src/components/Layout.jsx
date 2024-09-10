import React from 'react';
import {Outlet} from "react-router-dom";
import LoggedInUser from "./LoggedInUser.jsx";

const Layout = () => {
    return (
        <div>
            <LoggedInUser/>
            <Outlet/>
        </div>
    );
};

export default Layout;