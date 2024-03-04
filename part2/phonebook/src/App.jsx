import {useEffect, useState} from 'react'
import {Filter} from "./components/Filter.jsx";
import {PersonForm} from "./components/PersonForm.jsx";
import {Persons} from "./components/Persons.jsx";
import services from './services/services.js'
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [message, setMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);

    useEffect(() => {
        services
            .getAllPersons()
            .then(initialList => {
                setPersons(initialList)
            })
    }, []);
    const onSetName = (event) => {
        setNewName(event.target.value);
    }
    const onSetTelephone = (event) => {
        setTelephone(event.target.value);
    }
    const onAddPerson = (event) => {
        event.preventDefault();
        const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        if (foundPerson) {
            if (window.confirm(`${newName} already exists in the phonebook. Replace the old number with a new one?`)) {
                const updatedPerson = {...foundPerson, number: telephone}

                services
                    .updatePerson(foundPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson));
                        setNewName('');
                        setTelephone('');
                        setMessage(`${newName}'s number has been updated`);
                        setTimeout(() => {
                            setMessage(null);
                        }, 3000)
                        setResponseStatus('success');
                    })
                    .catch(error => {
                        setMessage(`${newName} has already been deleted from server`);
                        setPersons(persons.filter(p => p.id !== foundPerson.id))
                        setTimeout(() => {
                            setMessage(null);
                        }, 3000)
                        setResponseStatus('failure');
                    })
            }
        } else if (!newName || newName.trim().length === 0) {
            alert('Enter a valid name')
        } else if (!telephone || telephone.trim().length === 0) {
            alert('Enter a valid number')
        } else {
            const newPerson = {name: newName, number: telephone};

            services
                .createPerson(newPerson)
                .then(returnedPerson => {
                    setPersons([returnedPerson, ...persons]);
                    setNewName('');
                    setTelephone('');
                    setMessage(`Added ${newPerson.name}`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000)
                    setResponseStatus('success');
                })
                .catch(error => setMessage(error.response.data.error))
        }
    }

    const onDeletePerson = (id) => {
        const personToDelete = persons.find(person => person.id === id);
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            if (personToDelete) {
                services
                    .deletePerson(personToDelete.id)
                    .then(returnedData => {
                        setPersons(persons.filter(p => p.id !== returnedData.id));
                        setMessage(`Deleted ${personToDelete.name}`);
                        setTimeout(() => {
                            setMessage(null)
                        }, 3000)
                        setResponseStatus('success');
                    })
                    .catch(error => {
                        setMessage(`Oops, something went wrong`);
                    })
            }
        }
    }
    const onSearch = (event) => {
        setSearchInput(event.target.value);
    }
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
    );


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} type={responseStatus}/>
            <Filter value={searchInput} handleSearch={onSearch}/>

            <h3>Add new contact</h3>
            <PersonForm addPerson={onAddPerson}
                        newName={newName}
                        handleName={onSetName}
                        telephone={telephone}
                        handleTelephone={onSetTelephone}
            />

            <h2>Numbers</h2>

            {persons.length === 0
                ? 'Loading...'
                : <Persons filteredPersons={filteredPersons}
                           removePerson={onDeletePerson}
                />}

        </div>
    )
}

export default App