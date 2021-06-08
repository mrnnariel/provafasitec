import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import UserItem, { User } from '.././User/user';

export default function Dashboard() {

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');

    async function getUsers(cont: number) {
        const response = await api.get(`users?page=${page}`);
        setUsers(response.data.data);
        setPage(response.data.page + cont);
        setTotalPages(response.data.total_pages);
    }

    useEffect(() => {
        getUsers(1)
    }, []);

    async function deleteUser(id: number) {
        const newUsers = users.filter(user => user.id !== id);
        const response = await api.delete(`/users/${id}`);
        if (response.status === 204) { setUsers(newUsers) }
    }

    function passPageUsers() {
        if (page <= totalPages) {
            getUsers(1);
        }
    }

    async function backPageUsers() {
        if (page > totalPages) {
            const response = await api.get(`users?page=${page - 2}`);
            setPage(response.data.page - 1);
            setUsers(response.data.data);
        }
    }

    async function searchUser(name: string) {
        if (name === '') {
            getUsers(1);
        }

        for (var i = 0; i < users.length; i++) {
            if (name === users[i].first_name + ' ' + users[i].last_name) {
                const showUser = users.splice((i), 1);
                const response = await api.get(`users/${showUser[0].id}`)

                setUsers([response.data.data]);
            }
        }
    }

    return (
        <>
            <div id="header">
                <Navbar expand="lg" className="Navbar">
                    <Link to="/"><img src={logoImg} alt="Fasitecando" /></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(event) => {
                            setSearch(event.target.value)
                        }} />
                        <Button variant="light" onClick={() => searchUser(search)}>
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </Form>
                </Navbar>
            </div>

            <div id="grid-users">
                {users.map((users: User) => (
                    <div id="card-users">
                        <Button variant="light" onClick={() => deleteUser(users.id)} className="delete-button">
                            <FontAwesomeIcon icon={faTimes} />
                        </Button>
                        <UserItem key={users.id}
                            email={users.email}
                            first_name={users.first_name}
                            last_name={users.last_name}
                            id={users.id}
                            avatar={users.avatar}
                        />
                    </div>
                ))
                }
            </div>

            <div id="buttons-page">
                <Button variant="dark" className="load-more" onClick={backPageUsers}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <Button variant="dark" className="load-more" onClick={passPageUsers}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Button>
            </div>
        </>
    );
}

