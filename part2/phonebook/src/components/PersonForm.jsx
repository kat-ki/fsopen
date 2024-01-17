export const PersonForm = ({addPerson, newName, handleName, telephone, handleTelephone}) => {
    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    <div>
                        name: <input value={newName} onChange={handleName}/>
                    </div>
                    <div>
                        number: <input value={telephone} onChange={handleTelephone}/>
                    </div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};
