import React from 'react';
import {useSelector} from "react-redux";
import {setAllUsers} from "../state/reducers/usersSlice.js";
import {Link} from "react-router-dom";

const Users = () => {
    const users = useSelector(setAllUsers);

    return (
        <main style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
            <h3>Users</h3>

            <table style={{border: '1px solid black', width: '80%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{border: '1px solid black', padding: '8px'}}>Author</th>
                    <th style={{border: '1px solid black', padding: '8px'}}>Blogs created</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            cursor: 'pointer'
                        }}>
                            <Link to={`/users/${user.id}`}
                                  style={{textDecoration: 'none', color: 'inherit'}}>{user.name}</Link>
                        </td>
                        <td style={{
                            border: '1px solid black',
                            padding: '8px',
                            cursor: 'pointer'
                        }}>{user.blogs.length}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </main>
    );
};

export default Users;