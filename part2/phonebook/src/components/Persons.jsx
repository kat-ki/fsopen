
export const Persons = ({filteredPersons, removePerson}) => {
    return (
        <div>
            <ul>
                {filteredPersons.length === 0
                    ? <p style={{fontWeight: "bold", color: 'red'}}>Oops, can not find this person</p>
                    : filteredPersons.map((person) => (
                        <li key={person.id}>
                            {person.name} {person.number}
                            <button onClick={() => removePerson(person.id)}>delete</button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};
