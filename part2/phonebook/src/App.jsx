import {useEffect, useState} from 'react'
import {Filter} from "./components/Filter.jsx";
import {PersonForm} from "./components/PersonForm.jsx";
import {Persons} from "./components/Persons.jsx";
import services from './services/services.js'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        services
            .getAllPersons()
            .then(initialList => {
                setPersons(initialList)
            })
    }, []);
    const handleName = (event) => {
        setNewName(event.target.value)
    }
    const handleTelephone = (event) => {
        setTelephone(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const foundPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        if (foundPerson) {
            if (window.confirm(`${newName} already exists in the phonebook. Replace the old number with a new one?`)) {
                const updatedPerson = {...foundPerson, number: telephone}

                services
                    .updatePerson(foundPerson.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson))
                        setNewName('');
                        setTelephone('')
                    })
                    .catch(error => alert('Oops, something went wrong'))
            }
        } else if (!newName) {
            alert('Enter a valid name')
        } else {
            const newPerson = {name: newName, number: telephone};

            services
                .createPerson(newPerson)
                .then(returnedPerson => {
                    setPersons([returnedPerson, ...persons])
                    setNewName('');
                    setTelephone('')
                })
        }
    }

    const deleteCurrentPerson = (id) => {
        const personToDelete = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            if (personToDelete) {
                services
                    .deletePerson(personToDelete.id)
                    .then(returnedData => {
                        setPersons(persons.filter(p => p.id !== returnedData.id))
                    })
                    .catch(error => alert('Oops, something went wrong'))
            }
        }
    }
    const handleSearch = (event) => {
        setSearchInput(event.target.value)
    }
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
    );


    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={searchInput} handleSearch={handleSearch}/>

            <h3>Add new contact</h3>
            <PersonForm addPerson={addPerson}
                        newName={newName}
                        handleName={handleName}
                        telephone={telephone}
                        handleTelephone={handleTelephone}
            />

            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons}
                     removePerson={deleteCurrentPerson}
            />

        </div>
    )
}

export default App