import {useEffect, useState} from 'react'
import {Filter} from "./components/Filter.jsx";
import {PersonForm} from "./components/PersonForm.jsx";
import {Persons} from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
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
        const nameExists = persons.some((person) => person.name === newName);
        if (nameExists) {
            alert(`${newName} is already added to the phonebook.`);
        } else if (!newName) {
            alert('Enter a valid name')
        } else {
            const newPerson = {id: persons.length + 1, name: newName, tel: telephone};
            setPersons([newPerson, ...persons]);
            setNewName('');
            setTelephone('')
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
            <Persons filteredPersons={filteredPersons}/>

        </div>
    )
}

export default App