import {useState, useEffect} from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(baseUrl);
                if (response.ok) {
                    const result = await response.json();
                    setResources(result)
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        }

        if (baseUrl) {
            fetchData();
        }
    }, [baseUrl])

    const create = async (resource) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resource)
            })
            if (response.ok) {
                const result = await response.json();
                setResources(resources.concat(result));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const remove = async (resource) => {
        try {
            const response = await fetch(`${baseUrl}/${resource.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                setResources((prevResources) =>
                    prevResources.filter(res => res.id !== resource.id)
                );
            } else {
                console.log('Failed to delete')
            }

        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const service = {
        create,
        remove
    }

    return [
        resources, service
    ]
}

const AppNotesUltimateHooks = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({content: content.value})
    }

    const handleNoteDelete = (event, note) => {
        event.preventDefault();
        noteService.remove(note)
    }

    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({name: name.value, number: number.value})
    }
    const handlePersonDelete = (event, person) => {
        event.preventDefault()
        personService.remove(person)
    }


    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button type="submit">create</button>
            </form>
            {notes?.map(n => (
                <div key={n.id} style={{display: 'flex', flexDirection: 'row'}}>
                    <p>{n.content}</p>
                    <button onClick={(event) => handleNoteDelete(event, n)}>delete</button>
                </div>
            ))}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br/>
                number <input {...number} />
                <button type="submit">create</button>
            </form>
            {persons?.map(p => (
                <div key={p.id} style={{display: 'flex', flexDirection: 'row'}}>
                    <p>{p.name} {p.number}</p>
                    <button onClick={(event) => handlePersonDelete(event, p)}>delete</button>
                </div>
            ))
            }
        </div>
    )
}

export default AppNotesUltimateHooks