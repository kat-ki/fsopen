import React from 'react';
import {useSelector} from "react-redux";
import {selectAllUsers} from "../state/reducers/usersSlice.js";
import {Link} from "react-router-dom";
import {
    Header,
    HeaderContent,
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
} from "semantic-ui-react";

const Users = () => {
    const users = useSelector(selectAllUsers);

    return (
        <main style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h3>Users</h3>

            <Table basic='very' celled collapsing size="small">
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Author</TableHeaderCell>
                        <TableHeaderCell>Blogs created</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Header as='h4' image>
                                    <HeaderContent>
                                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    </HeaderContent>
                                </Header>
                            </TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default Users;