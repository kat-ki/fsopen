import React from 'react';
import {Link} from "react-router-dom";
import LoggedInUser from "./LoggedInUser.jsx";

const Header = () => {

    return (
        <header style={{backgroundColor: '#f8f9fa', padding: '10px 0', margin: 0}}>
            <nav>
                <ul style={{
                    listStyleType: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'baseline',
                    paddingLeft: '80px',
                    paddingRight: '80px'
                }}>
                    <li style={{margin: '0 15px'}}>
                        <Link to="/"
                              style={{textDecoration: 'none', color: '#333', fontWeight: 'bold'}}>Blogs</Link>
                    </li>
                    <li style={{margin: '0 15px'}}>
                        <Link to="users"
                              style={{textDecoration: 'none', color: '#333', fontWeight: 'bold'}}>Users</Link>
                    </li>
                    <li style={{margin: '0 15px'}}>
                        <LoggedInUser style={{textDecoration: 'none', color: '#333', fontWeight: 'bold'}}/>
                    </li>
                </ul>
            </nav>
        </header>

    );
};

export default Header;