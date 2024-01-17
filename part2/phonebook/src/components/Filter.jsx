export const Filter = ({value, handleSearch}) => {
    return (
        <div>
            <p>filter by name
                <input type="text" placeholder={'search'} value={value}
                       onChange={handleSearch}/>
            </p>
        </div>
    );
};
