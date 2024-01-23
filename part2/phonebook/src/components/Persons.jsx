
export const Persons = ({filteredPersons}) => {
    return (
        <div>
            <ul>
                {filteredPersons.length === 0
                    ? <p style={{fontWeight: "bold", color: 'red'}}>Oops, can not find this person</p>
                    : filteredPersons.map((person) => (
                        <p key={person.id}>
                            {person.name} {person.number}
                        </p>
                    ))}
            </ul>
        </div>
    );
};
