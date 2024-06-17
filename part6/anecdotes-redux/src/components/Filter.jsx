import {useDispatch} from "react-redux";
import {setFilter} from "../reducers/filterReducer.js";

const Filter = () => {
    const dispatch = useDispatch();
    const handleChange = (event) => {
        dispatch(setFilter(event.target.value));
    }
    return (
        <div style={{marginBottom: '10px', marginTop: '10px'}}>
            filter <input name="filter" onChange={handleChange}/>
        </div>
    );
};

export default Filter;