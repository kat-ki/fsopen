import '../index.css'
export const SearchInput = ({value, onSearch}) => {
    return (
        <div>
            <input type="text"
                   placeholder={'search'}
                   value={value}
                   onChange={onSearch}/>
        </div>
    );
};