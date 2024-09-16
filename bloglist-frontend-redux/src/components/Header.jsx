import React from 'react';
import {Link} from "react-router-dom";
import LoggedInUser from "./LoggedInUser.jsx";
import {MenuMenu, MenuItem, Menu} from 'semantic-ui-react'

const Header = () => {

    return (
        <Menu pointing secondary>
            <MenuItem>
                <Link to="/">Blogs</Link>
            </MenuItem>
            <MenuItem>
                <Link to="/users">Users</Link>
            </MenuItem>
            <MenuMenu position='right'>
                <MenuItem>
                    <LoggedInUser/>
                </MenuItem>
            </MenuMenu>
        </Menu>
    );
};

export default Header;