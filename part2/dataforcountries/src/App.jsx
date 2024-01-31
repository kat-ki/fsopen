import './App.css'
import {useEffect, useState} from "react";
import services from "./components/services.js";
import {SearchInput} from "./components/SearchInput.jsx";
import {CountryList} from "./components/CountryList.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        services
            .getCountries()
            .then(initList => {
                setCountries(initList)
            })
    }, []);

    const onSearch = (event) => {
        setSearchQuery(event.target.value)
    }

    const filteredCountries = searchQuery !== ''
        ? countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
        : []
    ;

    return (
        <>
            <p>Find countries</p>
            <SearchInput value={searchQuery} onSearch={onSearch}/>
            <CountryList filteredCountries={filteredCountries}/>
        </>
    )
}

export default App
